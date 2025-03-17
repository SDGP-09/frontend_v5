"use client";
import React from "react";
import Image from "next/image";
import { Projects } from "@/app/types/projects";

interface ProjectCardProps {
    project: Projects;
    isAdmin?: boolean;
    onToggleVisibility?: (id: string) => void;
    onViewDetails?: () => void;
}

export default function ProjectCard({
                                        project,
                                        isAdmin,
                                        onToggleVisibility,
                                        onViewDetails,
                                    }: ProjectCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={196}
                    height={196}
                    className="rounded object-cover"
                    priority
                />
                {isAdmin && onToggleVisibility && (
                    <button
                        onClick={() => onToggleVisibility(project.id)}
                        className="absolute top-3 left-3 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                        title={project.visibility ? "Hide Project" : "Show Project"}
                    >
                        {project.visibility ? "Hide" : "Show"}
                    </button>
                )}
            </div>
            <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-1">Completed</div>
                    <div className="text-sm text-gray-600">{project.completedDate}</div>
                </div>
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
                    {isAdmin && onViewDetails && (
                        <button
                            onClick={onViewDetails}
                            className="text-blue-600 hover:text-blue-800"
                            title="View Details"
                        >
                            View Details
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
