"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import ProjectDetails from "../components/ProjectDetails";

// Define an interface for a project
interface Project {
    id: number;
    name: string;
    status: string;
    description: string;
    timeline: string;
    updates: { date: string; text: string }[];
    image: string;
}

// Dummy data for projects
const allProjects: Project[] = [
    {
        id: 1,
        name: "City Center Mall",
        status: "In Progress",
        description: "A modern shopping mall with over 200 retail spaces...",
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
        name: "Riverside Apartments",
        status: "In Progress",
        description:
            "Luxury apartment complex with 120 units featuring riverside views, modern amenities, and sustainable design elements.",
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

export default function ProjectProfilePage() {
    const { id } = useParams();
    const projectId = Number(id);

    // Use the Project interface for state
    const [projectData, setProjectData] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const isInitialMount = useRef<boolean>(true);

    // Simulate fetching project data based on projectId
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            const project = allProjects.find((p) => p.id === projectId) || null;
            setProjectData(project);
            setIsLoading(false);
        }, 1000); // Simulated network delay
        return () => clearTimeout(timer);
    }, [projectId]);

    // Simulate saving updated data (if needed)
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            console.log("Saving updated project data for id:", projectId, projectData);
        }
    }, [projectData, projectId]);

    if (isLoading) return <div>Loading...</div>;
    if (!projectData) return <div>No project found for id: {id}</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* View-only Project Details */}
                <ProjectDetails project={projectData} />
            </div>
        </div>
    );
}
