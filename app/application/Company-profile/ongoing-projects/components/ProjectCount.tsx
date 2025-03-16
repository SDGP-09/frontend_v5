// "use client";
//
// import React from "react";
//
// interface ProjectCountProps {
//     filteredCount: number;
//     totalCount: number;
//     isAdmin: boolean;
//     visibleCount: number;
//     hiddenCount: number;
// }
//
// export default function ProjectCount({
//                                          filteredCount,
//                                          totalCount,
//                                          isAdmin,
//                                          visibleCount,
//                                          hiddenCount,
//                                      }: ProjectCountProps) {
//     return (
//         <div className="mb-4 text-sm text-gray-600 flex justify-between items-center">
//             <div>
//                 Showing {filteredCount} of {totalCount} projects
//             </div>
//             {isAdmin && (
//                 <div className="text-sm text-gray-600">
//           <span className="mr-4">
//             <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>{" "}
//               Visible: {visibleCount}
//           </span>
//                     <span>
//             <span className="inline-block w-3 h-3 bg-gray-400 rounded-full mr-1"></span>{" "}
//                         Hidden: {hiddenCount}
//           </span>
//                 </div>
//             )}
//         </div>
//     );
// }
// "use client";
// import React from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
//
// interface ProjectCardProps {
//     project: {
//         id: number;
//         title: string;
//         description: string;
//         status: string;
//         duration: string;
//         imageUrl: string;
//     };
// }
//
// export default function ProjectCard({ project }: ProjectCardProps) {
//     const router = useRouter();
//
//     return (
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="relative h-48">
//                 <Image
//                     src={project.imageUrl}
//                     alt={project.title}
//                     width={196}
//                     height={196}
//                     className="rounded object-cover"
//                     priority
//                 />
//             </div>
//             <div className="p-5">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                     {project.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                     {project.description}
//                 </p>
//                 <button
//                     className="w-full py-2 bg-emerald-50 text-emerald-700 rounded-md text-sm font-medium hover:bg-emerald-100 transition-colors"
//                     onClick={() => router.push(`/application/Company-profile/ongoing-projects/${project.id}`)}
//                 >
//                     View Details
//                 </button>
//             </div>
//         </div>
//     );
// }
// File: app/Company-profile/ongoing-projects/components/ProjectCount.tsx
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
