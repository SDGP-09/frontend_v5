"use client";
import React from "react";
import ProjectCard from "./ProjectCard";
import { completeprojects } from "@/app/types/completeprojects";

interface ProjectGridProps {
    projects: completeprojects[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
};

export default ProjectGrid;
