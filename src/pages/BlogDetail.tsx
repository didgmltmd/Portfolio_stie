import { useParams, useNavigate } from "react-router-dom";
import { blogPosts } from "../data/blogs";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { useState, useEffect } from "react";

export function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.id === id);
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (post) {
      // Extract headings from markdown content
      const lines = post.content.split("\n");
      const extractedHeadings = lines
        .filter((line) => line.startsWith("#"))
        .map((line, index) => {
          const level = line.match(/^#+/)?.[0].length || 1;
          const text = line.replace(/^#+\s/, "");
          return {
            id: `heading-${index}`,
            text,
            level,
          };
        });
      setHeadings(extractedHeadings);
    }
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

  // Simple markdown renderer
  const renderMarkdown = (content: string) => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
    let inCodeBlock = false;
    let codeContent: string[] = [];
    let codeLanguage = "";

    lines.forEach((line, index) => {
      // Code block
      if (line.startsWith("```")) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLanguage = line.replace("```", "");
          codeContent = [];
        } else {
          inCodeBlock = false;
          elements.push(
            <div key={index} className="my-6 rounded-xl overflow-hidden bg-muted border border-border">
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

      // Headings
      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={index} className="mt-12 mb-6">
            {line.replace("# ", "")}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2 key={index} id={`heading-${index}`} className="mt-10 mb-4 scroll-mt-24">
            {line.replace("## ", "")}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={index} id={`heading-${index}`} className="mt-8 mb-3 scroll-mt-24">
            {line.replace("### ", "")}
          </h3>
        );
      } else if (line.startsWith("#### ")) {
        elements.push(
          <h4 key={index} id={`heading-${index}`} className="mt-6 mb-2 scroll-mt-24">
            {line.replace("#### ", "")}
          </h4>
        );
      }
      // List items
      else if (line.startsWith("- ")) {
        elements.push(
          <li key={index} className="ml-6 my-2 text-muted-foreground">
            {line.replace("- ", "")}
          </li>
        );
      }
      // Empty line
      else if (line.trim() === "") {
        elements.push(<div key={index} className="h-4" />);
      }
      // Regular paragraph
      else if (!line.startsWith("#")) {
        elements.push(
          <p key={index} className="my-4 text-muted-foreground leading-relaxed">
            {line}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <div className="flex-1 bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="rounded-xl"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            블로그 목록으로
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-8 max-w-7xl mx-auto">
          {/* Table of Contents - Left Sidebar (velog style) */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="mb-4 text-sm text-muted-foreground">목차</div>
              <nav className="space-y-2">
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={`block text-sm py-1 transition-colors ${
                      heading.level === 2 ? "pl-0" : "pl-4"
                    } ${
                      activeId === heading.id
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {heading.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <article className="flex-1 max-w-3xl">
            {/* Post Header */}
            <header className="mb-12">
              <h1 className="mb-6">{post.title}</h1>
              
              <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <Badge className="rounded-full">{post.category}</Badge>
                {post.series && (
                  <Badge variant="outline" className="rounded-full">
                    시리즈: {post.series}
                  </Badge>
                )}
              </div>

              {post.tags && post.tags.length > 0 && (
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

            {/* Post Content */}
            <div className="prose prose-lg max-w-none">
              {renderMarkdown(post.content)}
            </div>

            <Separator className="my-12" />

            {/* Share & Navigation */}
            <div className="flex items-center justify-between">
              <Button variant="outline" className="rounded-xl">
                <Share2 className="mr-2 h-4 w-4" />
                공유하기
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="rounded-xl"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                목록으로
              </Button>
            </div>

            {/* Related Posts */}
            {post.series && (
              <div className="mt-12 p-6 bg-muted/30 rounded-2xl">
                <h3 className="mb-4">시리즈의 다른 글</h3>
                <p className="text-sm text-muted-foreground">
                  "{post.series}" 시리즈의 다른 글들을 확인해보세요.
                </p>
              </div>
            )}
          </article>

          {/* Right Sidebar - Author Info (velog style) */}
          <aside className="hidden xl:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="p-6 bg-card border border-border rounded-2xl">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 mb-4 flex items-center justify-center">
                  <span className="text-2xl">👨‍💻</span>
                </div>
                <h4 className="mb-2">프론트엔드 개발자</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  사용자 경험을 최우선으로 생각하는 개발자입니다
                </p>
                <Button variant="outline" size="sm" className="w-full rounded-xl">
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
