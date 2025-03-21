"use client";
import React from "react";
import Image from "next/image";
import { Eye, EyeOff, Lock, MoreVertical } from "lucide-react";

interface Project {
    id: number;
    title: string;
    description: string;
    status: string;
    duration: string;
    image: string;
    visible: boolean;
    private: boolean;
}

interface ProjectCardProps {
    project: Project;
    isAdmin: boolean;
    onToggleVisibility: () => void;
    onTogglePrivacy: () => void;
    onViewDetails: () => void;
}

export default function ProjectCard({
                                        project,
                                        isAdmin,
                                        onToggleVisibility,
                                        onTogglePrivacy,
                                        onViewDetails,
                                    }: ProjectCardProps) {
    // Determine status badge styles
    let statusClasses = "";
    if (project.status === "In Progress") {
        statusClasses = "bg-blue-100 text-blue-800";
    } else if (project.status === "Planning") {
        statusClasses = "bg-yellow-100 text-yellow-800";
    } else {
        statusClasses = "bg-green-100 text-green-800";
    }

    return (
        <div
            className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                !project.visible && isAdmin
                    ? "opacity-70 border border-dashed border-gray-300"
                    : ""
            }`}
        >
            <div className="relative h-48">
                <Image
                    src={project.image}
                    alt={project.title}
                    width={384} // Equivalent to w-full for the image width (h-full)
                    height={192} // Equivalent to the h-48 height
                    className="w-full h-full object-cover"
                    priority // Optional: Ensures faster loading for this key image
                />
                <div className="absolute top-3 right-3 flex space-x-2">
                    {isAdmin && (
                        <>
                            <button
                                onClick={onToggleVisibility}
                                className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                                title={project.visible ? "Hide Project" : "Show Project"}
                            >
                                {project.visible ? (
                                    <Eye size={18} className="text-emerald-600" />
                                ) : (
                                    <EyeOff size={18} className="text-gray-600" />
                                )}
                            </button>
                            <button
                                onClick={onTogglePrivacy}
                                className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                                title={project.private ? "Make Public" : "Make Private"}
                            >
                                <Lock
                                    size={18}
                                    className={project.private ? "text-blue-600" : "text-gray-400"}
                                />
                            </button>
                        </>
                    )}

                </div>
                <div className="absolute top-3 left-3 flex space-x-2">
                    <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusClasses}`}
                    >
                        {project.status}
                    </div>
                    {project.private && (
                        <div className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Private
                        </div>
                    )}
                </div>
                {!project.visible && isAdmin && (
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-20 flex items-center justify-center">
                        <div className="bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-800">
                            Hidden Project
                        </div>
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {project.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {project.description}
                </p>

                {/* Removed progress section */}

                <div className="flex justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{project.duration}</span>
                    </div>
                    {isAdmin && (
                        <div className="flex space-x-2">
                            <button
                                onClick={onViewDetails}
                                className="text-blue-600 hover:text-blue-800"
                                title="View Details"
                            >
                                View Details
                            </button>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
