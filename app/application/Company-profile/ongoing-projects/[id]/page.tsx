"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ProjectDetails from "../components/ProjectDetails";

// Define a type for the project details
interface ProjectDetail {
    id: number;
    title: string;
    description: string;
    status: string;
    timeline: string;
    updates: { date: string; text: string }[];
    image: string;
}

// Dummy data for projects with the type ProjectDetail[]
const dummyProjects: ProjectDetail[] = [
    {
        id: 1,
        title: "City Center Mall",
        description: "A modern shopping mall with over 200 retail spaces...",
        status: "In Progress",
        timeline: "Expected completion: June 2026",
        updates: [
            { date: "2 days ago", text: "Foundation work completed on east wing" },
            { date: "1 week ago", text: "Structural steel installation began" },
            { date: "2 weeks ago", text: "Site preparation completed" },
        ],
        image:
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
        id: 2,
        title: "Riverside Apartments",
        description:
            "Luxury apartment complex with 120 units featuring riverside views, modern amenities, and sustainable design elements.",
        status: "In Progress",
        timeline: "Expected completion: March 2026",
        updates: [
            { date: "3 days ago", text: "Interior framing started on floors 1-3" },
            { date: "2 weeks ago", text: "Concrete pouring for floors 4-6 completed" },
        ],
        image:
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    // Add more dummy projects as needed...
];

export default function ProjectViewPage() {
    const { id } = useParams();
    const projectId = Number(id);

    // Now projectData is typed as ProjectDetail or null
    const [projectData, setProjectData] = useState<ProjectDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Simulate fetching project data using a network delay
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            const foundProject = dummyProjects.find((p) => p.id === projectId);
            setProjectData(foundProject || null);
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [projectId]);

    if (isLoading) return <div>Loading...</div>;
    if (!projectData)
        return <div className="min-h-screen p-6">No project found for id: {id}</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* View-only Project Details */}
            <ProjectDetails project={projectData} />
        </div>
    );
}
