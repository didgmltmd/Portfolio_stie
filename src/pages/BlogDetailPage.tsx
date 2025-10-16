import { useParams, useNavigate } from "react-router-dom";
import { blogPosts } from "../data/blogs";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { useState, useEffect } from "react";
import { ThemeToggle } from "../components/ThemeToggle";
import type { ReactElement } from "react";

export function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.id === id);
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    if (!post) return;
    const lines = post.content.split("\n");
    const extracted = lines
      .filter((line) => line.startsWith("#"))
      .map((line, index) => {
        const level = line.match(/^#+/)?.[0].length || 1;
        const text = line.replace(/^#+\s/, "");
        return { id: `heading-${index}`, text, level };
      });
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

  const renderMarkdown = (content: string) => {
    const lines = content.split("\n");
    const elements: ReactElement[] = [];
    let inCodeBlock = false;
    let codeContent: string[] = [];
    let codeLanguage = "";

    let listBuffer: string[] = [];
    const flushList = (keyBase: string) => {
      if (listBuffer.length) {
        elements.push(
          <ul key={`list-${keyBase}`} className="list-disc pl-6 my-4">
            {listBuffer.map((item, i) => (
              <li key={`${keyBase}-${i}`} className="text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        );
        listBuffer = [];
      }
    };

    lines.forEach((line, index) => {
      if (line.startsWith("```")) {
        flushList(`pre-${index}`);
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLanguage = line.replace("```", "").trim();
          codeContent = [];
        } else {
          inCodeBlock = false;
          elements.push(
            <div key={`code-${index}`} className="my-6 rounded-xl overflow-hidden bg-muted border border-border">
              {codeLanguage && (
                <div className="px-4 py-2 bg-muted/50 border-b border-border text-xs text-muted-foreground">
                  {codeLanguage}
                </div>
              )}
              <pre className="p-4 overflow-x-auto">
                <code>{codeContent.join("\n")}</code>
              </pre>
            </div>
          );
        }
        return;
      }

      if (inCodeBlock) {
        codeContent.push(line);
        return;
      }

      if (line.startsWith("- ")) {
        listBuffer.push(line.replace("- ", ""));
        return;
      }

      if (listBuffer.length && (line.trim() === "" || line.startsWith("#"))) {
        flushList(`end-${index}`);
      }

      if (line.startsWith("# ")) {
        elements.push(<h1 key={index} className="mt-12 mb-6">{line.replace("# ", "")}</h1>);
        return;
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2 key={index} id={`heading-${index}`} className="mt-10 mb-4 scroll-mt-24">
            {line.replace("## ", "")}
          </h2>
        );
        return;
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={index} id={`heading-${index}`} className="mt-8 mb-3 scroll-mt-24">
            {line.replace("### ", "")}
          </h3>
        );
        return;
      } else if (line.startsWith("#### ")) {
        elements.push(
          <h4 key={index} id={`heading-${index}`} className="mt-6 mb-2 scroll-mt-24">
            {line.replace("#### ", "")}
          </h4>
        );
        return;
      }

      if (line.trim() === "") {
        elements.push(<div key={index} className="h-4" />);
        return;
      }

      elements.push(
        <p key={index} className="my-4 text-muted-foreground leading-relaxed break-words">
          {line}
        </p>
      );
    });

    flushList("eof");
    return elements;
  };

  return (
    <div className="flex-1 bg-background overflow-x-hidden">
      <div className="fixed lg:sticky top-0 left-0 right-0 z-50 border-b bg-card/90 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="rounded-xl hover:cursor-pointer"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            블로그 목록으로
          </Button>
          <ThemeToggle />
        </div>
      </div>

      <div className="h-7" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="mb-4 text-sm text-muted-foreground">목차</div>
              <nav className="space-y-2">
                {headings.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className={`block text-sm py-1 transition-colors ${
                      h.level === 2 ? "pl-0" : "pl-4"
                    } text-muted-foreground hover:text-foreground`}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

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
                onClick={() => navigate("/")}
                className="rounded-xl hover:cursor-pointer"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                목록으로
              </Button>
            </div>
          </article>

          <aside className="hidden xl:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="p-6 bg-card border border-border rounded-2xl">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 mb-4 flex items-center justify-center">
                  <span className="text-2xl">👨‍💻</span>
                </div>
                <h4>프론트엔드 개발자</h4>
                <h6 className="mb-2">
                  <b>양희승</b>
                </h6>
                <p className="text-sm text-muted-foreground mb-4">
                  사용자 경험을 최우선으로 생각하는 개발자입니다.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full rounded-xl hover:cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  프로필 보기
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
