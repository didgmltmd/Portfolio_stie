import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ExternalLink, Github } from "lucide-react";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  retrospective: string;
  demoUrl?: string;
  githubUrl?: string;
}

export function ProjectCard({
  title,
  description,
  image,
  tags,
  retrospective,
  demoUrl,
  githubUrl,
}: ProjectCardProps) {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video overflow-hidden">
        <img
          src={imgSrc}
          alt={title}
          onError={() => setImgSrc("/fallback.jpg")}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="pt-4 border-t border-border">
            <h4 className="mb-2 text-sm">프로젝트 회고</h4>
            <p className="text-sm text-muted-foreground">{retrospective}</p>
          </div>

          <div className="flex gap-2 pt-2">
            {demoUrl && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                asChild
              >
                <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  데모 보기
                </a>
              </Button>
            )}
            {githubUrl && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                asChild
              >
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  코드 보기
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
