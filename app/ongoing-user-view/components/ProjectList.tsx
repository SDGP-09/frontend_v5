"use client";
import React from "react";
import Image from "next/image";

interface Project {
    id: number;
    name: string;
    status: string;
    description: string;
    timeline: string;
    updates: { date: string; text: string }[];
    image: string;
}


interface ProjectListProps {
    projects: Project[];
    selectedProjectId: number | null;
    onSelectProject: (id: number) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({
                                                     projects,
                                                     selectedProjectId,
                                                     onSelectProject,
                                                 }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <div
                    key={project.id}
                    className={`bg-white rounded-lg shadow overflow-hidden ${selectedProjectId === project.id ? "ring-2 ring-emerald-500" : ""}`}
                >
                    <div className="h-48 overflow-hidden relative">
                        <Image
                            src={project.image}
                            alt={project.name}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                {project.status}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                        <button
                            className="w-full py-2 bg-emerald-50 text-emerald-700 rounded-md text-sm font-medium hover:bg-emerald-100 transition-colors"
                            onClick={() => onSelectProject(project.id)}
                        >
                            View Details
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProjectList;

