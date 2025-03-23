"use client";
import React from "react";
import Image from "next/image";
import { Projects } from "@/app/types/projects";

interface CompletedProjectDetailsProps {
    project: Projects;
}

export default function CompletedProjectDetails({ project }: CompletedProjectDetailsProps) {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative h-64">
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
                <p className="text-gray-600 mt-2">{project.description}</p>
            </div>
        </div>
    );
}
