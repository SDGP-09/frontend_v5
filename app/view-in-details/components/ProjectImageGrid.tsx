"use client";

import React from "react";
import { AlertCircle } from "lucide-react";

interface ProjectImageGridProps {
    images: string[];
    name: string;
}

const ProjectImageGrid: React.FC<ProjectImageGridProps> = ({ images, name }) => {
    const hasImages = images && images.length > 0;

    return (
        <div className="relative">
            {hasImages ? (
                <div
                    className="grid gap-1 h-[35vh]"
                    style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
                >
                    {images.map((image, index) => (
                        <div key={index} className="relative overflow-hidden">
                            <img
                                src={image}
                                alt={`Project image ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="h-[35vh] bg-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                        <AlertCircle size={48} className="mx-auto mb-4" />
                        <p className="text-xl">No images available for this project</p>
                    </div>
                </div>
            )}

            <div className="absolute bottom-0 right-0 bg-gradient-to-tl from-black/80 to-transparent p-6 text-white max-w-full">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">{name}</h1>
            </div>
        </div>
    );
};

export default ProjectImageGrid;
