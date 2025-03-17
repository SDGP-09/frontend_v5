//
// "use client";
// import React, { useState } from "react";
// import ProjectList from "./components/ProjectList";
// import SearchBar from "./components/Searchbar";
// // Correct the type import to use the right file name
// import { completeprojects } from "@/app/types/completeprojects";
//
// const projectsData: completeprojects[] = [
//     {
//         id: "1",
//         title: "Urban Renewal District",
//         description:
//             "Revitalization of downtown area with mixed-use developments, pedestrian-friendly streets, and green spaces, completed under budget.",
//         status: "Completed",
//         imageUrl:
//             "https://images.unsplash.com/photo-1486325212027-8081e485255e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
//         duration: "18 months",
//         completedDate: "March 15, 2024",
//     },
//     {
//         id: "2",
//         title: "Riverside Park Renovation",
//         description:
//             "Complete overhaul of the riverside park including new recreational facilities, landscaping, and flood protection measures.",
//         status: "Completed",
//         imageUrl:
//             "https://images.unsplash.com/photo-1584967918940-a7d51b064268?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
//         duration: "12 months",
//         completedDate: "January 10, 2024",
//     },
//     {
//         id: "3",
//         title: "Sustainable Housing Complex",
//         description:
//             "Award-winning eco-friendly residential complex featuring solar power, rainwater harvesting, and energy-efficient design.",
//         status: "Completed",
//         imageUrl:
//             "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1473&q=80",
//         duration: "24 months",
//         completedDate: "November 5, 2023",
//     },
//     {
//         id: "4",
//         title: "Community Healthcare Center",
//         description:
//             "Modern healthcare facility serving underrepresented communities with state-of-the-art medical equipment and telehealth capabilities.",
//         status: "Completed",
//         imageUrl:
//             "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1453&q=80",
//         duration: "14 months",
//         completedDate: "October 20, 2023",
//     },
//     {
//         id: "5",
//         title: "Historic Theater Restoration",
//         description:
//             "Careful restoration of a 1920s theater, preserving historical elements while upgrading technical systems and accessibility.",
//         status: "Completed",
//         imageUrl:
//             "https://images.unsplash.com/photo-1503095396549-807759245b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80",
//         duration: "30 months",
//         completedDate: "August 3, 2023",
//     },
//     {
//         id: "6",
//         title: "Smart City Infrastructure",
//         description:
//             "Implementation of IoT sensors, smart traffic management, and digital public services across the metropolitan area.",
//         status: "Completed",
//         imageUrl:
//             "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80",
//         duration: "36 months",
//         completedDate: "June 15, 2023",
//     },
// ];
//
// export default function Page() {
//     const [projects] = useState<completeprojects[]>(projectsData);
//     const [searchQuery, setSearchQuery] = useState("");
//
//     // Filter projects based on the search query
//     const filteredProjects = projects.filter((project) => {
//         const matchesSearch =
//             project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             project.description.toLowerCase().includes(searchQuery.toLowerCase());
//         return matchesSearch;
//     });
//
//     return (
//         <div className="min-h-screen bg-gray-50">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 <div className="flex justify-between items-center mb-8">
//                     <h1 className="text-2xl font-bold text-gray-900">
//                         Completed Projects
//                     </h1>
//                 </div>
//
//                 <div className="flex flex-col md:flex-row gap-4 mb-6">
//                     <div className="md:w-full">
//                         <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
//                     </div>
//                 </div>
//
//                 <ProjectList projects={filteredProjects} />
//             </div>
//         </div>
//     );
// }
"use client";
import React, { useState } from "react";
import ProjectList from "./components/ProjectList";
import SearchBar from "./components/Searchbar";
import { completeprojects } from "@/app/types/completeprojects";

const projectsData: completeprojects[] = [
    {
        id: "1",
        title: "Urban Renewal District",
        description:
            "Revitalization of downtown area with mixed-use developments, pedestrian-friendly streets, and green spaces, completed under budget.",
        status: "Completed",
        imageUrl:
            "https://images.unsplash.com/photo-1486325212027-8081e485255e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        duration: "18 months",
        completedDate: "March 15, 2024",
        visibility: "Visible",
    },
    {
        id: "2",
        title: "Riverside Park Renovation",
        description:
            "Complete overhaul of the riverside park including new recreational facilities, landscaping, and flood protection measures.",
        status: "Completed",
        imageUrl:
            "https://images.unsplash.com/photo-1584967918940-a7d51b064268?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        duration: "12 months",
        completedDate: "January 10, 2024",
        visibility: "Visible",
    },
    {
        id: "3",
        title: "Sustainable Housing Complex",
        description:
            "Award-winning eco-friendly residential complex featuring solar power, rainwater harvesting, and energy-efficient design.",
        status: "Completed",
        imageUrl:
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1473&q=80",
        duration: "24 months",
        completedDate: "November 5, 2023",
        visibility: "Visible",
    },
    {
        id: "4",
        title: "Community Healthcare Center",
        description:
            "Modern healthcare facility serving underrepresented communities with state-of-the-art medical equipment and telehealth capabilities.",
        status: "Completed",
        imageUrl:
            "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1453&q=80",
        duration: "14 months",
        completedDate: "October 20, 2023",
        visibility: "Visible",
    },
    {
        id: "5",
        title: "Historic Theater Restoration",
        description:
            "Careful restoration of a 1920s theater, preserving historical elements while upgrading technical systems and accessibility.",
        status: "Completed",
        imageUrl:
            "https://images.unsplash.com/photo-1503095396549-807759245b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80",
        duration: "30 months",
        completedDate: "August 3, 2023",
        visibility: "Visible",
    },
    {
        id: "6",
        title: "Smart City Infrastructure",
        description:
            "Implementation of IoT sensors, smart traffic management, and digital public services across the metropolitan area.",
        status: "Completed",
        imageUrl:
            "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80",
        duration: "36 months",
        completedDate: "June 15, 2023",
        visibility: "Visible",
    },
];

export default function Page() {
    const [projects] = useState<completeprojects[]>(projectsData);
    const [searchQuery, setSearchQuery] = useState("");

    // Filter projects based on the search query
    const filteredProjects = projects.filter((project) => {
        const matchesSearch =
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Completed Projects</h1>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="md:w-full">
                        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    </div>
                </div>

                <ProjectList projects={filteredProjects} />
            </div>
        </div>
    );
}
