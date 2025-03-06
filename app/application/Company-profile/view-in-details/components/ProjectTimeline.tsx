"use client";

import React from "react";

export interface TimelineItem {
    date: string;
    title: string;
    description: string;
    status: "completed" | "in-progress" | "upcoming";
}

interface ProjectTimelineProps {
    timeline: TimelineItem[];
}

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ timeline }) => {
    return (
        <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Project Timeline</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="relative">
                    {/* Vertical timeline line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>

                    <div className="space-y-8">
                        {timeline.map((item, index) => (
                            <div key={index} className="relative">
                                <div
                                    className={`flex items-center mb-2 ${
                                        index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                                >
                                    {/* Timeline dot with conditional styling */}
                                    <div
                                        className={`absolute left-4 md:left-1/2 w-8 h-8 rounded-full border-4 transform -translate-x-1/2 flex items-center justify-center ${
                                            item.status === "completed"
                                                ? "bg-green-500 border-green-200"
                                                : item.status === "in-progress"
                                                    ? "bg-blue-500 border-blue-200"
                                                    : "bg-gray-300 border-gray-200"
                                        }`}
                                    >
                                        {item.status === "completed" && (
                                            <svg
                                                className="w-4 h-4 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        )}
                                        {item.status === "in-progress" && (
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        )}
                                    </div>

                                    {/* Timeline content */}
                                    <div
                                        className={`w-full md:w-1/2 ${
                                            index % 2 === 0
                                                ? "md:pr-12 pl-12 md:pl-0"
                                                : "md:pl-12 pl-12"
                                        }`}
                                    >
                                        <div
                                            className={`bg-white p-4 rounded-lg border ${
                                                item.status === "completed"
                                                    ? "border-green-200"
                                                    : item.status === "in-progress"
                                                        ? "border-blue-200"
                                                        : "border-gray-200"
                                            }`}
                                        >
                                            <div className="font-semibold text-gray-800">
                                                {item.title}
                                            </div>
                                            <div className="text-sm text-gray-500 mb-2">
                                                {item.date}
                                            </div>
                                            <p className="text-gray-700">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectTimeline;
