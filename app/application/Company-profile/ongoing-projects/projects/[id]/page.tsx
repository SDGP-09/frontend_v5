"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const mockProjects = [
    {
        id: 1,
        title: "City Center Mall",
        description: "A modern shopping mall with over 200 retail spaces...",
        status: "In Progress",
        duration: "8 months",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5",
        visible: true,
        private: false,
    },
    // Add other projects here...
];

export default function ProjectDetails() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const projectId = searchParams.get("id");

    const [project, setProject] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProject, setEditedProject] = useState<any>(null);
    const [isAdmin, setIsAdmin] = useState(true); // Assume admin access

    useEffect(() => {
        if (projectId) {
            const foundProject = mockProjects.find((p) => p.id === Number(projectId));
            setProject(foundProject);
            setEditedProject({ ...foundProject });
        }
    }, [projectId]);

    if (!project) {
        return <p>Loading project details...</p>;
    }

    const handleSave = () => {
        alert("Project updated successfully!");
        setProject(editedProject);
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <button onClick={() => router.back()} className="text-blue-500">
                    ← Back
                </button>

                <img src={project.image} alt={project.title} className="w-full h-64 object-cover rounded-md my-4" />

                {!isEditing ? (
                    <>
                        <h1 className="text-3xl font-bold">{project.title}</h1>
                        <p className="text-gray-600">{project.description}</p>
                        <p className="mt-2"><strong>Status:</strong> {project.status}</p>
                        <p><strong>Duration:</strong> {project.duration}</p>

                        {isAdmin && (
                            <button onClick={() => setIsEditing(true)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md">
                                Edit Project
                            </button>
                        )}
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            className="w-full border p-2 rounded my-2"
                            value={editedProject.title}
                            onChange={(e) => setEditedProject({ ...editedProject, title: e.target.value })}
                        />
                        <textarea
                            className="w-full border p-2 rounded my-2"
                            value={editedProject.description}
                            onChange={(e) => setEditedProject({ ...editedProject, description: e.target.value })}
                        />
                        <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded-md">
                            Save Changes
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
