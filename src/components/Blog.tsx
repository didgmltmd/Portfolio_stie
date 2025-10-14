import { BlogCard } from "./BlogCard";

const blogPosts = [
  {
    title: "React 18의 새로운 기능과 Concurrent Rendering 이해하기",
    excerpt: "React 18에서 도입된 Concurrent Rendering의 개념과 실제 프로젝트에 적용한 경험을 공유합니다. useTransition과 useDeferredValue의 활용 사례를 소개합니다.",
    date: "2024년 10월 1일",
    readTime: "8분",
    category: "React",
  },
  {
    title: "TypeScript 고급 타입 시스템 활용하기",
    excerpt: "제네릭, 유틸리티 타입, 조건부 타입 등 TypeScript의 고급 기능을 활용하여 더 안전하고 유지보수 가능한 코드를 작성하는 방법을 알아봅니다.",
    date: "2024년 9월 15일",
    readTime: "10분",
    category: "TypeScript",
  },
  {
    title: "성능 최적화: 웹 애플리케이션 로딩 속도 50% 개선하기",
    excerpt: "Code Splitting, Lazy Loading, 이미지 최적화 등 다양한 기법을 통해 실제 프로젝트의 성능을 대폭 개선한 경험을 공유합니다.",
    date: "2024년 9월 1일",
    readTime: "12분",
    category: "Performance",
  },
  {
    title: "Tailwind CSS로 일관성 있는 디자인 시스템 구축하기",
    excerpt: "Tailwind CSS의 커스터마이징 기능을 활용하여 프로젝트에 맞는 디자인 시스템을 구축하고 관리하는 방법을 소개합니다.",
    date: "2024년 8월 20일",
    readTime: "7분",
    category: "CSS",
  },
  {
    title: "접근성(a11y)을 고려한 웹 개발 가이드",
    excerpt: "모든 사용자가 웹사이트를 사용할 수 있도록 접근성을 고려한 개발 방법과 테스트 도구를 소개합니다. WCAG 가이드라인을 따르는 실용적인 팁을 공유합니다.",
    date: "2024년 8월 5일",
    readTime: "9분",
    category: "Accessibility",
  },
  {
    title: "모던 프론트엔드 테스팅: Jest와 Testing Library",
    excerpt: "Jest와 React Testing Library를 활용한 효과적인 테스트 작성 방법과 TDD 개발 프로세스를 실제 예제와 함께 설명합니다.",
    date: "2024년 7월 18일",
    readTime: "11분",
    category: "Testing",
  },
];

export function Blog() {
  return (
    <section id="blog" className="container mx-auto px-4 py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4">블로그</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            개발하며 배운 내용과 경험을 기록하고 공유합니다
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <BlogCard key={post.title} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
}
