import { useMemo, useState,useOptimistic,startTransition } from "react";
import { ProjectCard } from "../components/ProjectCard";
import type { ProjectCategory } from "../data/projects";
import { projects } from "../data/projects";
import { ChevronLeft, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ThemeToggle } from "../components/ThemeToggle";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { Menu } from "lucide-react";
import { Badge } from "../ui/badge";
import ProjectListSidebar from "../components/ProjectListSidebar";

const categories: ProjectCategory[] = ["프로젝트","해커톤","토이 프로젝트"];

export function ProjectListPage(){
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
        let filtered = selectedCategory === "전체"
            ? projects
        : projects.filter(project => project.category === selectedCategory);

        if(optimisticTags.length === 0) return filtered;

        return filtered.filter(project =>
            optimisticTags.every(tag => project.tags.includes(tag))
        )
    },[selectedCategory,optimisticTags]);


    return(
        <div className="min-h-screen flex flex-col w-full">
            <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur lg:hidden">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
                <div>
                    <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-xl hover:cursor-pointer" aria-label="open sidebar">
                        <Menu className="h-5 w-5 " />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="max-w-[250px] p-0">
                        <ProjectListSidebar 
                            projects={projects}
                            categories={categories}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            allTags={allTags}
                            selectedTags={selectedTags}
                            handleTagClick={handleTagClick}
                            clearAll={clearAll}
                        />
                    </SheetContent>
                    </Sheet>
                </div>

                <ThemeToggle />
                </div>
            </header>
            <header className="hidden lg:block border-b sticky top-0 bg-background z-10 w-full">
                <div className=" flex flex-row justify-between">
                    <Link to="/">
                        <Button variant="ghost" className="gap-2 hover:cursor-pointer h-14 ml-[3rem]">
                            <ChevronLeft className="w-4 h-4" />
                            홈으로
                        </Button>
                    </Link>
                    <div className="flex align-middle items-center mr-[3rem]">
                        <ThemeToggle />
                    </div>
                </div>
            </header>
            <div className="flex flex-row">
                <div className="hidden lg:block">
                    <ProjectListSidebar 
                        projects={projects}
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        allTags={allTags}
                        selectedTags={selectedTags}
                        handleTagClick={handleTagClick}
                        clearAll={clearAll}
                        />
                </div>
                <main className="container px-8">
                    <div className="mb-8 mx-auto px-8 py-12">
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