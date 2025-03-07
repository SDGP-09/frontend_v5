"use client";
import React from "react";

/**
 * ProjectCardProps
 *
 * @param title - The project title.
 * @param status - The status of the project.
 * @param image - URL for the project's image.
 */
interface ProjectCardProps {
    title: string;
    status: string;
    image: string;
}

/**
 * ProjectCard Component
 *
 * Displays an ongoing project with its image, title, and status.
 * Also provides action buttons for editing and deleting the project.
 */
export default function ProjectCard({ title, status, image }: ProjectCardProps) {
    return (
        <div className="flex items-center gap-4 p-4 border rounded-lg">
            <img src={image} alt={title} className="w-24 h-24 rounded object-cover" />
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-medium">{title}</h3>
                        <span className="text-sm text-gray-500 capitalize">{status}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}