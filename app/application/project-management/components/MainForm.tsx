'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Project} from '@/app/types/project';
import { v4 as uuidv4 } from 'uuid';
import { GanttChart } from '@/app/application/project-management/components/GanttChart';


// Then modify the MainForm component to handle the type mismatch
export function MainForm() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [newProject, setNewProject] = useState<Partial<Project>>({
        name: '',
        status: 'New',
        startDate: new Date(),
        endDate: new Date(),
        description: '',
    });

    const handleProjectToggle = (projectId: string) => {
        setProjects(projects.map(project =>
            project.id === projectId
                ? { ...project, expanded: !project.expanded }
                : project
        ));
    };

    //update project details in frontend
    const handleUpdateProject = (updatedProjectData: Project) => {
        setProjects(prevProjects =>
            prevProjects.map(project =>
                project.id === updatedProjectData.id
                    ? {
                        ...project, // Retain existing properties
                        ...updatedProjectData, // Override with new data
                        status: updatedProjectData.status as 'New' | 'In Progress' | 'Completed',
                    }
                    : project
            )
        );
    };


    //delete project from frontend
    const handleDeleteProject = (projectId: string) => {
        setProjects(prevProjects =>
            prevProjects.filter(project => project.id !== projectId)
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProject.name || !newProject.startDate || !newProject.endDate) return;

        const newProjectComplete: Project = {
            id: uuidv4(), // Generate a unique ID
            name: newProject.name || '',
            status: newProject.status as 'New' | 'In Progress' | 'Completed',
            startDate: new Date(newProject.startDate),
            endDate: new Date(newProject.endDate),
            description: newProject.description || '',
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
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
                Project Timeline
            </h1>

            <div className="mt-6">
                <GanttChart
                    projects={projects}
                    onProjectToggle={handleProjectToggle}
                    onUpdateProject={handleUpdateProject}
                    onDeleteProject={handleDeleteProject}
                />
            </div>

            {/* Add Project Button */}
            <div className="mt-6">
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-md hover:from-green-500 hover:to-blue-600 transition-all shadow-md"
                >
                    <Plus className="w-4 h-4"/>
                    <span>Add Project</span>
                </button>
            </div>

            {/* Add Project Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-lg sm:max-w-md">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Add New Project</h3>
                        <form onSubmit={handleSubmit}>
                            {/* Project Name */}
                            <div className="mb-1">
                                <label className="block text-sm font-medium mb-1 text-gray-700">Project Name</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    value={newProject.name}
                                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                                    placeholder="Enter project name"
                                    required
                                />
                            </div>

                            {/* Start and End Date */}
                            <div className="grid grid-cols-2 gap-6 mb-1">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700">Start Date</label>
                                    <input
                                        type="date"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                        value={newProject.startDate?.toISOString().split('T')[0]}
                                        onChange={(e) => setNewProject({
                                            ...newProject,
                                            startDate: new Date(e.target.value)
                                        })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700">End Date</label>
                                    <input
                                        type="date"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                        value={newProject.endDate?.toISOString().split('T')[0]}
                                        onChange={(e) => setNewProject({
                                            ...newProject,
                                            endDate: new Date(e.target.value)
                                        })}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Status Dropdown */}
                            <div className="mb-1">
                                <label className="block text-sm font-medium mb-1 text-gray-700">Status</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    value={newProject.status}
                                    onChange={(e) => setNewProject({
                                        ...newProject,
                                        status: e.target.value as 'New' | 'In Progress' | 'Completed'
                                    })}>
                                    <option value="New">New</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>

                            {/* Project Description */}
                            <div className="mb-5">
                                <label className="block text-sm font-medium mb-2 text-gray-700">Project Description</label>
                                <textarea
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                                    rows={4}
                                    placeholder="Enter a brief project description"
                                    value={newProject.description}
                                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="px-6 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none"
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:from-green-500 hover:to-blue-600 focus:outline-none"
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