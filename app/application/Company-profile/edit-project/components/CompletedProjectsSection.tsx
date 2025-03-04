"use client";
import React from "react";
import CompletedProjectCard from "./CompletedProjectCard";

/**
 * CompletedProjectsSection Component
 *
 * Displays a grid of completed projects along with a header.
 */
export default function CompletedProjectsSection() {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Completed Projects</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                    View All
                </button>
            </div>
            <div className="grid grid-cols-4 gap-6">
                <CompletedProjectCard
                    title="Downtown Plaza"
                    image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800"
                />
                <CompletedProjectCard
                    title="Harbor Bridge"
                    image="https://res.cloudinary.com/ddcbr53w0/image/upload/v1740427233/bridge-water-blue-sky-daytime_417767-125_yiq7ck.avif"
                />
                <CompletedProjectCard
                    title="Metro Station"
                    image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800"
                />
                <CompletedProjectCard
                    title="Sports Complex"
                    image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800"
                />
            </div>
        </div>
    );
}
