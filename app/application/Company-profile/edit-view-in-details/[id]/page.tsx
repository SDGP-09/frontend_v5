"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ManageProjectModal, { Project, TimelineItem } from "../components/manageProjectModal";

// Dummy data for demonstration
const sampleProjects: Project[] = [
    {
        id: "1",
        name: "Riverside Office Complex",
        description: "A modern 5-story office building with sustainable design features...",
        fullDescription: "Full description of Riverside Office Complex...",
        startDate: "2024-03-15",
        estimatedCompletion: "2025-09-30",
        images: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2072&q=80",
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2070&q=80",
        ],
        timeline: [
            {
                date: "2024-03-16",
                title: "Project Kickoff",
                description: "Initial planning and site preparation begins",
                status: "completed",
            },
            {
                date: "2024-04-01",
                title: "Foundation Completed",
                description: "Foundation work completed successfully",
                status: "completed",
            },
            {
                date: "2024-05-15",
                title: "Framing Started",
                description: "Structural framing of the building begins",
                status: "in-progress",
            },
        ],
    },
    // Add more sample projects if needed
];

export default function EditProjectPage() {
    const params = useParams();
    const router = useRouter();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        // For this demo, we simply filter dummy data.
        const foundProject = sampleProjects.find((p) => p.id === id) || null;
        setProject(foundProject);
    }, [id]);

    if (!project) {
        return <div className="text-center py-10">Loading project details...</div>;
    }

    // Handle update by logging changes and navigating back to read-only view.
    const handleUpdateProject = (updatedProject: Project) => {
        console.log("Updated project:", updatedProject);
        router.push(`/application/Company-profile/view-in-details/${updatedProject.id}`);
    };

    const handleClose = () => {
        router.push(`/application/Company-profile/view-in-details/${project.id}`);
    };

    return (
        <ManageProjectModal
            project={project}
            onClose={handleClose}
            onUpdateProject={handleUpdateProject}
        />
    );
}
