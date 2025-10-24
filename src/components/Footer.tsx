import { Github, Instagram } from "lucide-react";
import { Button } from "../ui/button";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container px-4 py-16">
        <div className="max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="mb-4 text-primary">Portfolio</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                프론트엔드 개발자로서 사용자 중심의<br />
                웹 경험을 만들어갑니다.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="rounded-xl">
                  <a href="https://github.com/didgmltmd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex justify-center align-middle"
                  >
                      <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" className="rounded-xl">
                  <a href="https://www.instagram.com/little_sheep_133/?hl=ko"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex justify-center align-middle"
                  >
                      <Instagram className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="mb-4">메뉴</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li>
                    <button
                      onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                      className="hover:text-primary transition-colors"
                    >
                      프로젝트
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" })}
                      className="hover:text-primary transition-colors"
                    >
                      블로그
                    </button>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="mb-4">연락</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li>
                    <div className="hover:text-primary transition-colors">
                      gomboy11@naver.com
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 YHS Portfolio. Yonam Institute of Technology</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
