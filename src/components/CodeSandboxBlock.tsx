import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "../ui/utils";

type Props = {
  code: string;
  language?: string; // "js" | "jsx" | "ts" | "tsx" | "html" | "css"
  className?: string;
};

const JS = new Set(["js", "javascript"]);
const JSX = new Set(["jsx"]);
const TSX = new Set(["tsx", "ts"]); // ts도 TSX 트랙으로 처리
const HTML = new Set(["html", "htm"]);
const CSS = new Set(["css"]);

// const urlRegex = /((https?:\/\/[^\s]+)|(?:www\.[^\s]+))/g;

// function toLinkifiedHTML(raw: string) {
//   return raw.replace(urlRegex, (m) => {
//     const href = m.startsWith("http") ? m : `https://${m}`;
//     return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">${m}</a>`;
//   });
// }

/** Babel 안전 로더: window.Babel → 동적 import → CDN 주입 */
async function loadBabel(): Promise<any> {
  if (typeof (window as any).Babel !== "undefined") {
    return (window as any).Babel;
  }
  // 번들러 import 시도
  try {
    const mod: any = await import("@babel/standalone");
    const babel = mod?.default ?? mod ?? (window as any).Babel;
    if (babel && typeof babel.transform === "function") return babel;
  } catch {
    /* ignore and fallback to CDN */
  }
  // CDN 삽입
  await new Promise<void>((resolve, reject) => {
    const id = "__babel_standalone_cdn__";
    if (document.getElementById(id)) return resolve();
    const s = document.createElement("script");
    s.id = id;
    s.src = "https://unpkg.com/@babel/standalone/babel.min.js";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Babel from CDN"));
    document.head.appendChild(s);
  });
  const babel = (window as any).Babel;
  if (!babel || typeof babel.transform !== "function") {
    throw new Error("Babel is not available (transform missing)");
  }
  return babel;
}

/** TSX → JS (import 제거, export default를 window.__defaultExport__에 바인딩) */
async function transpileTSXAsync(src: string) {
  const stripped = src.replace(/^\s*import\s.+?;?\s*$/gm, "");
  const replaced = stripped.replace(
    /^\s*export\s+default\s+/m,
    "window.__defaultExport__ = "
  );
  const Babel = await loadBabel();
  const out = Babel.transform(replaced, {
    presets: [
      ["typescript", { allExtensions: true, isTSX: true }],
      ["react", { runtime: "classic" }], // 전역 React 사용
    ],
    filename: "input.tsx",
  });
  return out.code ?? "";
}

/** 공통 콘솔 캡처 스크립트 (iframe 내부에서 실행) */
const makeConsoleHeader = `
  const con = document.getElementById('console');
  const post = (s) => { con.textContent += s + "\\n"; parent.postMessage({__sandbox_log: s}, "*"); };
  ["log","info","warn","error"].forEach(k=>{
    const o = console[k].bind(console);
    console[k] = (...a)=>{ 
      try { post(a.map(x => typeof x==='object' ? JSON.stringify(x) : String(x)).join(' ')); } catch {}
      o(...a);
    };
  });
`;

