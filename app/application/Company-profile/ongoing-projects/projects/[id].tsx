"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ProjectDetails() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const projectId = searchParams.get("id");

    // Mock fetch function to get project data (Replace with actual API call)
    const project = projectsData.find((p) => p.id === Number(projectId));

    if (!project) {
        return <div>Project not found</div>;
    }

    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description);

    const handleSave = () => {
        alert(`Saving project: ${title}`);
        // You would typically update the project via an API call here
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <button onClick={() => router.push("/")} className="text-blue-500">← Back</button>
            <h1 className="text-3xl font-bold mt-4">{title}</h1>
            <textarea
                className="w-full border p-2 mt-4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleSave} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Save</button>
        </div>
    );
}

// Mock project data (Replace with API call)
const projectsData = [
    { id: 1, title: "City Center Mall", description: "A modern shopping mall project." },
    { id: 2, title: "Riverside Apartments", description: "Luxury apartment complex." }
];
