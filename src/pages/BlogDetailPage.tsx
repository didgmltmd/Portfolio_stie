import { useParams, useNavigate, Link } from "react-router-dom";
import { blogPosts } from "../data/blogs";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { useState, useEffect, type ReactElement } from "react";
import { ThemeToggle } from "../components/ThemeToggle";
import CodeSandboxBlock from "../components/CodeSandboxBlock";
import * as React from "react";

/** 헤딩/목차 id 통일을 위한 간단 slugify */
function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.id === id);

  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);

  /** 목차 추출: 본문 렌더와 동일한 slug 규칙 사용 */
  useEffect(() => {
    if (!post) return;
    const lines = post.content.split("\n");
    const extracted = lines
      .map((line) => {
        const m = line.match(/^(#{1,6})\s+(.*)$/);
        if (!m) return null;
        const level = m[1].length;
        const text = m[2].trim();
        const id = slugify(text);
        return { id, text, level };
      })
      .filter(Boolean) as { id: string; text: string; level: number }[];
    setHeadings(extracted);
  }, [post]);

  if (!post) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="mb-4">블로그 글을 찾을 수 없습니다</h2>
          <Button onClick={() => navigate("/")}>홈으로 돌아가기</Button>
        </div>
      </div>
    );
  }

  /** 매우 가벼운 인라인 마크업 (선택 사항) */
  const renderInline = (md: string) => {
    // 링크 [text](url)
    md = md.replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
      `<a href="$2" target="_blank" rel="noopener noreferrer" class="underline decoration-muted-foreground hover:text-foreground">$1</a>`
    );
    // 인라인 코드 `code`
    md = md.replace(
      /`([^`]+)`/g,
      `<code class="px-1 py-0.5 rounded bg-muted border text-sm">$1</code>`
    );
    // **bold** / *italic*
    md = md.replace(/\*\*([^*]+)\*\*/g, `<strong>$1</strong>`);
    md = md.replace(/\*([^*]+)\*/g, `<em>$1</em>`);
    return md;
  };

  /** Markdown → JSX (코드블록은 CodeSandboxBlock으로) */
  const renderMarkdown = (content: string) => {
    const lines = content.split("\n");
    const elements: ReactElement[] = [];

    let inCodeBlock = false;
    let codeContent: string[] = [];
    let codeLanguage = "";

    let listBuffer: string[] = [];
    const flushList = (keyBase: string) => {
      if (!listBuffer.length) return;
      elements.push(
        <ul key={`list-${keyBase}`} className="list-disc pl-6 my-4">
          {listBuffer.map((item, i) => (
            <li
              key={`${keyBase}-${i}`}
              className="text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: renderInline(item) }}
            />
          ))}
        </ul>
      );
      listBuffer = [];
    };

    const flushCode = (key: string | number) => {
      const code = codeContent.join("\n");
      elements.push(
        <CodeSandboxBlock
          key={`code-${key}`}
          code={code}
          language={codeLanguage}
        />
      );
      codeContent = [];
      codeLanguage = "";
    };

    lines.forEach((line, index) => {
      // 코드블록 시작/끝
      if (line.startsWith("```")) {
        flushList(`pre-${index}`);
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLanguage = line.replace("```", "").trim();
          codeContent = [];
        } else {
          inCodeBlock = false;
          flushCode(index);
        }
        return;
      }
      if (inCodeBlock) {
        codeContent.push(line);
        return;
      }

      // 목록
      if (/^\s*-\s+/.test(line)) {
        listBuffer.push(line.replace(/^\s*-\s+/, ""));
        return;
      }
      if (listBuffer.length && (line.trim() === "" || /^#{1,6}\s/.test(line))) {
        flushList(`end-${index}`);
      }

      // 헤딩
      const m = line.match(/^(#{1,6})\s+(.*)$/);
      if (m) {
        const level = m[1].length;
        const text = m[2].trim();
        const hid = slugify(text);
        const levelClamped = Math.min(6, Math.max(1, level));
        const Tag = `h${levelClamped}` as keyof React.JSX.IntrinsicElements;

        elements.push(
          React.createElement(
            Tag,
            { key: index, id: hid, className: "mt-8 mb-3 scroll-mt-24" },
            text
          )
        );
        return;
      }

      // 빈 줄 → 여백
      if (line.trim() === "") {
        elements.push(<div key={index} className="h-4" />);
        return;
      }

      // 일반 문단
      elements.push(
        <p
          key={index}
          className="my-4 text-muted-foreground leading-relaxed break-words"
          dangerouslySetInnerHTML={{ __html: renderInline(line) }}
        />
      );
    });

    // 남은 버퍼 처리
    if (inCodeBlock) flushCode("eof");
    flushList("eof");
    return elements;
  };

  return (
    <div className="min-h-dvh w-full flex flex-col bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/">
            <Button variant="ghost" className="gap-2 hover:cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              홈으로
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex-1 bg-background overflow-x-hidden">
        <div className="h-7" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
            {/* 목차 */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div className="mb-4 text-sm text-muted-foreground">목차</div>
                <nav className="space-y-2">
                  {headings.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className={`block text-sm py-1 transition-colors ${
                        h.level <= 2 ? "pl-0" : "pl-4"
                      } text-muted-foreground hover:text-foreground`}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* 본문 */}
            <article className="flex-1 min-w-0 max-w-3xl">
              <header className="mb-12">
                <h1 className="mb-6 break-words">{post.title}</h1>

                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <Badge className="rounded-full">{post.category}</Badge>
                  {post.series && (
                    <Badge variant="outline" className="rounded-full">
                      시리즈: {post.series}
                    </Badge>
                  )}
                </div>

                {!!post.tags?.length && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="rounded-full">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </header>

              <Separator className="my-8" />

              <div className="prose prose-lg max-w-none break-words">
                {renderMarkdown(post.content)}
              </div>

              <Separator className="my-12" />

              <div className="hidden sm:flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={() => navigate("/blogs")}
                  className="rounded-xl hover:cursor-pointer"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  목록으로
                </Button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