export default function CodeSandboxBlock({
  code,
  language = "",
  className,
}: Props) {
  const lang = (language || "").toLowerCase();
  const isHTML = HTML.has(lang);
  const isCSS = CSS.has(lang);
  const isJS = JS.has(lang);
  const isTSX = TSX.has(lang) || JSX.has(lang);

  const [source, setSource] = useState(code);
  const [logs, setLogs] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [iframeKey, setIframeKey] = useState(0); // 강제 리마운트
  const [doc, setDoc] = useState<string>(""); // iframe srcDoc
  const latestSrcRef = useRef(source);

  useEffect(() => {
    latestSrcRef.current = source;
  }, [source]);

  // 부모(호스트) 콘솔 패널 업데이트
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e?.data && typeof e.data.__sandbox_log === "string") {
        setLogs((prev) => [...prev, e.data.__sandbox_log]);
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  /** iframe 문서 빌드 */
  const buildHtml = (compiledOrRaw: string) => {
    if (isHTML) {
      return compiledOrRaw || "<!doctype html><html><body></body></html>";
    }
    if (isCSS) {
      return `<!doctype html><html><head><style>${compiledOrRaw}</style></head><body><div>CSS Sandbox</div></body></html>`;
    }
    if (isJS) {
        const htmlSafe = compiledOrRaw
            .replace(/<\/script>/gi, '<\\/script>')
            .replace(/<!--/g, '<\\!--')
            .replace(/\u2028/g, '\\u2028')
            .replace(/\u2029/g, '\\u2029');

        return `<!doctype html><html><body>
            <pre id="console"
                style="background:#0b0b0b;color:#b6f3ff;padding:12px;margin:0;min-height:340px;
                        font:12px/1.5 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;"></pre>
            <script>(function(){
            // 콘솔 캡쳐
            const con = document.getElementById('console');
            const post = (s) => { try { con.textContent += s + "\\n"; parent.postMessage({__sandbox_log:s},"*"); } catch {} };
            ["log","info","warn","error"].forEach(k=>{
                const o = console[k].bind(console);
                console[k] = (...a)=>{ 
                try { post(a.map(x => typeof x==='object' ? JSON.stringify(x) : String(x)).join(' ')); } catch {}
                o(...a);
                };
            });

            // Node.js 전용 코드 감지되면 실행 대신 표시만 (require/fs 등)
            var src = ${JSON.stringify(htmlSafe)};
            if (/\\brequire\\s*\\(|fs\\s*\\.|process\\s*\\.|__dirname\\b|readFileSync\\b/.test(src)) {
                post("[Info] Node.js 전용 코드가 감지되어 브라우저에서는 실행하지 않습니다. (보기 전용)");
                post("---- Code ----");
                post(src);
                return;
            }

            try {
                eval(src); // 순수 JS 실행
            } catch (e) {
                post("[Error] " + (e && (e.stack || e.message) || e));
            }
            })();</script>
        </body></html>`;
    }
    if (isTSX) {
        return `<!doctype html><html><body>
            <div id="root" style="font-family: ui-sans-serif, system-ui"></div>
            <pre id="console" style="color:#9fe;padding:12px;border-radius:8px;overflow:auto;max-height:40vh;"></pre>

            <script src="/vendor/react.production.min.js"></script>
            <script src="/vendor/react-dom.production.min.js"></script>

            <script>(function(){
            ${makeConsoleHeader}

            window.__sandbox_post = (s) => {
                try { parent.postMessage({__sandbox_log: s},"*"); } catch {}
            };

            function boot(attempt){
                attempt = attempt || 0;
                if (!(window.React && window.ReactDOM && window.ReactDOM.createRoot)) {
                if (attempt < 200) return setTimeout(() => boot(attempt + 1), 10);
                window.__sandbox_post("React UMD가 로드되지 않았습니다. (umd-react 경로 확인)");
                return;
                }

                try {
                const React = window.React;
                const ReactDOM = window.ReactDOM;
                const { useState, useMemo, useEffect, useRef, useTransition, useDeferredValue, useCallback, useLayoutEffect, startTransition, Suspense, Fragment } = React;
                const lazy = React.lazy;

                const root = ReactDOM.createRoot(document.getElementById('root'));

                try {
                    ${compiledOrRaw}
                    if (window.__defaultExport__) {
                    root.render(React.createElement(window.__defaultExport__));
                    } else if (typeof window.render === "function") {
                    window.render(root, React, ReactDOM);
                    } else {
                    window.__sandbox_post("No default export component or window.render provided.");
                    }
                } catch (e) {
                    window.__sandbox_post("[Error] " + (e && (e.stack || e.message) || e));
                }

                } catch(e) {
                window.__sandbox_post("[Boot Error] " + (e && (e.stack || e.message) || e));
                }
            }

            boot(0);
            })();</script>
        </body></html>`;
        }
    return `<!doctype html><html><body><div style="padding:12px">This language is not runnable.</div></body></html>`;
  };

  /** 실행 (Run 버튼에서만 트랜스파일/빌드/리마운트) */
  const run = async () => {
    setRunning(true);
    setLogs([]);

    try {
      if (isHTML || isCSS || isJS) {
        setDoc(buildHtml(latestSrcRef.current));
      } else if (isTSX) {
        const compiled = await transpileTSXAsync(latestSrcRef.current);
        setDoc(buildHtml(compiled));
      } else {
        setDoc(buildHtml(""));
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setLogs((p) => [...p, `[Transpile Error] ${msg}`]);
      setDoc(buildHtml(""));
    }

    setIframeKey((k) => k + 1); // 강제 리마운트 → srcDoc 적용
    setRunning(false);
  };

  const reset = () => {
    setSource(code);
    setLogs([]);
    setDoc(buildHtml("")); // 빈 문서
    setIframeKey((k) => k + 1);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(latestSrcRef.current);
  };

  return (
    <div className={cn("my-6 rounded-2xl border overflow-hidden", className)}>
      <div className="flex items-center justify-between px-4 py-2 bg-muted/60 border-b">
        <div className="text-xs text-muted-foreground">{language || "text"}</div>
        <div className="flex gap-2">
          <Button size="sm" className="hover:cursor-pointer" variant="outline" onClick={copy}>Copy</Button>
          <Button size="sm" className="hover:cursor-pointer" variant="outline" onClick={reset}>Reset</Button>
          <Button size="sm" className="hover:cursor-pointer" onClick={run} disabled={running}>
            {running ? "Running..." : "Run"}
          </Button>
        </div>
      </div>

      <textarea
        value={source}
        onChange={(e) => setSource(e.target.value)}
        spellCheck={false}
        className="w-full min-h-70 font-mono text-sm p-4 outline-none bg-background"
        placeholder="Edit code here..."
      />

      <div className="border-t">
        {isJS ? (
          <div className="p-0 w-full">
            <div className="px-4 py-2 text-xs text-muted-foreground bg-muted/40 border-b">
              Console
            </div>
            <pre className="p-4 text-sm h-[200px] overflow-auto">{logs.join("\n")}</pre>
          </div>
        ) : (
          <div className="p-0 w-full">
            <iframe
              key={iframeKey}
              title="sandbox"
              sandbox="allow-scripts"
              srcDoc={doc}
              className="w-full h-[360px] bg-white"
            />
          </div>
        )}
      </div>
    </div>
  );
}
