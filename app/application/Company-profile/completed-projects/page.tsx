"use client";
import React, { useState } from "react";
import ProjectFilterBar from "./components/ProjectFilterBar";
import ProjectCount from "./components/ProjectCount";
import ProjectList from "./components/ProjectList";
import { Projects } from "@/app/types/projects";

const projectsData: Projects[] = [
    {
        id: "1",
        title: "Urban Renewal District",
        description:
            "Revitalization of downtown area with mixed-use developments, pedestrian-friendly streets, and green spaces, completed under budget.",
        status: "Completed",
        visibility: "Visible",
        privacy: "Public",
        imageUrl:
            "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1470&q=80",
        duration: "18 months",
        completedDate: "March 15, 2024",
    },
    {
        id: "2",
        title: "Riverside Park Renovation",
        description:
            "Complete overhaul of the riverside park including new recreational facilities, landscaping, and flood protection measures.",
        status: "Completed",
        visibility: "Visible",
        privacy: "Public",
        imageUrl:
            "https://images.unsplash.com/photo-1584967918940-a7d51b064268?auto=format&fit=crop&w=1470&q=80",
        duration: "12 months",
        completedDate: "January 10, 2024",
    },
    {
        id: "3",
        title: "Sustainable Housing Complex",
        description:
            "Award-winning eco-friendly residential complex featuring solar power, rainwater harvesting, and energy-efficient design.",
        status: "Completed",
        visibility: "Visible",
        privacy: "Public",
        imageUrl:
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1473&q=80",
        duration: "24 months",
        completedDate: "November 5, 2023",
    },
    {
        id: "4",
        title: "Community Healthcare Center",
        description:
            "Modern healthcare facility serving underrepresented communities with state-of-the-art medical equipment and telehealth capabilities.",
        status: "Completed",
        visibility: "Hidden",
        privacy: "Public",
        imageUrl:
            "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1453&q=80",
        duration: "14 months",
        completedDate: "October 20, 2023",
    },
    {
        id: "5",
        title: "Historic Theater Restoration",
        description:
            "Careful restoration of a 1920s theater, preserving historical elements while upgrading technical systems and accessibility.",
        status: "Completed",
        visibility: "Visible",
        privacy: "Public",
        imageUrl:
            "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1471&q=80",
        duration: "30 months",
        completedDate: "August 3, 2023",
    },
    {
        id: "6",
        title: "Smart City Infrastructure",
        description:
            "Implementation of IoT sensors, smart traffic management, and digital public services across the metropolitan area.",
        status: "Completed",
        visibility: "Visible",
        privacy: "Public",
        imageUrl:
            "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1469&q=80",
        duration: "36 months",
        completedDate: "June 15, 2023",
    },
];

export default function CompletedProjectsPage() {
    const [projects] = useState<Projects[]>(projectsData);
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("All Projects");
    const [visibilityFilter, setVisibilityFilter] = useState("all"); // "all", "visible", "hidden"
    const isAdmin = true; // Admin view is enabled

    // Filter projects based on search and filter criteria
    const filteredProjects = projects.filter((project) => {
        const matchesSearch =
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase());
        let matchesVisibility = true;
        if (visibilityFilter !== "all") {
            matchesVisibility =
                visibilityFilter === "visible"
                    ? project.visibility === "Visible"
                    : project.visibility !== "Visible";
        }
        const matchesStatus = filter === "All Projects" || project.status === filter;
        return matchesSearch && matchesVisibility && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Completed Projects</h1>
                </div>

                {/* Search and Filter */}
                <ProjectFilterBar
                    filter={filter}
                    setFilter={setFilter}
                    searchTerm={searchQuery}
                    setSearchTerm={setSearchQuery}
                    isAdmin={isAdmin}
                    visibilityFilter={visibilityFilter}
                    setVisibilityFilter={setVisibilityFilter}
                />

                {/* Project Count */}
                <ProjectCount
                    filteredCount={filteredProjects.length}
                    totalCount={projects.length}
                    isAdmin={isAdmin}
                    visibleCount={projects.filter((p) => p.visibility === "Visible").length}
                    hiddenCount={projects.filter((p) => p.visibility !== "Visible").length}
                />

                {/* Project Cards Grid */}
                {filteredProjects.length > 0 ? (
                    <ProjectList
                        projects={filteredProjects}
                        isAdmin={isAdmin}
                        onToggleVisibility={(id) => {
                            // Toggle visibility in state (update as needed)
                            console.log("Toggling visibility for id:", id);
                        }}
                        onTogglePrivacy={() => {
                            console.log("Toggling privacy");
                        }}
                        onViewDetails={(id) => {
                            console.log("View details for id:", id);
                        }}
                    />
                ) : (
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
                    </div>
                )}
            </div>
        </div>
    );
}
