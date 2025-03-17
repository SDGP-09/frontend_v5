"use client";
import React from "react";

interface ProjectCountProps {
    filteredCount: number;
    totalCount: number;
    isAdmin: boolean;
    visibleCount: number;
    hiddenCount: number;
}

export default function ProjectCount({
                                         filteredCount,
                                         totalCount,
                                         isAdmin,
                                         visibleCount,
                                         hiddenCount,
                                     }: ProjectCountProps) {
    return (
        <div className="mb-4 text-sm text-gray-600 flex justify-between items-center">
            <div>
                Showing {filteredCount} of {totalCount} projects
            </div>
            {isAdmin && (
                <div className="text-sm text-gray-600">
          <span className="mr-4">
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
            Visible: {visibleCount}
          </span>
                    <span>
            <span className="inline-block w-3 h-3 bg-gray-400 rounded-full mr-1"></span>
            Hidden: {hiddenCount}
          </span>
                </div>
            )}
        </div>
    );
}


4.components/ProjectDetails
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
    title: string;
    status: string;
    description: string;
    timeline: string;
    updates: Update[];
    image: string;
}

interface ProjectDetailsProps {
    project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6">
            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
              {project.status}
            </span>
                        <h2 className="text-2xl font-bold text-white mt-2">{project.title}</h2>
                    </div>
                </div>
            </div>

            <div className="p-6">
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
        </div>
    );
}
