"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Define the Project type
type Project = {
    id: number;
    title: string;
    description: string;
    status: string;
    duration: string;
};

// Simulated project data
const projectsData: Project[] = [
    { id: 1, title: "City Center Mall", description: "A modern shopping mall...", status: "In Progress", duration: "8 months" },
    { id: 2, title: "Riverside Apartments", description: "Luxury apartment complex...", status: "In Progress", duration: "14 months" }
];

// Explicitly defining the expected page props
// interface PageProps {
//     params: { id: string };
// }
interface PageProps {
    params: Promise<{ id: string }>;
}

// export default function EditProject({ params }: PageProps) {
//     const router = useRouter();
//     const projectId = Number(params.id);
//
//     const [project, setProject] = useState<Project | null>(null);
//     const [editedProject, setEditedProject] = useState<Project | null>(null);
//
//     useEffect(() => {
//         const foundProject = projectsData.find((p) => p.id === projectId);
//
//         if (foundProject) {
//             setProject(foundProject);
//             setEditedProject({ ...foundProject });
//         }
//     }, [projectId]);
//
//     if (!project || !editedProject) {
//         return <p className="text-center mt-10">Project not found</p>;
//     }
//
//     const handleSave = () => {
//         setProject(editedProject);
//         alert("Project updated!");
//         router.push(`/application/Company-profile/ongoing-projects/projects/${projectId}`);
//     };
//
//     return (
//         <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
//             <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
//
//             <div className="space-y-4">
//                 <input
//                     type="text"
//                     value={editedProject.title}
//                     onChange={(e) => setEditedProject({ ...editedProject, title: e.target.value })}
//                     className="w-full border p-2 rounded-md"
//                 />
//                 <textarea
//                     value={editedProject.description}
//                     onChange={(e) => setEditedProject({ ...editedProject, description: e.target.value })}
//                     className="w-full border p-2 rounded-md"
//                 />
//                 <select
//                     value={editedProject.status}
//                     onChange={(e) => setEditedProject({ ...editedProject, status: e.target.value })}
//                     className="w-full border p-2 rounded-md"
//                 >
//                     <option value="In Progress">In Progress</option>
//                     <option value="Completed">Completed</option>
//                     <option value="Pending">Pending</option>
//                 </select>
//
//                 <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-md">
//                     Save
//                 </button>
//
//                 <button
//                     onClick={() => router.push(`/application/Company-profile/ongoing-projects/projects/${projectId}`)}
//                     className="ml-4 text-gray-500 underline"
//                 >
//                     Cancel
//                 </button>
//             </div>
//         </div>
//     );
// }
export default function EditProject({ params }: { params: { id: string } }) {
    const router = useRouter();
    const projectId = Number(params?.id ?? "0"); // Ensure it doesn't break if `id` is undefined

    const [project, setProject] = useState<Project | null>(null);
    const [editedProject, setEditedProject] = useState<Project | null>(null);

    useEffect(() => {
        if (!projectId) return;

        const foundProject = projectsData.find((p) => p.id === projectId);
        if (foundProject) {
            setProject(foundProject);
            setEditedProject({ ...foundProject });
        }
    }, [projectId]);

    if (!project || !editedProject) {
        return <p className="text-center mt-10">Project not found</p>;
    }

    const handleSave = () => {
        setProject(editedProject);
        alert("Project updated!");
        router.push(`/application/Company-profile/ongoing-projects/projects/${projectId}`);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
            <div className="space-y-4">
                <input
                    type="text"
                    value={editedProject.title}
                    onChange={(e) => setEditedProject({ ...editedProject, title: e.target.value })}
                    className="w-full border p-2 rounded-md"
                />
                <textarea
                    value={editedProject.description}
                    onChange={(e) => setEditedProject({ ...editedProject, description: e.target.value })}
                    className="w-full border p-2 rounded-md"
                />
                <select
                    value={editedProject.status}
                    onChange={(e) => setEditedProject({ ...editedProject, status: e.target.value })}
                    className="w-full border p-2 rounded-md"
                >
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                </select>
                <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-md">
                    Save
                </button>
                <button
                    onClick={() => router.push(`/application/Company-profile/ongoing-projects/projects/${projectId}`)}
                    className="ml-4 text-gray-500 underline"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

//
// import { useParams, useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
//
// const projectsData = [
//     { id: 1, title: "City Center Mall", description: "A modern shopping mall...", status: "In Progress", duration: "8 months" },
//     { id: 2, title: "Riverside Apartments", description: "Luxury apartment complex...", status: "In Progress", duration: "14 months" }
// ];
//
// export default function EditProject() {
//     const router = useRouter();
//     const params = useParams();
//     const projectId = Number(params?.id);
//
//     const [project, setProject] = useState<any>(null);
//     const [editedProject, setEditedProject] = useState<any>(null);
//
//     useEffect(() => {
//         console.log("Project ID:", projectId); // ✅ Debugging Log
//         const foundProject = projectsData.find(p => p.id === projectId);
//         if (foundProject) {
//             setProject(foundProject);
//             setEditedProject({ ...foundProject });
//         }
//     }, [projectId]);
//
//     if (!project) return <p className="text-center mt-10">Project not found</p>;
//
//     return (
//         <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
//             <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
//
//             <div className="space-y-4">
//                 <input
//                     type="text"
//                     value={editedProject?.title || ""}
//                     onChange={(e) => setEditedProject({ ...editedProject, title: e.target.value })}
//                     className="w-full border p-2 rounded-md"
//                 />
//                 <textarea
//                     value={editedProject?.description || ""}
//                     onChange={(e) => setEditedProject({ ...editedProject, description: e.target.value })}
//                     className="w-full border p-2 rounded-md"
//                 />
//                 <select
//                     value={editedProject?.status || "In Progress"}
//                     onChange={(e) => setEditedProject({ ...editedProject, status: e.target.value })}
//                     className="w-full border p-2 rounded-md"
//                 >
//                     <option value="In Progress">In Progress</option>
//                     <option value="Completed">Completed</option>
//                     <option value="Pending">Pending</option>
//                 </select>
//
//                 <button onClick={() => alert("Project updated!")} className="bg-green-500 text-white px-4 py-2 rounded-md">
//                     Save
//                 </button>
//
//                 <button
//                     onClick={() => router.push(`/application/projects/${projectId}`)}
//                     className="ml-4 text-gray-500 underline"
//                 >
//                     Cancel
//                 </button>
//             </div>
//         </div>
//     );
// }
