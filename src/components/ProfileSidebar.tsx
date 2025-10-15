import { Badge } from "../ui/badge";
import { ThemeToggle } from "./ThemeToggle";

export function ProfileSidebar() {
  const skills = [
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Next.js',
    'Redux',
    'React Query',
    'Vite',
    'Git',
    'Figma',
    'REST API',
  ];

  return (
    <div className="w-80 space-y-6">
      {/* About Me Card */}
      <div className="bg-card border border-border rounded-2xl p-6 sticky top-6">
        <div className="flex flex-row space-x-38">
          <h3 className="mb-4">About Me</h3>
          <div className="mb-[-3px]">
            <ThemeToggle/>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          성장중인 프론트엔드 개발자로, 
          사용자 경험을 최우선으로 생각하며 
          깨끗하고 유지보수 가능한 코드를 작성하고자 노력중입니다.
        </p>

        <div className="mb-6">
          <h4 className="mb-3 text-sm">보유 기술</h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="rounded-full">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <h4 className="mb-3 text-sm">관심 분야</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• 웹 접근성 (a11y)</li>
            <li>• 성능 최적화</li>
            <li>• UI/UX 디자인</li>
            <li>• 디자인 시스템</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
