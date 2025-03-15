"use client";

import React, { useEffect, useState } from "react";
import BackButton from "./components/BackButton";
import ProjectImageGrid from "./components/ProjectImageGrid";
import ProjectOverview from "./components/ProjectOverview";
import ProjectTimeline, { TimelineItem } from "./components/ProjectTimeline";
import ProjectUpdates, { Update } from "./components/ProjectUpdates";

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

const sampleProject: Project = {
    id: "proj-123",
    name: "Riverside Office Complex",
    description:
        "A modern 5-story office building with sustainable design features, including solar panels, rainwater collection, and energy-efficient systems. The complex includes underground parking, a rooftop garden, and collaborative workspaces.",
    startDate: "March 15, 2024",
    estimatedCompletion: "September 30, 2025",
    images: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    ],
    timeline: [
        {
            date: "March 15, 2024",
            title: "Project Kickoff",
            description: "Initial planning and site preparation begins",
            status: "completed",
        },
        {
            date: "June 1, 2024",
            title: "Foundation Complete",
            description: "Concrete foundation and basement structures finished",
            status: "completed",
        },
        {
            date: "August 15, 2024",
            title: "Structural Framework",
            description: "Steel framework and core structure installation",
            status: "in-progress",
        },
        {
            date: "December 10, 2024",
            title: "Exterior Completion",
            description: "Building envelope, windows, and exterior finishes",
            status: "upcoming",
        },
        {
            date: "May 20, 2025",
            title: "Interior Finishing",
            description: "Interior walls, flooring, fixtures, and systems",
            status: "upcoming",
        },
        {
            date: "September 30, 2025",
            title: "Project Completion",
            description: "Final inspections and handover to client",
            status: "upcoming",
        },
    ],
    updates: [
        {
            date: "August 2, 2024",
            title: "Steel Framework 75% Complete",
            description:
                "The structural steel framework is now 75% complete, with the eastern and northern sections fully erected. The western section will begin next week.",
            author: "Michael Chen, Project Manager",
        },
        {
            date: "July 15, 2024",
            title: "Updated Electrical Plans Approved",
            description:
                "The revised electrical plans have been approved by the city inspector. This includes the additional charging stations in the parking area and the smart lighting system throughout the building.",
            author: "Sarah Johnson, Lead Engineer",
        },
        {
            date: "July 3, 2024",
            title: "Weather Delay Resolved",
            description:
                "After the unexpected heavy rains last week, we've successfully drained the site and resumed work. We've implemented additional drainage measures to prevent future delays.",
            author: "David Wilson, Site Supervisor",
        },
    ],
};


const fetchData = async (): Promise<Project | null> => {

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(sampleProject);
        }, 1000);
    });
};


const ProjectDetailsPage = () => {
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        fetchData().then(setProject);
    }, []);

    if (!project) {
        return <div className="text-center py-10">Loading project details...</div>;
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <BackButton />
            <ProjectImageGrid
                images={project.images}
                name={project.name}
            />
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
};

export default ProjectDetailsPage;
