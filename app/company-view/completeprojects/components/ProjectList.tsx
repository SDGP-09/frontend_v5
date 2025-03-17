import React from "react";
import { Projects } from "../../../types/projects";



interface ProjectListProps {
    projects: Projects[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <div
                    key={project.id}
                    className="bg-white rounded-lg shadow overflow-hidden"
                >
                    {/* Project Image */}
                    <div className="relative h-48">
                        <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />

                        {/* Status Badge */}
                        <div className="absolute top-4 right-4">
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                {project.status}
              </span>
                        </div>

                        {/*
              ============================================
              REMOVED the More Options Button (the 3 dots)
              ============================================
              Original code:

              <button className="absolute top-4 left-4 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100">
                <MoreVertical className="h-4 w-4 text-gray-700" />
              </button>
            */}
                    </div>

                    {/* Project Info */}
                    <div className="p-5">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {project.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {project.description}
                        </p>

                        {/* Completion Date */}
                        <div className="mb-4">
                            <div className="text-sm font-medium text-gray-700 mb-1">
                                Completed
                            </div>
                            <div className="text-sm text-gray-600">
                                {project.completedDate}
                            </div>
                        </div>

                        {/* Project Stats */}
                        <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
                            {/*

                            <div />
                            {/* Duration Icon & Text */}
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
            ))}
        </div>
    );
};

export default ProjectList;
