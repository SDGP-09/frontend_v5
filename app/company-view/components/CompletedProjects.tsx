
"use client";
import React from "react";
import { Info } from "lucide-react";

interface Project {
    id: number;
    title: string;
    image: string;
}

interface CompletedProjectsProps {
    projects: Project[];
}

const CompletedProjects: React.FC<CompletedProjectsProps> = ({ projects }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Completed Projects</h2>
                <button className="text-blue-500 hover:text-blue-600 transition-colors">
                    View All
                </button>
            </div>
            <div className="overflow-x-auto">
                <div className="flex gap-4 pb-4">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="flex-shrink-0 w-72 group hover:transform hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="relative aspect-video rounded-lg overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button className="bg-white text-gray-900 px-4 py-2 rounded-md flex items-center gap-2">
                                        <Info className="w-4 h-4" />
                                        Details
                                    </button>
                                </div>
                            </div>
                            <h3 className="mt-2 font-semibold">{project.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CompletedProjects;
