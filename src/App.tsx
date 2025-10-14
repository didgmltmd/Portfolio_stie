import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { MainPage } from "./pages/MainPage";
import { ProjectDetail } from "./pages/ProjectDetail";
import { BlogDetail } from "./pages/BlogDetail";

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex">
        <Routes>
          {/* Routes with Sidebar */}
          <Route
            path="/"
            element={
              <>
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <MainPage />
                </div>
              </>
            }
          />
          
          {/* Routes without Sidebar (Full Width) */}
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
