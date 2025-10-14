import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "../ui/button";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <button
            onClick={() => scrollToSection("home")}
            className="text-xl hover:text-primary/80 transition-colors"
          >
            Portfolio
          </button>
          
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("projects")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              프로젝트
            </button>
            <button
              onClick={() => scrollToSection("blog")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              블로그
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("projects")}
              className="text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              프로젝트
            </button>
            <button
              onClick={() => scrollToSection("blog")}
              className="text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              블로그
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
