// "use client";
// import React from "react";
// import { Edit2, Trash2 } from "lucide-react";
//
//
// /**
//  * ProjectCardProps
//  *
//  * @param title - The project title.
//  * @param status - The status of the project.
//  * @param image - URL for the project's image.
//  */
// interface ProjectCardProps {
//     title: string;
//     status: string;
//     image: string;
// }
//
// /**
//  * ProjectCard Component
//  *
//  * Displays an ongoing project with its image, title, and status.
//  * Also provides action buttons for editing and deleting the project.
//  */
// export default function ProjectCard({ title, status, image }: ProjectCardProps) {
//     return (
//         <div className="flex items-center gap-4 p-4 border rounded-lg">
//             <img src={image} alt={title} className="w-24 h-24 rounded object-cover" />
//             <div className="flex-1">
//                 <div className="flex justify-between items-start">
//                     <div>
//                         <h3 className="font-medium">{title}</h3>
//                         <span className="text-sm text-gray-500 capitalize">{status}</span>
//                     </div>
//                     <div className="flex gap-2">
//                         <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
//                             <Edit2 className="w-4 h-4" />
//                         </button>
//                         <button className="p-2 text-red-600 hover:bg-red-50 rounded">
//                             <Trash2 className="w-4 h-4" />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
"use client";
import React from "react";
import Image from "next/image";
import { Edit2, Trash2 } from "lucide-react";

/**
 * ProjectCardProps
 *
 * @param title - The project title.
 * @param status - The status of the project.
 * @param image - URL for the project's image.
 */
interface ProjectCardProps {
    title: string;
    status: string;
    image: string;
}

/**
 * ProjectCard Component
 *
 * Displays an ongoing project with its image, title, and status.
 * Also provides action buttons for editing and deleting the project.
 */
export default function ProjectCard({ title, status, image }: ProjectCardProps) {
    return (
        <div className="flex items-center gap-4 p-4 border rounded-lg">
            <Image
                src={image}
                alt={title}
                width={96}  // Equivalent to w-24 (24 * 4px = 96px)
                height={96} // Equivalent to h-24
                className="rounded object-cover"
                priority // Improves LCP (optional, use if it's critical for initial loading)
            />
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-medium">{title}</h3>
                        <span className="text-sm text-gray-500 capitalize">{status}</span>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
