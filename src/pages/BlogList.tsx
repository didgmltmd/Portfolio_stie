import { useMemo, useState,useOptimistic,startTransition } from "react";
import type {  BlogCategory } from "../data/blogs";
import { BlogCard } from "../components/BlogCard";
import { blogPosts } from "../data/blogs";
import { ChevronLeft, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ThemeToggle } from "../components/ThemeToggle";
import { Badge } from "../ui/badge";

const categories: BlogCategory[] = ["공부" , "프로젝트" , "알고리즘" , "대외활동"];

export function BlogList(){
    const [selectedCategory, setSelectedCategory] = useState<BlogCategory | "전체">("전체");
    const [selectedTags,setSelectedTags ] = useState<string[]>([]);

    const allTags = useMemo(() => {
        const tagSet = new Set<string>();
        blogPosts.forEach(post => {
            post.tags.forEach(tag => tagSet.add(tag));
        });
        return Array.from(tagSet).sort();
    },[]);

    const [optimisticTags,applyOptimistic] = useOptimistic<string[],string[]>(
        selectedTags,
        (_state, newTags) => newTags
    );

    const handleTagClick = (tag:string) => {
        const next = optimisticTags.includes(tag)
            ? optimisticTags.filter(t => t !== tag)
            : [...optimisticTags,tag];


        startTransition(() => {
            applyOptimistic(next);
        })
        
        setSelectedTags(next);
    }

    const clearAll = () => {
        startTransition(() => {
            applyOptimistic([]);
        });
        setSelectedTags([]);
    };


    const filteredPosts = useMemo(() => {
        let filtered = selectedCategory === "전체"
            ? blogPosts
        : blogPosts.filter(post => post.category === selectedCategory);

        if(optimisticTags.length === 0) return filtered;

        return filtered.filter(project =>
            optimisticTags.every(tag => project.tags.includes(tag))
        )
    },[selectedCategory,optimisticTags]);


    return(
        <div className="min-h-screen flex flex-col">
            <header className="border-b sticky top-0 bg-background z-10 flex flex-row justify-between">
                <Link to="/">
                    <Button variant="ghost" className="gap-2 hover:cursor-pointer h-14 ml-[3rem]">
                        <ChevronLeft className="w-4 h-4" />
                        홈으로
                    </Button>
                </Link>
                <div className="flex align-middle items-center mr-[3rem]">
                    <ThemeToggle />
                </div>
            </header>


            <div className="flex-1 flex">
                <aside className="w-64 border-r bg-muted/30 p-6">
                    <div className="sticky top-24">
                        <h3 className="mb-4">카테고리</h3>
                        <nav className="space-y-2">
                            <button
                                onClick={() => setSelectedCategory("전체")}
                                className={`hover:cursor-pointer w-full text-left px-4 py-2 rounded-lg transition-colors ${
                                    selectedCategory === "전체"
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-muted"
                                }`}
                            >
                                전체
                                <span className="ml-2 text-sm opacity-70">({blogPosts.length})</span>
                            </button>
                            {categories.map((category) => {
                                const count = blogPosts.filter(p => p.category === category).length;
                                return(
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`hover:cursor-pointer w-full text-left px-4 py-2 rounded-lg transition-colors ${
                                            selectedCategory === category
                                                ? "bg-primary text-primary-foreground"
                                                : "hover:bg-muted"
                                        }`}
                                    >
                                        {category}
                                        <span className="ml-2 text-sm opacity-70">({count})</span>
                                    </button>
                                )
                            })}
                  
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3>기술 태그</h3>
                                {selectedTags.length > 0 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={clearAll}
                                        className="h-auto p-1 text-xs"
                                    >
                                        초기화
                                    </Button>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {allTags.map((tag) => {
                                    const isSelected = selectedTags.includes(tag);
                                    return(
                                        <Badge
                                            key={tag}
                                            variant={isSelected ? "default" : "outline"}
                                            className="cursor-pointer hover:bg-primary/90 transition-colors"
                                            onClick={() => handleTagClick(tag)}
                                        >
                                            {tag}
                                            {isSelected && <X className="w-3 h-3 ml-1" />}
                                        </Badge>
                                    )
                                })}
                            </div>
                        </div>

                      </nav>
                    </div>
                </aside>

                <main className="flex-1 container mx-auto px-8 py-12">
                    <div className="mb-8">
                        <h1 className="mb-4">
                            {selectedCategory === "전체" ? "모든 포스트" : selectedCategory}
                        </h1>
                        <p className="text-muted-foreground">
                            총 {filteredPosts.length}개의 포스트
                        </p>
                        {selectedTags.length > 0 && (
                            <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm text-muted-foreground">필터:</span>
                            {selectedTags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="gap-1 hover:cursor-pointer" onClick={() => handleTagClick(tag)}>
                                {tag}
                                <X
                                    className="w-3 h-3 cursor-pointer"
                                />
                                </Badge>
                            ))}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>

                    {filteredPosts.length === 0 && (
                        <div className="text-center py-20 text-muted-foreground">
                            {selectedTags.length > 0
                                ? "선택한 태그와 일치하는 포스트가 없습니다."
                                : "해당 카테고리에 포스트가 없습니다."
                            }
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}