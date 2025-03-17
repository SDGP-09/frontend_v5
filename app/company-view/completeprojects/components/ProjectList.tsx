"use client";
import React from "react";
import { completeprojects } from "@/app/types/completeprojects";
import ProjectCard from "./ProjectCard";

interface ProjectListProps {
    projects: completeprojects[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
};

export default ProjectList;
