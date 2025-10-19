import { useParams, useNavigate } from "react-router-dom";
import { projects } from "../data/projects";
import { ArrowLeft, ExternalLink, Github, Calendar, Users, User, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { ThemeToggle } from "../components/ThemeToggle";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

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
    <div className="min-h-dvh w-full flex flex-col bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/">
            <Button variant="ghost" className="gap-2 hover:cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              홈으로
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </header>
    <div className="flex-1 bg-background overflow-x-hidden">

      <div className="h-7" />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-5xl">
        {/* Title Section */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="rounded-full">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="mb-6 break-words">{project.title}</h1>
          <p className="text-muted-foreground mb-8 break-words">{project.description}</p>

          <div className="flex flex-wrap gap-3">
            {(project.demoUrl && project.demoUrl !== "#") && (
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
            <div className="min-w-0">
              <div className="text-sm text-muted-foreground mb-1">기간</div>
              <div className="break-words">{project.period}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-primary mt-1" />
            <div className="min-w-0">
              <div className="text-sm text-muted-foreground mb-1">팀 구성</div>
              <div className="break-words">{project.team}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-primary mt-1" />
            <div className="min-w-0">
              <div className="text-sm text-muted-foreground mb-1">역할</div>
              <div className="break-words">{project.role}</div>
            </div>
          </div>
        </div>

        {/* Project Overview */}
        <section className="mb-12">
          <h2 className="mb-6">프로젝트 개요</h2>
          <p className="text-muted-foreground leading-relaxed break-words">{project.overview}</p>
        </section>

        <Separator className="my-12" />

        {project.screenshots && project.screenshots.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6">프로젝트 화면</h2>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
              ]}
              className="w-full"
            >
              <CarouselContent>
                {project.screenshots.map((screenshot, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted ">
                      <img
                        src={screenshot}
                        alt={`${project.title} 스크린샷 ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </section>
        )}

        {/* Key Features */}
        <section className="mb-12">
          <h2 className="mb-6">주요 기능</h2>
          <ul className="space-y-3">
           {project.keyFeatures.map((feature, index) => (
              <div key={index} className="p-5 bg-card border border-border rounded-xl">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-2">{feature.title}</h4>
                      {feature.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      )}
                    </div>
                  </div>
                  {feature.relatedBlogId && (
                    <Link to={`/blog/${feature.relatedBlogId}`}>
                      <Button variant="ghost" size="sm" className="gap-2 rounded-xl flex-shrink-0">
                        <BookOpen className="w-4 h-4" />
                        관련 글
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
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
                  <div key={tech} className="rounded-xl border border-border bg-card px-4 py-2 break-words">
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
                    <div key={tech} className="rounded-xl border border-border bg-card px-4 py-2 break-words">
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
                    <div key={tech} className="rounded-xl border border-border bg-card px-4 py-2 break-words">
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
          <h2 className="mb-6">주요 도전 과제</h2>
          
          <div className="space-y-6">
            {project.challenges.map((challenge, index) => (
              <div key={index} className="p-6 bg-card border border-border rounded-2xl">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <span>{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2">{challenge.title}</h3>
                    </div>
                  </div>
                  {challenge.relatedBlogId && (
                    <Link to={`/blog/${challenge.relatedBlogId}`}>
                      <Button variant="outline" size="sm" className="gap-2 rounded-xl flex-shrink-0">
                        <BookOpen className="w-4 h-4" />
                        자세히 보기
                      </Button>
                    </Link>
                  )}
                </div>

                <div className="space-y-4 ml-11">
                  <div>
                    <h4 className="mb-2 text-orange-600">문제 상황</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {challenge.problem}
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-2 text-green-600">해결 방법</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {challenge.solution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground break-words">
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
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground break-words">
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
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground break-words">
                    <span className="flex-shrink-0 text-blue-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="pt-12 text-center hidden sm:block">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/projects")}
            className="rounded-xl hover:cursor-pointer"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
              전체 프로젝트 목록보기
          </Button>
        </div>
      </div>
    </div>
  </div>
  );
}
