"use client";
import React from "react";
import { Plus } from "lucide-react";
import ProjectCard from "./ProjectCard";

/**
 * OngoingProjectsSection Component
 *
 * Displays the list of ongoing projects along with a header and an option to add a new project.
 */
export default function OngoingProjectsSection() {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Ongoing Projects</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:bg-blue-700 transition">
                    <Plus className="w-4 h-4" />
                    Add Project
                </button>
            </div>
            <div className="space-y-4">
                <ProjectCard
                    title="City Center Mall"
                    status="ongoing"
                    progress={65}
                    image="https://res.cloudinary.com/ddcbr53w0/image/upload/v1740426980/indoor-hotel-view_1417-1566_siila7.avif"
                />
                <ProjectCard
                    title="Riverside Apartments"
                    status="ongoing"
                    progress={30}
                    image="https://res.cloudinary.com/ddcbr53w0/image/upload/v1740427131/old-buildings-port-evening_1268-14340_j234y6.avif"
                />
            </div>
        </div>
    );
}
