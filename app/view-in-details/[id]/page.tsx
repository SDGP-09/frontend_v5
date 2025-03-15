"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BackButton from "../components/BackButton";
import ProjectImageGrid from "../components/ProjectImageGrid";
import ProjectOverview from "../components/ProjectOverview";
import ProjectTimeline, { TimelineItem } from "../components/ProjectTimeline";
import ProjectUpdates, { Update } from "../components/ProjectUpdates";

interface Project {
    id: string;
    name: string;
    description: string;
    startDate: string;
    estimatedCompletion: string;
    images: string[];
    timeline: TimelineItem[];
    updates: Update[];
}

const dummyProjects: Project[] = [
    {
        id: "1",
        name: "Riverside Office Complex",
        description:
            "A modern 5-story office building with sustainable design features...",
        startDate: "March 15, 2024",
        estimatedCompletion: "September 30, 2025",
        images: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2072&q=80",
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2070&q=80",
        ],
        timeline: [
            {
                date: "March 15, 2024",
                title: "Project Kickoff",
                description: "Initial planning and site preparation begins",
                status: "completed",
            },

        ],
        updates: [
            {
                date: "August 2, 2024",
                title: "Steel Framework 75% Complete",
                description:
                    "The structural steel framework is now 75% complete...",
                author: "Michael Chen, Project Manager",
            },

        ],
    },
    {
        id: "2",
        name: "City Center Mall",
        description:
            "A bustling 3-story commercial complex located in the heart of downtown.",
        startDate: "May 1, 2024",
        estimatedCompletion: "December 15, 2025",
        images: [
            "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80",
        ],
        timeline: [],
        updates: [],
    },
];

async function fetchProjectById(id: string): Promise<Project | null> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const foundProject = dummyProjects.find((proj) => proj.id === id) || null;
            resolve(foundProject);
        }, 1000);
    });
}

export default function ProjectDetailsPage() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        if (!id) return;
        fetchProjectById(id).then((data) => {
            setProject(data);
        });
    }, [id]);

    if (!project) {
        return <div className="text-center py-10">Loading project details...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <BackButton />
            <ProjectImageGrid images={project.images} name={project.name} />
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <ProjectOverview
                    description={project.description}
                    startDate={project.startDate}
                    estimatedCompletion={project.estimatedCompletion}
                />
                <ProjectTimeline timeline={project.timeline} />
                <ProjectUpdates updates={project.updates} />
            </div>
        </div>
    );
}
