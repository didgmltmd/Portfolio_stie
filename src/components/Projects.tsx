import { ProjectCard } from "./ProjectCard";

const projects = [
  {
    title: "E-Commerce 플랫폼",
    description: "React와 TypeScript로 구축한 현대적인 이커머스 웹 애플리케이션",
    image: "https://images.unsplash.com/photo-1558181445-eca4774b2a37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYwMzc4MTAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["React", "TypeScript", "Tailwind CSS", "Redux"],
    retrospective: "상태 관리의 복잡성을 경험하며 Redux Toolkit의 효율성을 배웠습니다. 특히 장바구니 기능 구현 시 최적화의 중요성을 깨달았고, useMemo와 useCallback을 적절히 활용하여 성능을 30% 개선했습니다.",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    title: "실시간 채팅 애플리케이션",
    description: "WebSocket을 활용한 실시간 메시징 플랫폼",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBzY3JlZW58ZW58MXx8fHwxNzYwMzIzMDMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["React", "WebSocket", "Node.js", "CSS Modules"],
    retrospective: "실시간 통신의 어려움을 경험했습니다. 연결 끊김 처리와 재연결 로직 구현이 가장 도전적이었고, 에러 처리와 사용자 피드백의 중요성을 배웠습니다. 테스트 주도 개발의 필요성도 느꼈습니다.",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    title: "대시보드 UI 시스템",
    description: "재사용 가능한 컴포넌트 라이브러리를 갖춘 관리자 대시보드",
    image: "https://images.unsplash.com/photo-1677214467820-ab069619bbb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXNpZ258ZW58MXx8fHwxNzYwMzAwMTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["React", "Recharts", "Storybook", "Tailwind CSS"],
    retrospective: "컴포넌트 설계의 중요성을 깊이 이해하게 되었습니다. Atomic Design 패턴을 적용하여 유지보수성을 높였고, Storybook을 통한 문서화로 팀 협업이 원활해졌습니다. 접근성(a11y)도 고려하여 개발했습니다.",
    demoUrl: "#",
    githubUrl: "#",
  },
];

export function Projects() {
  return (
    <section id="projects" className="container mx-auto px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4">프로젝트</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            다양한 프로젝트를 통해 얻은 경험과 학습 내용을 공유합니다
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
