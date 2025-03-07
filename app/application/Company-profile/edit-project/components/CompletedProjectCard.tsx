"use client";
import React from "react";
import Image from "next/image";

/**
 * CompletedProjectCardProps
 *
 * @param title - The project title.
 * @param image - URL for the project's image.
 */
interface CompletedProjectCardProps {
    title: string;
    image: string;
}

/**
 * CompletedProjectCard Component
 *
 * Displays a completed project with an image and a title overlay.
 */
export default function CompletedProjectCard({ title, image }: CompletedProjectCardProps) {
    return (
        <div className="group relative rounded-lg overflow-hidden">
            <Image
                src={image}
                alt={title}
                width={400}  // Set appropriate width
                height={192} // Set appropriate height (h-48 is ~192px)
                className="w-full h-48 object-cover"
                priority // Improves LCP
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 flex items-end">
                <h3 className="text-white font-medium p-4">{title}</h3>
            </div>
        </div>
    );
}
