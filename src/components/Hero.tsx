import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "../ui/button";

export function Hero() {
  return (
    <section id="home" className="container mx-auto px-4 py-20 md:py-32">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-4">
            Frontend Developer
          </span>
        </div>
        
        <h1 className="mb-6">
          안녕하세요,<br />
          프론트엔드 개발자 양희승 포트폴리오입니다
        </h1>
        
        <p className="mb-8 text-muted-foreground max-w-2xl mx-auto">
          사용자 경험을 최우선으로 생각하며, 깨끗하고 유지보수 가능한 코드를 작성합니다.
          React, TypeScript, Tailwind CSS를 활용한 현대적인 웹 애플리케이션 개발에 열정을 가지고 있습니다.
        </p>
        
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Button size="lg">
            <Mail className="mr-2 h-4 w-4" />
            연락하기
          </Button>
          <Button variant="outline" size="lg">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
          <Button variant="outline" size="lg">
            <Linkedin className="mr-2 h-4 w-4" />
            LinkedIn
          </Button>
        </div>
      </div>
    </section>
  );
}
