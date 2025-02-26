'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Project } from '@/app/types/project';
import { GanttChart } from './GanttChart';
import axios from 'axios';


export function MainForm() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [newProject, setNewProject] = useState<Partial<Project>>({
        name: '',
        status: 'New',
        startDate: new Date(),
        endDate: new Date(),
        description: '',
        //contractor: CONTRACTORS[0],
    });

    const handleProjectToggle = (projectId: string) => {
        setProjects(projects.map(project =>
            project.id === projectId
                ? { ...project, expanded: !project.expanded }
                : project
        ));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProject.name || !newProject.startDate || !newProject.endDate) return;

        const newProjectComplete: Project = {
            id: String(projects.length + 1),
            name: newProject.name,
            status: newProject.status as 'New' | 'In Progress' | 'Completed',
            startDate: new Date(newProject.startDate),
            endDate: new Date(newProject.endDate),
            description: newProject.description || '',
            //contractor: newProject.contractor || CONTRACTORS[0],
            expanded: false,
            tasks: [],
        };

        try {
            const response = await axios.post('http://35.193.219.136:4040/api/v1/main/create-main-task', newProjectComplete, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ5bzFJOEtPNGl5bWYwNzB4S0dHcm5tMk9yT2hUZnBydlh5MWREZUMtZzdJIn0.eyJleHAiOjE3NDA0MDQwODksImlhdCI6MTc0MDQwMzc4OSwianRpIjoiMDFlZDJlZTQtYjUyMC00OTQwLWIyYzItZTRiNzE1YjJiMmYzIiwiaXNzIjoiaHR0cDovL2NpdmlsaW5rLWtleWNsb2FrLmRldmVsb3BtZW50LnN2Yy5jbHVzdGVyLmxvY2FsOjgwODAvcmVhbG1zL2NpdmlsaW5rIiwiYXVkIjpbInJlYWxtLW1hbmFnZW1lbnQiLCJicm9rZXIiLCJhY2NvdW50Il0sInN1YiI6ImYzYWE1ZWJiLTRjYTAtNGQ2YS04Mzg1LTM4NTI4ZmQ4MDNkYyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImNpdmlsaW5rLWNsaWVudCIsInNpZCI6IjYyNjlmYTNkLTY0YzUtNDUzNi1iNTUzLWQyYzc5OTI5NGEwMSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1jaXZpbGluayIsImdyb3VwX2FkbWluIiwib2ZmbGluZV9hY2Nlc3MiLCJncm91cF9tMSIsInVtYV9hdXRob3JpemF0aW9uIiwiZ3JvdXBfbTIiLCJncm91cF9tZW1iZXIiLCJncm91cF9leDEiLCJnZW5hcmFsX3VzZXIiLCJncm91cF9leDIiXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwidmlldy1yZWFsbSIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwicmVhbG0tYWRtaW4iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sImNpdmlsaW5rLWNsaWVudCI6eyJyb2xlcyI6WyJ1bWFfcHJvdGVjdGlvbiJdfSwiYnJva2VyIjp7InJvbGVzIjpbInJlYWQtdG9rZW4iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJ2aWV3LWFwcGxpY2F0aW9ucyIsInZpZXctY29uc2VudCIsInZpZXctZ3JvdXBzIiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJkZWxldGUtYWNjb3VudCIsIm1hbmFnZS1jb25zZW50Iiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJhYmNfY29uc3VsdGFudCBhYmNfY29uc3VsdGFudCIsInByZWZlcnJlZF91c2VybmFtZSI6ImFiY19jb25zdWx0YW50X2FkbWluIiwiZ2l2ZW5fbmFtZSI6ImFiY19jb25zdWx0YW50IiwiZmFtaWx5X25hbWUiOiJhYmNfY29uc3VsdGFudCIsImVtYWlsIjoiYWJjX2NvbnN1bHRhbnRAZ21haWwuY29tIiwiZ3JvdXAiOlsiYWJjX2Nuc3VsdGFudHMiXX0.m1nD-VCIlbbkmdlS7eiauHs7pWAkuk5hw6WJ_I4yoFu0ckoO7cIaaxhkYhiXhmYQZbrs1ZpZxpNuukYEkOHy27LISF7q4C1KnYXmlDQqOuxB5ISL3b1YayTWaaZTccx4TU4lHOWYLLPmEQ6CxOHy_Whkvb7l2ESD6W6A_sDSrI9ET61_CmNLINFTVre0HH4r3I7WyBVhWPz4PJZZui5n2U1gUmlA6l5Z97lH8Mw3AtxokOeF_AAASKpUJPiuq14CfmZid_c1O1-Pdn3dmRYVgK5P-LNxhhwmCKt1df3yZxjHBOl_UrpxUMW96ld9EJHYgsQlb4df-c2QF_XejOi-lw`, // Ensure you have a valid JWT token
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                console.log('Main task created successfully:', response.data);
                setProjects([...projects, newProjectComplete]);
                setShowForm(false);
                setNewProject({
                    name: '',
                    status: 'New',
                    startDate: new Date(),
                    endDate: new Date(),
                    description: '',
                });
            }else {
                console.error('Error creating main task:', response.status);
            }
        } catch (error) {
            console.error('Error creating main task:', error);
        }
    };





    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
                Project Timeline
            </h1>

            <GanttChart
                projects={projects}
                onProjectToggle={handleProjectToggle}
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



                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button onClick={handleSubmit}
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
