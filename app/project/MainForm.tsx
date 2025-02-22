'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Project } from "@/app/types/project";
import { GanttChart } from '@/app/components/GanttChart';

const CONTRACTORS = [
    'John Construction Co.',
    'Smith Builders',
    'Elite Construction',
    'Premier Contractors',
];

// Helper function to calculate days between dates
const daysBetween = (date1: Date, date2: Date) => {
    return Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));
};

// Helper function to calculate months between dates
const monthsBetween = (date1: Date, date2: Date) => {
    return (
        (date2.getFullYear() - date1.getFullYear()) * 12 +
        date2.getMonth() - date1.getMonth()
    );
};

// Get the earliest start date from all projects
const getEarliestDate = (projects: Project[]) => {
    if (projects.length === 0) return new Date();
    return new Date(Math.min(...projects.map(p => p.startDate.getTime())));
};

// Get the latest end date from all projects
const getLatestDate = (projects: Project[]) => {
    if (projects.length === 0) {
        const date = new Date();
        date.setDate(date.getDate() + 30); // Default 30 days view
        return date;
    }
    return new Date(Math.max(...projects.map(p => p.endDate.getTime())));
};

export function MainForm() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [newProject, setNewProject] = useState<Partial<Project>>({
        name: '',
        status: 'New',
        startDate: new Date(),
        endDate: new Date(),
        description: '',
        contractor: CONTRACTORS[0],
    });

    // Generate timeline units based on project duration
    const earliestDate = getEarliestDate(projects);
    const latestDate = getLatestDate(projects);
    const totalDays = daysBetween(earliestDate, latestDate) + 1;
    const useMonths = totalDays > 60;

    const timelineUnits = useMonths
        ? Array.from({ length: monthsBetween(earliestDate, latestDate) + 1 }, (_, i) => {
            const date = new Date(earliestDate);
            date.setMonth(date.getMonth() + i);
            return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        })
        : Array.from({ length: totalDays }, (_, i) => {
            const date = new Date(earliestDate);
            date.setDate(date.getDate() + i);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });

    const toggleProject = (projectId: string) => {
        setProjects(projects.map(project =>
            project.id === projectId
                ? { ...project, expanded: !project.expanded }
                : project
        ));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProject.name || !newProject.startDate || !newProject.endDate) return;

        const newProjectComplete: Project = {
            id: String(projects.length + 1),
            name: newProject.name,
            status: newProject.status as 'New' | 'In Progress' | 'Completed',
            startDate: new Date(newProject.startDate),
            endDate: new Date(newProject.endDate),
            description: newProject.description || '',
            contractor: newProject.contractor || CONTRACTORS[0],
            expanded: false,
            tasks: [],
        };

        setProjects([...projects, newProjectComplete]);
        setShowForm(false);
        setNewProject({
            name: '',
            status: 'New',
            startDate: new Date(),
            endDate: new Date(),
            description: '',
            contractor: CONTRACTORS[0],
        });
    };



    const getProjectPosition = (startDate: Date) => {
        if (useMonths) {
            const months = monthsBetween(earliestDate, startDate);
            return `${months * 10}rem`;
        }
        const days = daysBetween(earliestDate, startDate);
        return `${days * 5}rem`;
    };

    const getProjectWidth = (startDate: Date, endDate: Date) => {
        if (useMonths) {
            const duration = monthsBetween(startDate, endDate) + 1;
            return `${duration * 10}rem`;
        }
        const duration = daysBetween(startDate, endDate);
        return `${duration * 5}rem`;
    };

    const timelineWidth = useMonths
        ? `${timelineUnits.length * 10}rem`
        : `${timelineUnits.length * 5}rem`;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
                Project Timeline
            </h1>

            <GanttChart
                projects={projects}
                timelineUnits={timelineUnits}
                timelineWidth={timelineWidth}
                useMonths={useMonths}
                earliestDate={earliestDate}
                toggleProject={toggleProject}
                getProjectPosition={getProjectPosition}
                getProjectWidth={getProjectWidth}
            />

            {/* Add Project Button */}
            <div className="mt-6">
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-md hover:from-green-500 hover:to-blue-600 transition-all shadow-md"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Project</span>
                </button>
            </div>

            {/* Add Project Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Add New Project</h2>
                            <button
                                onClick={() => setShowForm(false)}
                                className="p-1 hover:bg-gray-100 rounded"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Project Name
                                </label>
                                <input
                                    type="text"
                                    value={newProject.name}
                                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Status
                                </label>
                                <select
                                    value={newProject.status}
                                    onChange={(e) => setNewProject({ ...newProject, status: e.target.value as 'New' | 'In Progress' | 'Completed' })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="New">New</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        value={newProject.startDate?.toISOString().split('T')[0]}
                                        onChange={(e) => setNewProject({ ...newProject, startDate: new Date(e.target.value) })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        value={newProject.endDate?.toISOString().split('T')[0]}
                                        onChange={(e) => setNewProject({ ...newProject, endDate: new Date(e.target.value) })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    value={newProject.description}
                                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Contractor
                                </label>
                                <select
                                    value={newProject.contractor}
                                    onChange={(e) => setNewProject({ ...newProject, contractor: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    {CONTRACTORS.map((contractor) => (
                                        <option key={contractor} value={contractor}>
                                            {contractor}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-md hover:from-green-500 hover:to-blue-600"
                                >
                                    Create Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
