"use client";
import React, { useState } from "react";
import ProjectList from "./components/ProjectList";
import ProjectDetails from "./components/ProjectDetails";

const allProjects = [
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
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
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
            {
                date: "2 weeks ago",
                text: "Concrete pouring for floors 4-6 completed",
            },
        ],
        image:
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
        id: 3,
        name: "Tech Park Office Complex",
        status: "Planning",
        description:
            "State-of-the-art office complex designed for tech companies with collaborative spaces, green areas, and smart building technology.",
        timeline: "Expected completion: October 2027",
        updates: [
            { date: "1 week ago", text: "Final architectural plans approved" },
            {
                date: "3 weeks ago",
                text: "Environmental impact assessment completed",
            },
        ],
        image:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
        id: 4,
        name: "Harbor View Hotel",
        status: "In Progress",
        description:
            "Luxury waterfront hotel with 250 rooms, conference facilities, spa, and multiple restaurants overlooking the harbor.",
        timeline: "Expected completion: December 2025",
        updates: [
            {
                date: "1 day ago",
                text: "Interior finishing work began on floors 10-15",
            },
            { date: "1 week ago", text: "Exterior cladding completed" },
            { date: "3 weeks ago", text: "Roofing installation finished" },
        ],
        image:
            "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
        id: 5,
        name: "Central Park Residences",
        status: "In Progress",
        description:
            "Premium residential development with 85 luxury condominiums adjacent to the city park, featuring high-end finishes and amenities.",
        timeline: "Expected completion: August 2026",
        updates: [
            {
                date: "4 days ago",
                text: "Electrical wiring completed for floors 1-5",
            },
            { date: "2 weeks ago", text: "Plumbing installation in progress" },
        ],
        image:
            "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
        id: 6,
        name: "Metro Transit Hub",
        status: "In Progress",
        description:
            "Multi-modal transportation center connecting subway, bus, and light rail systems with retail spaces and public plazas.",
        timeline: "Expected completion: November 2026",
        updates: [
            { date: "5 days ago", text: "Underground tunnel excavation completed" },
            { date: "1 week ago", text: "Main terminal foundation poured" },
            { date: "3 weeks ago", text: "Utility relocation finished" },
        ],
        image:
            "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
        id: 7,
        name: "Waterfront Promenade",
        status: "In Progress",
        description:
            "Public waterfront development featuring pedestrian walkways, cycling paths, recreational areas, and commercial spaces along 2.5 miles of shoreline.",
        timeline: "Expected completion: July 2026",
        updates: [
            {
                date: "3 days ago",
                text: "Boardwalk installation reached mile marker 1.5",
            },
            { date: "1 week ago", text: "Landscaping of central plaza completed" },
            {
                date: "2 weeks ago",
                text: "Marine habitat restoration phase 1 finished",
            },
        ],
        image:
            "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
];

export default function Page() {
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

    const projects = allProjects.filter((project) => project.status === "In Progress");

    const handleSelectProject = (id: number) => {
        setSelectedProjectId(id);
        document.getElementById("project-details")?.scrollIntoView({ behavior: "smooth" });
    };

    const selectedProject = allProjects.find((project) => project.id === selectedProjectId) || projects[0];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="flex-grow py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-6">Ongoing Projects</h2>

                    <ProjectList
                        projects={projects}
                        selectedProjectId={selectedProjectId}
                        onSelectProject={handleSelectProject}
                    />
                    <div id="project-details">
                        <ProjectDetails project={selectedProject} />
                    </div>
                </div>
            </main>
        </div>
    );
}
