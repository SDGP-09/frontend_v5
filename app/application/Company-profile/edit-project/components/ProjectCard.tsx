"use client";
import React from "react";
import Image from "next/image";

interface ProjectCardProps {
    title: string;
    status: string;
    image: string;
}

export default function ProjectCard({ title, status, image }: ProjectCardProps) {
    return (
        <div className="border rounded-lg overflow-hidden bg-white">
            {/* Image on top, using a 16:9 ratio (e.g., 640x360). Adjust as needed. */}
            <Image
                src={image}
                alt={title}
                width={640}
                height={360}
                className="w-full h-auto object-cover"
                priority
            />
            {/* Card content */}
            <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800">{title}</h3>
                <span className="text-sm text-gray-500 capitalize">{status}</span>
            </div>
        </div>
    );
}
