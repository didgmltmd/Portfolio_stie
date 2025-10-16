import { useState } from "react";
import { ProjectCard } from "../components/ProjectCard";
import type { ProjectCategory } from "../data/projects";
import { projects } from "../data/projects";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";


const categories: ProjectCategory[] = ["프로젝트","해커톤","토이 프로젝트"];

export function ProjectListPage(){
    const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "전체">("전체");

    const filteredProjects = selectedCategory === "전체"
        ? projects
        :projects.filter(project => project.category === selectedCategory);


        return(
            <div className="min-h-screen flex flex-col">
                <header className="border-b sticky top-0 bg-background z-10">
                    <Link to="/">
                        <Button variant="ghost" className="gap-2 hover:cursor-pointer">
                            <ChevronLeft className="w-4 h-4" />
                            홈으로
                        </Button>
                    </Link>
                </header>


                <div className="flex-1 flex">
                    <aside className="w-64 border-r bg-muted/30 p-6">
                        <div className="sticky top-24">
                            <h3 className="mb-4">카테고리</h3>
                            <nav className="space-y-2">
                                <button
                                    onClick={() => setSelectedCategory("전체")}
                                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
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
                                            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
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
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>

                        {filteredProjects.length === 0 && (
                            <div className="text-center py-20 text-muted-foreground">
                                해당 카테고리에 프로젝트가 없습니다.
                            </div>
                        )}
                    </main>
                </div>
            </div>
        )
}