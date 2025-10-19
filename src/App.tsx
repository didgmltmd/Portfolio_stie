import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { MainPage } from "./pages/MainPage";
import { ProjectDetail } from "./pages/ProjectDetailPage";
import { BlogDetail } from "./pages/BlogDetailPage";
import { ProjectListPage } from "./pages/ProjectList";
import { BlogList } from "./pages/BlogList";
import ScrollToTop from "./hooks/scrollToTop";

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex">
        <Routes>
          {/* Routes with Sidebar */}
          <Route
            path="/"
            element={
              <>
                <div className="hidden lg:block">
                  <Sidebar />
                </div>
                <div className="flex-1 flex flex-col">
                  <MainPage />
                </div>
              </>
            }
          />
          
          {/* Routes without Sidebar (Full Width) */}
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/projects" element={<ProjectListPage />} />
          <Route path="/blogs" element={<BlogList />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
