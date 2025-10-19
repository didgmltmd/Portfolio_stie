import { useMemo, useState,useOptimistic,startTransition } from "react";
import { ProjectCard } from "../components/ProjectCard";
import type { ProjectCategory } from "../data/projects";
import { projects } from "../data/projects";
import { ChevronLeft, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ThemeToggle } from "../components/ThemeToggle";
import { Badge } from "../ui/badge";

const categories: ProjectCategory[] = ["프로젝트","해커톤","토이 프로젝트"];

export function BlogList(){
    const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "전체">("전체");
    const [selectedTags,setSelectedTags ] = useState<string[]>([]);

    const allTags = useMemo(() => {
        const tagSet = new Set<string>();
        projects.forEach(project => {
            project.tags.forEach(tag => tagSet.add(tag));
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


    const filteredProjects = useMemo(() => {
        if(optimisticTags.length === 0) return projects;
        return projects.filter(p =>
            optimisticTags.every(tag => p.tags.includes(tag))
        )
    },[optimisticTags]);


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
                                <span className="ml-2 text-sm opacity-70">({projects.length})</span>
                            </button>
                            {categories.map((category) => {
                                const count = projects.filter(p => p.category === category).length;
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
                            {selectedCategory === "전체" ? "모든 프로젝트" : selectedCategory}
                        </h1>
                        <p className="text-muted-foreground">
                            총 {filteredProjects.length}개의 프로젝트
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
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-20 text-muted-foreground">
                            {selectedTags.length > 0
                                ? "선택한 태그와 일치하는 프로젝트가 없습니다."
                                : "해당 카테고리에 프로젝트가 없습니다."
                            }
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}