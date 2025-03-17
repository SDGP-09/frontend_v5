"use client";
import React from "react";
import { completeprojects } from "@/app/types/completeprojects";

interface ProjectCardProps {
    project: completeprojects;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Project Image */}
            <div className="relative h-48">
                <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
                {/* Optionally show a hidden badge if visibility is "Hidden" */}
                {project.visibility === "Hidden" && (
                    <div className="absolute bottom-4 left-0 right-0 mx-auto w-max">
            <span className="bg-white text-gray-700 px-3 py-1 rounded-full text-xs font-medium shadow-md">
              Hidden Project
            </span>
                    </div>
                )}
            </div>

            {/* Project Info */}
            <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

                {/* Completion Date */}
                <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-1">Completed</div>
                    <div className="text-sm text-gray-600">{project.completedDate}</div>
                </div>

                {/* Project Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
                    <div className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-1"
                        >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>{project.duration}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
