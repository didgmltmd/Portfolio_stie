import { Projects } from "../components/Projects";
import { Blog } from "../components/Blog";
import { Footer } from "../components/Footer";
import { ProfileSidebar } from "../components/ProfileSidebar";
import { Sidebar } from "../components/Sidebar";
import { Button } from "../ui/button";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { Menu } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export function MainPage() {
  const navigate = useNavigate();
  return (
    <>
      {/* 모바일에서만 보이는 헤더 */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur lg:hidden">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl" aria-label="open sidebar">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[80vw] max-w-[320px] p-0">
                <Sidebar />
              </SheetContent>
            </Sheet>
          </div>

          <ThemeToggle />
        </div>
      </header>

      <Header />
      {/* Main */}
      <main id="projects" className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="mb-6 lg:mb-8 flex flex-col w-full">
          <div className="flex w-full max-w-[52rem] justify-between items-center">
            <h2 className="text-2xl font-semibold tracking-tight mb-2">프로젝트</h2>
            <Button
              variant="ghost"
              className="border-2 gap-2 hover:cursor-pointer"
              onClick={() => navigate('/projects')}
            >
              전체보기
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* 설명 문단도 동일한 폭 기준으로 정렬 */}
          <p className="text-muted-foreground w-full max-w-4xl">
            다양한 프로젝트를 통해 얻은 경험과 학습 내용을 공유합니다.
          </p>
        </div>

        {/* 모바일 1열 / 데스크톱 2열 */}
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            <Projects />
          </div>

          {/* 데스크톱 전용 프로필 사이드바 */}
          <aside className="hidden lg:block w-full lg:w-[320px] xl:w-[360px] shrink-0">
            <div className="sticky top-24">
              <ProfileSidebar />
            </div>
          </aside>
        </div>
      </main>

      <Blog />
      <Footer />
    </>
  );
}
