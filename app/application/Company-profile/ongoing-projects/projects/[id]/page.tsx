
// "use client";
//
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
//
// const projectsData = [
//     { id: 1, title: "City Center Mall", description: "A modern shopping mall...", status: "In Progress", duration: "8 months" },
//     { id: 2, title: "Riverside Apartments", description: "Luxury apartment complex...", status: "In Progress", duration: "14 months" }
// ];
//
// export default function ProjectDetails({ params }: { params: { id: string } }) {
//     const router = useRouter();
//     const projectId = Number(params.id);
//     const [project, setProject] = useState<any>(null);
//
//     useEffect(() => {
//         const foundProject = projectsData.find(p => p.id === projectId);
//         if (foundProject) {
//             setProject(foundProject);
//         }
//     }, [projectId]);
//
//     if (!project) return <p className="text-center mt-10">Project not found</p>;
//
//     return (
//         <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
//             <h1 className="text-2xl font-bold mb-4">{project.title}</h1>
//             <p><strong>Description:</strong> {project.description}</p>
//             <p><strong>Status:</strong> {project.status}</p>
//             <p><strong>Duration:</strong> {project.duration}</p>
//
//             <button
//                 onClick={() => router.push(`/application/projects/${projectId}/edit`)}
//                 // onClick={() => router.push(`/Company-profile/ongoing-projects/application/projects/${projectId}/edit`)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
//             >
//                 Edit Project
//             </button>
//
//             <button
//                 // onClick={() => router.push("/Company-profile/ongoing-projects/application/projects")}
//                 onClick={() => router.push(`/application/projects/${project.id}/edit`)}
//                 className="mt-4 block text-gray-500 underline"
//             >
//                 Back to Projects
//             </button>
//         </div>
//     );
// }
// "use client";
//
// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
//
// const projectsData = [
//     { id: 1, title: "City Center Mall", description: "A modern shopping mall...", status: "In Progress", duration: "8 months" },
//     { id: 2, title: "Riverside Apartments", description: "Luxury apartment complex...", status: "In Progress", duration: "14 months" }
// ];
//
// export default function ProjectDetails() {
//     const router = useRouter();
//     const { id } = useParams();  // Use useParams() for App Router
//     const projectId = Number(id);
//     const [project, setProject] = useState<any>(null);
//
//     useEffect(() => {
//         const foundProject = projectsData.find(p => p.id === projectId);
//         if (foundProject) {
//             setProject(foundProject);
//         }
//     }, [projectId]);
//
//     if (!project) return <p className="text-center mt-10">Project not found</p>;
//
//     return (
//         <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
//             <h1 className="text-2xl font-bold mb-4">{project.title}</h1>
//             <p><strong>Description:</strong> {project.description}</p>
//             <p><strong>Status:</strong> {project.status}</p>
//             <p><strong>Duration:</strong> {project.duration}</p>
//
//             <button
//                 onClick={() => router.push(`/application/projects/${projectId}/edit`)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
//             >
//                 Edit Project
//             </button>
//
//             <button
//                 onClick={() => router.push("/application/projects")}
//                 className="mt-4 block text-gray-500 underline"
//             >
//                 Back to Projects
//             </button>
//         </div>
//     );
// }
"use client";





import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const projectsData = [
    { id: 1, title: "City Center Mall", description: "A modern shopping mall...", status: "In Progress", duration: "8 months" },
    { id: 2, title: "Riverside Apartments", description: "Luxury apartment complex...", status: "In Progress", duration: "14 months" }
];

export default function ProjectDetails() {
    const router = useRouter();
    const params = useParams();
    const projectId = Number(params?.id);  // Ensure ID is correctly parsed
    const [project, setProject] = useState<any>(null);
    console.log("Params:", params);
    console.log("Extracted ID:", Number(params?.id));




    useEffect(() => {
        console.log("Project ID:", projectId); // Debugging
        const foundProject = projectsData.find(p => p.id === projectId);
        setProject(foundProject || null);
    }, [projectId]);

    if (!project) return <p className="text-center mt-10">Project not found</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <h1 className="text-2xl font-bold mb-4">{project.title}</h1>
            <p><strong>Description:</strong> {project.description}</p>
            <p><strong>Status:</strong> {project.status}</p>
            <p><strong>Duration:</strong> {project.duration}</p>

            <button
                onClick={() => router.push(`/application/projects/${projectId}/edit`)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
            >
                Edit Project
            </button>

            <button
                onClick={() => router.push("/application/projects")}
                className="mt-4 block text-gray-500 underline"
            >
                Back to Projects
            </button>
        </div>

    );
}
