//
// "use client";
// import React from "react";
// import Image from "next/image";
//
// interface ProjectCardProps {
//     title: string;
//     status: string;
//     image: string;
// }
//
// export default function ProjectCard({ title, status, image }: ProjectCardProps) {
//     return (
//         <div className="flex items-center gap-4 p-4 border rounded-lg">
//             {/* Fixed image size: 196px by 196px */}
//             <Image
//                 src={image}
//                 alt={title}
//                 width={196}
//                 height={196}
//                 className="rounded object-cover"
//                 priority
//             />
//             <div className="flex-1">
//                 <div className="flex justify-between items-start">
//                     <div>
//                         <h3 className="font-medium">{title}</h3>
//                         <span className="text-sm text-gray-500 capitalize">{status}</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
"use client";
import React from "react";
import Image from "next/image";

interface ProjectCardProps {
    title: string;
    status: string;
    image: string;
}

export default function ProjectCard({ title, status, image }: ProjectCardProps) {
    return (
        <div className="border rounded-lg overflow-hidden bg-white">
            {/* Image on top, using a 16:9 ratio (e.g., 640x360). Adjust as needed. */}
            <Image
                src={image}
                alt={title}
                width={640}
                height={360}
                className="w-full h-auto object-cover"
                priority
            />
            {/* Card content */}
            <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800">{title}</h3>
                <span className="text-sm text-gray-500 capitalize">{status}</span>
            </div>
        </div>
    );
}
