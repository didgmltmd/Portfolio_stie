import { Sidebar } from "../components/Sidebar";
import { Projects } from "../components/Projects";
import { Blog } from "../components/Blog";
import { Footer } from "../components/Footer";
import { ProfileSidebar } from "../components/ProfileSidebar";

export default function BlogPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1">
          {/* Projects Section with Profile Sidebar */}
          <section id="projects" className="container mx-auto px-8 py-12">
            <div className="flex gap-8">
              {/* Projects Grid */}
              <div className="flex-1">
                <div className="mb-12">
                  <h2 className="mb-4">프로젝트</h2>
                  <p className="text-muted-foreground">
                    다양한 프로젝트를 통해 얻은 경험과 학습 내용을 공유합니다
                  </p>
                </div>
                
                <Projects />
              </div>

              {/* Right Profile Sidebar */}
              <ProfileSidebar />
            </div>
          </section>

          {/* Blog Section */}
          <Blog />
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
