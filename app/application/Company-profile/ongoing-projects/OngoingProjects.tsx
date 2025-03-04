"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import ProjectFilterBar from "./components/ProjectFilterBar";
import ProjectCount from "./components/ProjectCount";
import ProjectCard from "./components/ProjectCard";
import ProjectPagination from "./components/ProjectPagination";

const projectsData = [
    {
        id: 1,
        title: "City Center Mall",
        description:
            "A modern shopping mall with over 200 retail spaces, food court, and entertainment facilities in the heart of downtown.",
        status: "In Progress",
        progress: 65,
        members: 24,
        duration: "8 months",
        image:
            "<https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80>",
        visible: true,
        private: false,
    },
    {
        id: 2,
        title: "Riverside Apartments",
        description:
            "Luxury apartment complex with 120 units featuring riverside views, modern amenities, and sustainable design.",
        status: "In Progress",
        progress: 42,
        members: 18,
        duration: "14 months",
        image:
            "<https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80>",
        visible: true,
        private: true,
    },
    {
        id: 3,
        title: "Tech Park Office Complex",
        description:
            "State-of-the-art office complex designed for tech companies with collaborative spaces, green areas, and smart building features.",
        status: "Planning",
        progress: 15,
        members: 12,
        duration: "24 months",
        image:
            "<https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80>",
        visible: true,
        private: false,
    },
    {
        id: 4,
        title: "Community Medical Center",
        description:
            "State-of-the-art medical facility with emergency services, specialized care units, and outpatient clinics.",
        status: "In Progress",
        progress: 38,
        members: 32,
        duration: "18 months",
        image:
            "<https://images.unsplash.com/photo-1586880244406-556ebe35f282?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80>",
        visible: true,
        private: false,
    },
    {
        id: 5,
        title: "Downtown Revitalization",
        description:
            "Urban renewal project focused on improving infrastructure, public spaces, and commercial opportunities in the city center.",
        status: "Completed",
        progress: 100,
        members: 15,
        duration: "12 months",
        image:
            "<https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2680&q=80>",
        visible: false,
        private: false,
    },
    {
        id: 6,
        title: "Beachfront Resort",
        description:
            "Luxury beachfront resort with private villas, spa facilities, and sustainable eco-friendly design.",
        status: "Planning",
        progress: 8,
        members: 20,
        duration: "30 months",
        image:
            "<https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80>",
        visible: true,
        private: true,
    },
    {
        id: 7,
        title: "Harbor Bridge Renovation",
        description:
            "Comprehensive renovation of the city's iconic harbor bridge, including structural reinforcement, lighting upgrades, and pedestrian walkways.",
        status: "In Progress",
        progress: 72,
        members: 45,
        duration: "36 months",
        image:
            "<https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80>",
        visible: true,
        private: false,
    },
    {
        id: 8,
        title: "Green Valley Residential",
        description:
            "Eco-friendly residential community with 85 single-family homes, community gardens, solar power integration, and rainwater harvesting systems.",
        status: "Planning",
        progress: 22,
        members: 16,
        duration: "20 months",
        image:
            "<https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80>",
        visible: false,
        private: false,
    },
    {
        id: 9,
        title: "Metro Line Extension",
        description:
            "Urban transit project extending the city's metro line with 5 new stations, connecting suburban areas to the downtown business district.",
        status: "In Progress",
        progress: 51,
        members: 78,
        duration: "48 months",
        image:
            "<https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80>",
        visible: true,
        private: false,
    },
    {
        id: 10,
        title: "University Research Center",
        description:
            "Advanced research facility for the state university featuring laboratories, collaborative spaces, and sustainable design elements.",
        status: "Completed",
        progress: 100,
        members: 22,
        duration: "16 months",
        image:
            "<https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80>",
        visible: true,
        private: false,
    },
    {
        id: 11,
        title: "Waterfront Convention Center",
        description:
            "State-of-the-art convention center with panoramic water views, flexible event spaces, and integrated smart building technology.",
        status: "In Progress",
        progress: 35,
        members: 40,
        duration: "22 months",
        image:
            "<https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80>",
        visible: true,
        private: true,
    },
    {
        id: 12,
        title: "Mountain View Hotel",
        description:
            "Luxury mountain resort with 150 rooms, spa facilities, conference center, and outdoor recreation areas integrated into the natural landscape.",
        status: "Planning",
        progress: 12,
        members: 25,
        duration: "26 months",
        image:
            "<https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80>",
        visible: false,
        private: true,
    },
    {
        id: 13,
        title: "Industrial Park Development",
        description:
            "Modern industrial complex with manufacturing facilities, warehouses, and office spaces designed for logistics and light manufacturing businesses.",
        status: "In Progress",
        progress: 58,
        members: 30,
        duration: "20 months",
        image:
            "<https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80>",
        visible: true,
        private: false,
    },
    {
        id: 14,
        title: "Solar Farm Installation",
        description:
            "Renewable energy project featuring a 50-acre solar panel installation capable of powering 5,000 homes with clean energy.",
        status: "Completed",
        progress: 100,
        members: 28,
        duration: "10 months",
        image:
            "<https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80>",
        visible: true,
        private: false,
    },
    {
        id: 15,
        title: "Historic Theater Restoration",
        description:
            "Careful restoration of a 1920s theater, preserving historical elements while updating infrastructure, seating, and technical capabilities.",
        status: "In Progress",
        progress: 82,
        members: 18,
        duration: "15 months",
        image:
            "<https://images.unsplash.com/photo-1503174971373-b1f69b1a3760?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2013&q=80>",
        visible: true,
        private: false,
    },
];

