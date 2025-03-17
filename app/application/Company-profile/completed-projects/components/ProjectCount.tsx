"use client";
import React from "react";

interface ProjectCountProps {
    filteredCount: number;
    totalCount: number;
    isAdmin: boolean;
    visibleCount: number;
    hiddenCount: number;
}

export default function ProjectCount({
                                         filteredCount,
                                         totalCount,
                                         isAdmin,
                                         visibleCount,
                                         hiddenCount,
                                     }: ProjectCountProps) {
    return (
        <div className="mb-4 text-sm text-gray-600 flex justify-between items-center">
            <div>
                Showing {filteredCount} of {totalCount} projects
            </div>
            {isAdmin && (
                <div className="text-sm text-gray-600">
          <span className="mr-4">
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>{" "}
              Visible: {visibleCount}
          </span>
                    <span>
            <span className="inline-block w-3 h-3 bg-gray-400 rounded-full mr-1"></span>{" "}
                        Hidden: {hiddenCount}
          </span>
                </div>
            )}
        </div>
    );
}
