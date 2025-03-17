"use client";
import React from 'react';
import ProjectCard from './ProjectCard';
import { Projects } from '../../../types/projects'; // Corrected import path

interface ProjectGridProps {
    projects: Projects[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <ProjectCard key={project.id} projects={project} />
            ))}
        </div>
    );
};

export default ProjectGrid;
