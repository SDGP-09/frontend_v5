"use client";
import React from 'react';
import { Projects } from '../../../types/projects';

interface ProjectCardProps {
    projects: Projects;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ projects }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Project Image */}
            <div className="relative h-48">
                <img
                    src={projects.imageUrl}
                    alt={projects.title}
                    className="w-full h-full object-cover"
                />

                {/* Status Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            {projects.status}
          </span>
                    {projects.privacy === 'Private' && (
                        <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-xs font-medium">
              Private
            </span>
                    )}
                </div>


                {/* Hidden Badge */}
                {projects.visibility === 'Hidden' && (
                    <div className="absolute bottom-4 left-0 right-0 mx-auto w-max">
            <span className="bg-white text-gray-700 px-3 py-1 rounded-full text-xs font-medium shadow-md">
              Hidden Project
            </span>
                    </div>
                )}
            </div>

            {/* Project Info */}
            <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{projects.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{projects.description}</p>

                {/* Completion Date */}
                <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-1">Completed</div>
                    <div className="text-sm text-gray-600">{projects.completedDate}</div>
                </div>

                {/* Project Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600 mt-4">

                    <div className="flex items-center">
                        {/*<Clock className="h-4 w-4 mr-1" />*/}
                        <span>{projects.duration}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;