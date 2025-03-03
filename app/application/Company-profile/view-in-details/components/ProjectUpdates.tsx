"use client";

import React from "react";

/**
 * Update Interface
 * ----------------
 * Represents a single project update.
 */
export interface Update {
    date: string;
    title: string;
    description: string;
    author: string;
}

interface ProjectUpdatesProps {
    updates: Update[];
}

/**
 * ProjectUpdates Component
 * ------------------------
 * Renders a list of recent updates, each showing the title, date,
 * description, and author.
 */
const ProjectUpdates: React.FC<ProjectUpdatesProps> = ({ updates }) => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Recent Updates
            </h2>
            <div className="space-y-6">
                {updates.map((update, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">
                                {update.title}
                            </h3>
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {update.date}
              </span>
                        </div>
                        <p className="text-gray-700 mb-4">{update.description}</p>
                        <div className="text-sm text-gray-600 italic">
                            Posted by: {update.author}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectUpdates;
