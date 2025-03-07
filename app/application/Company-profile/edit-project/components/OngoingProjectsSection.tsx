"use client";
import React from "react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";

/**
 * OngoingProjectsSection Component
 *
 * Displays the list of ongoing projects along with a header and an option to add a new project.
 */
export default function OngoingProjectsSection() {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Ongoing Projects</h2>
                <Link href="/application/Company-profile/ongoing-projects">
                    <span className="text-blue-500 text-sm cursor-pointer hover:underline">
                        View All
                    </span>
                </Link>
            </div>

            {/* Project Cards Section */}
            <div className="space-y-4">
                <ProjectCard
                    title="City Center Mall"
                    status="ongoing"
                    image="https://res.cloudinary.com/ddcbr53w0/image/upload/v1740426980/indoor-hotel-view_1417-1566_siila7.avif"
                />
                <ProjectCard
                    title="Riverside Apartments"
                    status="ongoing"
                    image="https://res.cloudinary.com/ddcbr53w0/image/upload/v1740427131/old-buildings-port-evening_1268-14340_j234y6.avif"
                />
                <ProjectCard
                    title="Waterfront Convention Center"
                    status="ongoing"
                    image="https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80>"
                />
            </div>
        </div>
    );
}
