"use client";
import React from "react";
import { Edit2, Trash2 } from "lucide-react";

/**
 * ProjectCardProps
 *
 * @param title - The project title.
 * @param status - The status of the project.
 * @param progress - The progress percentage of the project.
 * @param image - URL for the project's image.
 */
interface ProjectCardProps {
    title: string;
    status: string;
    progress: number;
    image: string;
}

/**
 * ProjectCard Component
 *
 * Displays an ongoing project with its image, title, status, and a progress bar.
 * Also provides action buttons for editing and deleting the project.
 */
export default function ProjectCard({ title, status, progress, image }: ProjectCardProps) {
    return (
        <div className="flex items-center gap-4 p-4 border rounded-lg">
            <img src={image} alt={title} className="w-24 h-24 rounded object-cover" />
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-medium">{title}</h3>
                        <span className="text-sm text-gray-500 capitalize">{status}</span>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                        <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
