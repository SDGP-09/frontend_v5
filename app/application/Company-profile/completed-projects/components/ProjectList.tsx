"use client";
import React from "react";
import { Projects } from "@/app/types/projects";
import ProjectCard from "./ProjectCard";

interface ProjectListProps {
    projects: Projects[];
    isAdmin: boolean;
    onToggleVisibility: (id: string) => void;
    onViewDetails: (id: string) => void;
}

export default function ProjectList({
                                        projects,
                                        isAdmin,
                                        onToggleVisibility,
                                        onViewDetails,
                                    }: ProjectListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    isAdmin={isAdmin}
                    onToggleVisibility={onToggleVisibility}
                    onViewDetails={() => onViewDetails(project.id)}
                />
            ))}
        </div>
    );
}
