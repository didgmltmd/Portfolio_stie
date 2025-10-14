import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="테마 전환"
    >
      {theme === "light" ? (
        <Moon className="h-50px w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
}
