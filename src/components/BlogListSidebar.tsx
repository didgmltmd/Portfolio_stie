import type { BlogCategory } from "../data/blogs";
import { Button } from "../ui/button";
import { blogPosts } from "../data/blogs";
import { X } from "lucide-react";
import { Badge } from "../ui/badge";


interface BlogSidebarProps {
    setSelectedCategory: (category: BlogCategory | "전체") => void;
    selectedCategory : BlogCategory | "전체"
    categories: BlogCategory[];
    selectedTags: string[];
    allTags: string[];
    handleTagClick: (tag:string) => void;
    clearAll: () => void;
}

export default function BlogListSidebar({  
    setSelectedCategory,
    selectedCategory,
    categories,
    selectedTags,
    allTags,
    handleTagClick,
    clearAll
}:BlogSidebarProps) {
    return(
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
        </div>
    )
}