export default function OngoingProjects() {
    const [filter, setFilter] = useState("All Projects");
    const [searchTerm, setSearchTerm] = useState("");
    const [projects, setProjects] = useState(projectsData);
    const [isAdmin, setIsAdmin] = useState(true); // Toggle for admin view
    const [visibilityFilter, setVisibilityFilter] = useState("all"); // all, visible, hidden

    const toggleVisibility = (id: number) => {
        setProjects((prevProjects) =>
            prevProjects.map((project) =>
                project.id === id ? { ...project, visible: !project.visible } : project
            )
        );
    };

    const togglePrivacy = (id: number) => {
        setProjects((prevProjects) =>
            prevProjects.map((project) =>
                project.id === id ? { ...project, private: !project.private } : project
            )
        );
    };

    const filteredProjects = projects.filter((project) => {
        // Status filter
        if (filter !== "All Projects" && project.status !== filter) {
            return false;
        }
        // Visibility filter for non-admin users
        if (!isAdmin && !project.visible) {
            return false;
        }
        // Admin visibility filter
        if (isAdmin && visibilityFilter !== "all") {
            if (visibilityFilter === "visible" && !project.visible) return false;
            if (visibilityFilter === "hidden" && project.visible) return false;
        }
        // Search term filter
        if (
            searchTerm &&
            !project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !project.description.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            return false;
        }
        return true;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <h2 className="text-2xl font-bold text-gray-800 mr-3">
                            Ongoing Projects
                        </h2>
                        {isAdmin && (
                            <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                                Admin View
                            </div>
                        )}
                    </div>
                    {/*<button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md flex items-center">*/}
                    {/*    <Plus size={20} className="mr-1" />*/}
                    {/*    Add Project*/}
                    {/*</button>*/}
                </div>

                {/* Search and Filter */}
                <ProjectFilterBar
                    filter={filter}
                    setFilter={setFilter}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    isAdmin={isAdmin}
                    visibilityFilter={visibilityFilter}
                    setVisibilityFilter={setVisibilityFilter}
                />

                {/* Project Count */}
                <ProjectCount
                    filteredCount={filteredProjects.length}
                    totalCount={
                        isAdmin
                            ? projects.length
                            : projects.filter((p) => p.visible).length
                    }
                    isAdmin={isAdmin}
                    visibleCount={projects.filter((p) => p.visible).length}
                    hiddenCount={projects.filter((p) => !p.visible).length}
                />

                {/* Project Cards Grid */}
                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                isAdmin={isAdmin}
                                onToggleVisibility={() => toggleVisibility(project.id)}
                                onTogglePrivacy={() => togglePrivacy(project.id)}
                            />
                        ))}
                    </div>
                ) : (
                    // No Results
                    <div className="text-center py-12">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                            No projects found
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Try adjusting your search or filter to find what you're looking for.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {filteredProjects.length > 0 && <ProjectPagination />}
            </div>
        </div>
    );
}
