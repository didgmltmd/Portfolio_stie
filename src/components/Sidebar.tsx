import { Github, Mail, Linkedin } from "lucide-react";
import { Button } from "../ui/button";
import profile_image from "../../public/assets/profile_image.jpg"

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
      <div className="mb-8">
        <div className="w-50 h-50 rounded-2xl from-primary to-primary/60 mb-6 flex items-center justify-center">
          <img src={profile_image} className="w-50 h-50 rounded-4xl"/>
        </div>
        
        <h2 className="mb-2">프론트엔드 개발자<br /><b>양희승</b></h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          사용자 경험을 최우선으로<br />
          생각하는 개발자입니다
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
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
      <div className="py-6 border-t border-border space-y-4">
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

      {/* Contact Buttons */}
      <div className="space-y-3 pt-6 border-t border-border">
        <Button className="w-full rounded-xl justify-start" size="lg">
          <Mail className="mr-2 h-5 w-5" />
          연락하기
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="flex-1 rounded-xl">
            <Github className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="flex-1 rounded-xl">
            <Linkedin className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
