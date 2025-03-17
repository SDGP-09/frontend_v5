// "use client";
// import React from "react";
// import Image from "next/image";
//
// interface Project {
//     id: string;
//     title: string;
//     description: string;
//     status: string;
//     imageUrl: string;
//     duration: string;
//     completedDate: string;
//     // Other fields as needed
// }
//
// interface CompletedProjectDetailsProps {
//     project: Project;
// }
//
// export default function CompletedProjectDetails({ project }: CompletedProjectDetailsProps) {
//     return (
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//             <div className="relative h-64">
//                 <Image
//                     src={project.imageUrl}
//                     alt={project.title}
//                     layout="fill"
//                     objectFit="cover"
//                 />
//             </div>
//             <div className="p-6">
//                 <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
//                 <p className="text-gray-600 mt-2">{project.description}</p>
//                 <div className="mt-4">
//                     <span className="text-sm font-medium text-gray-700">Completed in: </span>
//                     <span className="text-sm text-gray-600">{project.duration}</span>
//                 </div>
//                 <div className="mt-2">
//                     <span className="text-sm font-medium text-gray-700">Completion Date: </span>
//                     <span className="text-sm text-gray-600">{project.completedDate}</span>
//                 </div>
//             </div>
//         </div>
//     );
// }
// "use client";
// import React from "react";
// import Image from "next/image";
//
// interface Project {
//     id: string;
//     title: string;
//     description: string;
//     status: string;
//     imageUrl: string;
//     duration: string;
//     completedDate: string;
//     // Other fields as needed
// }
//
// interface CompletedProjectDetailsProps {
//     project: Project;
// }
//
// export default function CompletedProjectDetails({ project }: CompletedProjectDetailsProps) {
//     return (
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//             <div className="relative h-64">
//                 <Image
//                     src={project.imageUrl}
//                     alt={project.title}
//                     layout="fill"
//                     objectFit="cover"
//                 />
//             </div>
//             <div className="p-6">
//                 <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
//                 <p className="text-gray-600 mt-2">{project.description}</p>
//                 <div className="mt-4">
//                     <span className="text-sm font-medium text-gray-700">Completed in: </span>
//                     <span className="text-sm text-gray-600">{project.duration}</span>
//                 </div>
//                 <div className="mt-2">
//                     <span className="text-sm font-medium text-gray-700">Completion Date: </span>
//                     <span className="text-sm text-gray-600">{project.completedDate}</span>
//                 </div>
//             </div>
//         </div>
//     );
// }
"use client";
import React from "react";
import Image from "next/image";
import { completeprojects } from "@/app/types/completeprojects";

interface CompletedProjectDetailsProps {
    project: completeprojects;
}

export default function CompletedProjectDetails({ project }: CompletedProjectDetailsProps) {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative h-64">
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
                <p className="text-gray-600 mt-2">{project.description}</p>
                <div className="mt-4">
                    <span className="text-sm font-medium text-gray-700">Completed in: </span>
                    <span className="text-sm text-gray-600">{project.duration}</span>
                </div>
                <div className="mt-2">
                    <span className="text-sm font-medium text-gray-700">Completion Date: </span>
                    <span className="text-sm text-gray-600">{project.completedDate}</span>
                </div>
            </div>
        </div>
    );
}
