"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";


interface Project {
    id: number;
    title: string;
    image: string;
}

interface OngoingProjectsProps {
    projects: Project[];
}

const OngoingProjects: React.FC<OngoingProjectsProps> = ({ projects }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm h-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Ongoing Projects</h2>
                <Link href="/ongoing-user-view">
                    <span className="text-blue-500 hover:text-blue-600 transition-colors cursor-pointer">
                        View All
                    </span>
                </Link>
            </div>
            <div className="overflow-x-auto">
                <div className="flex gap-4 pb-4">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="flex-shrink-0 w-72 group hover:transform hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="relative aspect-video rounded-lg overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    layout="fill"
                                    objectFit="cover"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">

                                </div>
                            </div>
                            <h3 className="mt-2 font-semibold">{project.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OngoingProjects;
