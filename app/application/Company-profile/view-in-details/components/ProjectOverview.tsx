"use client";

import React from "react";
import { Calendar, Clock } from "lucide-react";

interface ProjectOverviewProps {
    description: string;
    client: string;
    location: string;
    budget: string;
    startDate: string;
    estimatedCompletion: string;
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({
                                                             description,
                                                             client,
                                                             location,
                                                             budget,
                                                             startDate,
                                                             estimatedCompletion,
                                                         }) => {
    return (
        <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Project Overview</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-700 mb-6">{description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Project Details */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            Project Details
                        </h3>
                        <div className="space-y-2">
                            <p className="text-gray-700">
                                <span className="font-medium">Client:</span> {client}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-medium">Location:</span> {location}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-medium">Budget:</span> {budget}
                            </p>
                        </div>
                    </div>

                    {/* Project Schedule */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            Project Schedule
                        </h3>
                        <div className="space-y-2">
                            <div className="flex items-start">
                                <Calendar size={20} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                                <p className="text-gray-700">
                                    <span className="font-medium">Start Date:</span> {startDate}
                                </p>
                            </div>
                            <div className="flex items-start">
                                <Clock size={20} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                                <p className="text-gray-700">
                                    <span className="font-medium">Estimated Completion:</span> {estimatedCompletion}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectOverview;
