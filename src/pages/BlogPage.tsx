import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Projects } from "../components/Projects";
import { Blog } from "../components/Blog";
import { Footer } from "../components/Footer";

function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Projects />
        <Blog />
      </main>
      <Footer />
    </div>
  );
}

export default BlogPage;