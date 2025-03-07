"use client";

import React, { useState } from 'react';
import { Calendar, Clock, ChevronLeft, Edit2, Check, X } from 'lucide-react';
import BackButtonEdit from './components/BackButtonEdit';
import ProjectImageGridEdit from './components/ProjectImageGridEdit';
import ProjectOverviewEdit from './components/ProjectOverviewEdit';
import ProjectTimelineEdit from './components/ProjectTimelineEdit';
import ProjectUpdatesEdit from './components/ProjectUpdatesEdit';

// Types
interface TimelineItem {
    date: string;
    title: string;
    description: string;
    status: 'completed' | 'in-progress' | 'upcoming';
}

interface Update {
    date: string;
    title: string;
    description: string;
    author: string;
}

interface Project {
    id: string;
    name: string;
    description: string;
    client: string;
    location: string;
    budget: string;
    startDate: string;
    estimatedCompletion: string;
    images: string[];
    timeline: TimelineItem[];
    updates: Update[];
}

// Sample project data
const sampleProject: Project = {
    id: "proj-123",
    name: "Riverside Office Complex",
    description: "A modern 5-story office building with sustainable design features, including solar panels, rainwater collection, and energy-efficient systems. The complex includes underground parking, a rooftop garden, and collaborative workspaces.",
    client: "Greenfield Developments",
    location: "123 Riverside Drive, Portland, OR",
    budget: "$12.5 million",
    startDate: "March 15, 2024",
    estimatedCompletion: "September 30, 2025",
    images: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    timeline: [
        {
            date: "March 15, 2024",
            title: "Project Kickoff",
            description: "Initial planning and site preparation begins",
            status: "completed"
        },
        {
            date: "June 1, 2024",
            title: "Foundation Complete",
            description: "Concrete foundation and basement structures finished",
            status: "completed"
        },
        {
            date: "August 15, 2024",
            title: "Structural Framework",
            description: "Steel framework and core structure installation",
            status: "in-progress"
        }
    ],
    updates: [
        {
            date: "August 2, 2024",
            title: "Steel Framework 75% Complete",
            description: "The structural steel framework is now 75% complete, with the eastern and northern sections fully erected. The western section will begin next week.",
            author: "Michael Chen, Project Manager"
        },
        {
            date: "July 15, 2024",
            title: "Updated Electrical Plans Approved",
            description: "The revised electrical plans have been approved by the city inspector. This includes the additional charging stations in the parking area and the smart lighting system throughout the building.",
            author: "Sarah Johnson, Lead Engineer"
        }
    ]
};

const EditViewInDetailsPage = () => {
    const [project, setProject] = useState(sampleProject);

    const handleProjectUpdate = (updatedData: Partial<Project>) => {
        setProject({ ...project, ...updatedData });
    };

    const handleTimelineUpdate = (timeline: TimelineItem[]) => {
        setProject({ ...project, timeline });
    };

    const handleUpdatesUpdate = (updates: Update[]) => {
        setProject({ ...project, updates });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <BackButtonEdit />
            <ProjectImageGridEdit
                images={project.images}
                name={project.name}
                onNameChange={(name) => handleProjectUpdate({ name })}
            />
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <ProjectOverviewEdit
                    project={project}
                    onUpdate={handleProjectUpdate}
                />
                <ProjectTimelineEdit
                    timeline={project.timeline}
                    onUpdate={handleTimelineUpdate}
                />
                <ProjectUpdatesEdit
                    updates={project.updates}
                    onUpdate={handleUpdatesUpdate}
                />
            </div>
        </div>
    );
};

export default EditViewInDetailsPage;