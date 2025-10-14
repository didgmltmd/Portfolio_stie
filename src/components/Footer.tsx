import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "../ui/button";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="mb-4 text-primary">Portfolio</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                프론트엔드 개발자로서 사용자 중심의<br />
                웹 경험을 만들어갑니다.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="rounded-xl">
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-xl">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-xl">
                  <Mail className="h-5 w-5" />
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
                    <a href="#" className="hover:text-primary transition-colors">
                      이메일
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 Portfolio. Yonam Institute of Technology Univ</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
