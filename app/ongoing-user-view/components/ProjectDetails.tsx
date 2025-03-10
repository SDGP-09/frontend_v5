"use client";
import React from "react";
import { Clock } from "lucide-react";
import Image from "next/image";

interface Update {
    date: string;
    text: string;
}

interface Project {
    id: number;
    name: string;
    status: string;
    description: string;
    timeline: string;
    updates: Update[];
    image: string;
}

interface ProjectDetailsProps {
    project: Project;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-64 overflow-hidden relative">
                <Image
                    src={project.image}
                    alt={project.name}
                    layout="fill"
                    objectFit="cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                            {project.status}
                        </span>
                        <h2 className="text-2xl font-bold text-white mt-2">{project.name}</h2>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="flex flex-col md:flex-row md:space-x-8">
                    <div className="md:w-2/3">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Overview</h3>
                        <p className="text-gray-600 mb-6">{project.description}</p>

                        <div className="mb-6">
                            <h4 className="text-md font-semibold text-gray-900 mb-3">Project Timeline</h4>
                            <p className="text-gray-600 flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                                {project.timeline}
                            </p>
                        </div>

                        <div>
                            <h4 className="text-md font-semibold text-gray-900 mb-3">Recent Updates</h4>
                            <div className="space-y-4">
                                {project.updates.map((update, index) => (
                                    <div key={index} className="border-l-2 border-emerald-500 pl-4">
                                        <p className="text-sm text-gray-600">{update.text}</p>
                                        <p className="text-xs text-gray-400 mt-1">{update.date}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/3 mt-6 md:mt-0">
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <div className="flex items-center justify-center mb-4">
                                <div className="relative w-32 h-32">
                                    <svg className="w-full h-full" viewBox="0 0 36 36">
                                        <path
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="#E5E7EB"
                                            strokeWidth="3"
                                        />
                                        <path
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="#10B981"
                                            strokeWidth="3"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
