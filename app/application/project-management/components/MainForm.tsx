'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Project} from '@/app/types/project';
import { v4 as uuidv4 } from 'uuid';
import { GanttChart } from '@/app/application/project-management/components/GanttChart';





// Then modify the MainForm component to handle the type mismatch
export function MainForm() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(undefined);
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
                    selectedProjectId={selectedProjectId}
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Add New Project</h2>
                            <button
                                onClick={() => setShowForm(false)}
                                className="p-1 hover:bg-gray-100 rounded"
                            >
                                <X className="w-5 h-5"/>
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
                                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                                    className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Status
                                </label>
                                <select
                                    value={newProject.status}
                                    onChange={(e) => setNewProject({
                                        ...newProject,
                                        status: e.target.value as 'New' | 'In Progress' | 'Completed'
                                    })}
                                    className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                                        onChange={(e) => setNewProject({
                                            ...newProject,
                                            startDate: new Date(e.target.value)
                                        })}
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
                                        onChange={(e) => setNewProject({
                                            ...newProject,
                                            endDate: new Date(e.target.value)
                                        })}
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
                                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    rows={4}
                                />
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