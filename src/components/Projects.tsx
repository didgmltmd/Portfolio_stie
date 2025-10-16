import { ProjectCard } from "./ProjectCard";
import { projects } from "../data/projects";

export function Projects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <>
          {project.primary ? <ProjectCard key={project.id} project={project} /> : <></>}
        </>
      ))}
    </div>
  );
}
