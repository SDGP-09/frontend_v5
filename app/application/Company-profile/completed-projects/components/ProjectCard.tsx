// "use client";
// import React from "react";
// import Image from "next/image";
// import { Projects } from "@/app/types/projects";
//
// interface ProjectCardProps {
//     project: Projects;
// }
//
// export default function ProjectCard({ project }: ProjectCardProps) {
//     return (
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             {/* Project Image */}
//             <div className="relative h-48">
//                 <img
//                     src={project.imageUrl}
//                     alt={project.title}
//                     className="w-full h-full object-cover"
//                 />
//                 {/* Status Badge */}
//                 <div className="absolute top-4 right-4">
//           <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
//             {project.status}
//           </span>
//                 </div>
//                 {/* Hidden Badge */}
//                 {project.visibility === "Hidden" && (
//                     <div className="absolute bottom-4 left-0 right-0 mx-auto w-max">
//             <span className="bg-white text-gray-700 px-3 py-1 rounded-full text-xs font-medium shadow-md">
//               Hidden Project
//             </span>
//                     </div>
//                 )}
//             </div>
//
//             {/* Project Info */}
//             <div className="p-5">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.title}</h3>
//                 <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
//                 {/* Completion Date */}
//                 <div className="mb-4">
//                     <div className="text-sm font-medium text-gray-700 mb-1">Completed</div>
//                     <div className="text-sm text-gray-600">{project.completedDate}</div>
//                 </div>
//                 {/* Project Stats */}
//                 <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
//                     <div className="flex items-center">
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="16"
//                             height="16"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             className="mr-1"
//                         >
//                             <circle cx="12" cy="12" r="10"></circle>
//                             <polyline points="12 6 12 12 16 14"></polyline>
//                         </svg>
//                         <span>{project.duration}</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
"use client";
import React from "react";
import Image from "next/image";
import { Projects } from "@/app/types/projects";

interface ProjectCardProps {
    project: Projects;
    isAdmin?: boolean;
    onToggleVisibility?: (id: string) => void;
    onTogglePrivacy?: () => void;
    onViewDetails?: () => void;
}

export default function ProjectCard({
                                        project,
                                        isAdmin,
                                        onToggleVisibility,
                                        onTogglePrivacy,
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
                        title={project.visibility === "Visible" ? "Hide Project" : "Show Project"}
                    >
                        {project.visibility === "Visible" ? "Hide" : "Show"}
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
