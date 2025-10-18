import { Badge } from "../ui/badge";
import { ThemeToggle } from "./ThemeToggle";

export function ProfileSidebar() {
  const skills = [
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Git',
    'REST API',
  ];

  return (
    <div className="w-80 space-y-6">
      {/* About Me Card */}
      <div className="bg-card border border-border rounded-2xl p-6 sticky top-6">
        <div className="flex flex-row space-x-38">
          <h3 className="mb-4">About Me</h3>
          <div className="">
            <ThemeToggle/>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          "도전이 없으면 성취도 없다" <br /> <span className="font-light flex justify-end mt-2 mr-5">-벤자민 프랭클린</span>
        </p>
                  {/* 성장 중인 프론트엔드 개발자로서, 매일 새로운 기술과 문제에 도전하며 스스로의 한계를 넓혀가고 있습니다.<br />
          앞으로도 도전을 멈추지 않는 개발자, <br/>
          사용자의 경험을 통해 스스로 성장하는 프론트엔드 개발자가 되고자 합니다. */}

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
