import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="mb-4">Portfolio</h3>
              <p className="text-sm text-muted-foreground">
                프론트엔드 개발자로서 사용자 중심의 웹 경험을 만들어갑니다.
              </p>
            </div>
            
            <div>
              <h4 className="mb-4">빠른 링크</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button
                    onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                    className="hover:text-foreground transition-colors"
                  >
                    프로젝트
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" })}
                    className="hover:text-foreground transition-colors"
                  >
                    블로그
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-4">연락처</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2024 Portfolio. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
