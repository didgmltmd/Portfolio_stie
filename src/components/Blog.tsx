import { BlogCard } from "./BlogCard";
import { blogPosts } from "../data/blogs";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Blog() {
  const navigate = useNavigate();
  return (
    <section id="blog" className="container mx-auto px-8 py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 flex w-full max-w-full justify-between items-center">
          <div className="">
            <div>
              <h2 className="mb-4">블로그</h2>
              <p className="text-muted-foreground">
                개발하며 배운 내용과 경험을 기록하고 공유합니다
              </p>
            </div>
          </div>
          <div>
            <Button
                  variant="ghost"
                  className="border-2 hover:cursor-pointer"
                  onClick={() => navigate('/blogs')}
                  >
                  전체보기
                  <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            post.primary ?
            <BlogCard key={post.id} post={post} />
            : <></>
          ))}
        </div>
      </div>
    </section>
  );
}
