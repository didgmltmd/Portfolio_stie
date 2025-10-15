import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "../data/blogs";
import { useNavigate } from "react-router-dom";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const navigate = useNavigate();

  return (
    <Card 
      className="hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-0 shadow-lg group"
      onClick={() => navigate(`/blog/${post.id}`)}
    >
      <CardHeader>
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="rounded-full">{post.category}</Badge>
        </div>
        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">{post.title}</CardTitle>
        <CardDescription className="line-clamp-3 text-base leading-relaxed">{post.excerpt}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </CardContent>
    </Card>
  );
}
