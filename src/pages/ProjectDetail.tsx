import { useParams, useNavigate } from "react-router-dom";
import { projects } from "../data/projects";
import { ArrowLeft, ExternalLink, Github, Calendar, Users, User } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { ThemeToggle } from "../components/ThemeToggle";

export function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="mb-4">프로젝트를 찾을 수 없습니다</h2>
          <Button onClick={() => navigate("/")}>홈으로 돌아가기</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-8 py-6 flex flex-row justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-1 rounded-xl hover:cursor-pointer"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            프로젝트 목록으로
          </Button>
          <div className="flex hover:cursor-pointer">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-8 py-12 max-w-5xl">
        {/* Title Section */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="rounded-full">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="mb-6">{project.title}</h1>
          <p className="text-muted-foreground mb-8">{project.description}</p>

          <div className="flex gap-3">
            {project.demoUrl && (
              <Button size="lg" className="rounded-xl" asChild>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  데모 보기
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="outline" size="lg" className="rounded-xl" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  GitHub
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Project Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 p-6 bg-muted/30 rounded-2xl">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-primary mt-1" />
            <div>
              <div className="text-sm text-muted-foreground mb-1">기간</div>
              <div>{project.period}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-primary mt-1" />
            <div>
              <div className="text-sm text-muted-foreground mb-1">팀 구성</div>
              <div>{project.team}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-primary mt-1" />
            <div>
              <div className="text-sm text-muted-foreground mb-1">역할</div>
              <div>{project.role}</div>
            </div>
          </div>
        </div>

        {/* Project Overview */}
        <section className="mb-12">
          <h2 className="mb-6">프로젝트 개요</h2>
          <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
        </section>

        <Separator className="my-12" />

        {/* Key Features */}
        <section className="mb-12">
          <h2 className="mb-6">주요 기능</h2>
          <ul className="space-y-3">
            {project.keyFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-sm">{index + 1}</span>
                </div>
                <p className="text-muted-foreground">{feature}</p>
              </li>
            ))}
          </ul>
        </section>

        <Separator className="my-12" />

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="mb-6">핵심 기술</h2>

          <div className="space-y-6">
            <div>
              <h3 className="mb-4">Frontend</h3>
              <div className="flex flex-wrap gap-3">
                {project.techStack.frontend.map((tech) => (
                  <div
                    key={tech}
                    className="rounded-xl border border-border bg-card px-4 py-2"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {project.techStack.backend && (
              <div>
                <h3 className="mb-4">Backend</h3>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.backend.map((tech) => (
                    <div
                      key={tech}
                      className="rounded-xl border border-border bg-card px-4 py-2"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.techStack.deployment && (
              <div>
                <h3 className="mb-4">Deployment</h3>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.deployment.map((tech) => (
                    <div
                      key={tech}
                      className="rounded-xl border border-border bg-card px-4 py-2"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <Separator className="my-12" />

        {/* Challenges & Outcome */}
        <section className="mb-12">
          <h2 className="mb-6">도전과 성과</h2>

          <div className="space-y-6">
            <div className="rounded-2xl bg-muted/30 p-6">
              <h3 className="mb-3">주요 도전 과제</h3>
              <p className="leading-relaxed text-muted-foreground">{project.challenges}</p>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <h3 className="mb-3 text-primary">성과</h3>
              <p className="leading-relaxed text-muted-foreground">{project.outcome}</p>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* KPT Retrospective */}
        <section className="mb-12">
          <h2 className="mb-6">KPT 회고</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Keep */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10 text-green-600">
                  <span>K</span>
                </div>
                <h3 className="text-green-600">Keep</h3>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">잘했던 점, 계속 유지할 것</p>
              <ul className="space-y-2">
                {project.kpt.keep.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="flex-shrink-0 text-green-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Problem */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
                  <span>P</span>
                </div>
                <h3 className="text-orange-600">Problem</h3>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">아쉬웠던 점, 문제점</p>
              <ul className="space-y-2">
                {project.kpt.problem.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="flex-shrink-0 text-orange-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Try */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                  <span>T</span>
                </div>
                <h3 className="text-blue-600">Try</h3>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">시도해볼 것, 개선 방향</p>
              <ul className="space-y-2">
                {project.kpt.try.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="flex-shrink-0 text-blue-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Back Button */}
        <div className="pt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/")}
            className="rounded-xl"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            프로젝트 목록으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
}
