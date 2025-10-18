import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import type { Project } from "../data/projects";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState(project.image);

  return (
    <Card
      className="group cursor-pointer overflow-hidden border-0 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      onClick={() => navigate(`/project/${project.id}`)}
    >
      {/* 썸네일 */}
      <div className="aspect-video overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
        <img
          src={imgSrc}
          alt={project.title}
          onError={() => setImgSrc("/fallback.jpg")}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <CardHeader>
        <div className="mb-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full">
              {tag}
            </Badge>
          ))}
        </div>

        <CardTitle className="flex items-center justify-between transition-colors group-hover:text-primary">
          {project.title}
          <ArrowRight className="h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" />
        </CardTitle>

        <CardDescription className="text-base">{project.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-5">
          <div className="rounded-2xl bg-muted/50 p-4">
            <h4 className="mb-2">프로젝트 회고</h4>
            <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {project.retrospective}
            </p>
          </div>

          <div
            className="flex gap-3"
            onClick={(e) => e.stopPropagation()} // 카드 클릭 방지
          >
            {(project.demoUrl && project.demoUrl != "#") && (
              <Button variant="outline" size="sm" className="flex-1 rounded-xl" asChild>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  데모
                </a>
              </Button>
            )}


            {project.githubUrl && (
              <Button variant="outline" size="sm" className="flex-1 rounded-xl" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  코드
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
