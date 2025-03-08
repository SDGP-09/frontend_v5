// "use client";
// import React from "react";
// import ProjectCard from "./ProjectCard";
// import Image from 'next/image';
//
// /**
//  * OngoingProjectsSection Component
//  *
//  * Displays the list of ongoing projects along with a header and an option to add a new project.
//  */
// export default function OngoingProjectsSection() {
//     return (
//         <div className="bg-white rounded-xl shadow-sm p-6">
//             <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-semibold">Ongoing Projects</h2>
//                 <a href="#" className="text-blue-500 text-sm">View All</a>
//             </div>
//             <div className="space-y-4">
//                 <ProjectCard
//                     title="City Center Mall"
//                     status="ongoing"
//                     image="https://res.cloudinary.com/ddcbr53w0/image/upload/v1740426980/indoor-hotel-view_1417-1566_siila7.avif"
//                 />
//                 <ProjectCard
//                     title="Riverside Apartments"
//                     status="ongoing"
//                     image="https://res.cloudinary.com/ddcbr53w0/image/upload/v1740427131/old-buildings-port-evening_1268-14340_j234y6.avif"
//                 />
//             </div>
//         </div>
//     );
// }
"use client";
import React from "react";
import ProjectCard from "./ProjectCard";
import Link from "next/link";

/**
 * OngoingProjectsSection Component
 *
 * Displays the list of ongoing projects along with a header and an option to add a new project.
 */
export default function OngoingProjectsSection() {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Ongoing Projects</h2>
                <Link href="/application/Company-profile/ongoing-projects" className="text-blue-500 text-sm">
                    View All
                </Link>
            </div>
            <div className="space-y-4">
                <ProjectCard
                    title="City Center Mall"
                    status="ongoing"
                    image="https://res.cloudinary.com/ddcbr53w0/image/upload/v1740426980/indoor-hotel-view_1417-1566_siila7.avif"
                />
                <ProjectCard
                    title="Riverside Apartments"
                    status="ongoing"
                    image="https://res.cloudinary.com/ddcbr53w0/image/upload/v1740427131/old-buildings-port-evening_1268-14340_j234y6.avif"
                />

            </div>
        </div>
    );
}
