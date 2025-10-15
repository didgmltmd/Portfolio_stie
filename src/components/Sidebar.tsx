import { Github, Mail, Linkedin,Instagram } from "lucide-react";
import { Button } from "../ui/button";
import profile_img from "../../public/assets/profile_image.jpg"

export function Sidebar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside className="w-80 h-screen sticky top-0 bg-card border-r border-border flex flex-col p-8">
      {/* Profile Section */}
      <div className="mb-2">
        <div className="w-60 h-50 rounded-2xl  from-primary to-primary/60 mb-6 flex items-center justify-center">
          <img src={profile_img} className="ml-5 w-50 h-55 rounded-4xl"/>
        </div>
        
        <h2 className="mb-2">프론트엔드 개발자<br /><b>양희승</b></h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          사용자 경험을 최우선으로<br />
          생각하는 개발자입니다
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        <button
          onClick={() => scrollToSection("projects")}
          className="w-full text-left px-4 py-3 rounded-xl hover:bg-primary/10 text-foreground hover:text-primary transition-colors"
        >
          프로젝트
        </button>
        <button
          onClick={() => scrollToSection("blog")}
          className="w-full text-left px-4 py-3 rounded-xl hover:bg-primary/10 text-foreground hover:text-primary transition-colors"
        >
          블로그
        </button>
      </nav>

      {/* Stats */}
      <div className="py-6 border-t border-border space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">프로젝트</span>
          <span className="text-primary">5+</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">경력</span>
          <span className="text-primary">2학년(대학생)</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">블로그 글</span>
          <span className="text-primary">20+</span>
        </div>
      </div>

      {/* Awards */}
      <div className="py-6 border-t border-border">
        <h4 className="text-sm mb-3">수상 경력</h4>
        <div className="space-y-1">
          <div className="text-xs">
            <div className="text-muted-foreground">2025</div>
            <div className="text-foreground mb-1">🏆 교내 해커톤 대상</div>
          </div>
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="space-y-3 pt-6 border-t border-border">
        <Button className="w-full rounded-xl justify-start hover:cursor-pointer" size="lg">
          <Mail className="mr-2 h-5 w-5" />
          연락하기
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="flex-1 rounded-xl hover:cursor-pointer">
            <a href="https://github.com/didgmltmd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex justify-center align-middle"
              >
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" className="flex-1 rounded-xl hover:cursor-pointer">
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
    </aside>
  );
}
