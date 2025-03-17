"use client";

import React from "react";
import { Search, Filter, Eye } from "lucide-react";

interface ProjectFilterBarProps {
    filter: string;
    setFilter: (value: string) => void;
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    isAdmin: boolean;
    visibilityFilter: string;
    setVisibilityFilter: (value: string) => void;
}

export default function ProjectFilterBar({
                                             filter,
                                             setFilter,
                                             searchTerm,
                                             setSearchTerm,
                                             isAdmin,
                                             visibilityFilter,
                                             setVisibilityFilter,
                                         }: ProjectFilterBarProps) {
    return (
        <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
            <div className="relative flex-grow md:mr-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                />
            </div>
            <div className="flex space-x-3">
                {isAdmin && (
                    <div className="relative inline-block text-left">
                        <div className="flex items-center border border-gray-300 rounded-md">
                            <Eye size={18} className="ml-3 text-gray-400" />
                            <select
                                value={visibilityFilter}
                                onChange={(e) => setVisibilityFilter(e.target.value)}
                                className="block w-full pl-2 pr-8 py-2 text-base border-0 focus:outline-none focus:ring-0 sm:text-sm rounded-md"
                            >
                                <option value="all">All Projects</option>
                                <option value="visible">Visible Only</option>
                                <option value="hidden">Hidden Only</option>
                            </select>
                        </div>
                    </div>
                )}
                <div className="relative inline-block text-left">
                    <div className="flex items-center border border-gray-300 rounded-md">
                        <Filter size={18} className="ml-3 text-gray-400" />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="block w-full pl-2 pr-8 py-2 text-base border-0 focus:outline-none focus:ring-0 sm:text-sm rounded-md"
                        >
                            <option>All Projects</option>
                            <option>In Progress</option>
                            <option>Planning</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

