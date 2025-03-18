'use client';

import { useState, useRef } from 'react';
import { Plus,  X, Image as ImageIcon } from 'lucide-react';
import { Project, ProjectImage } from '@/app/types/project';
import { v4 as uuidv4 } from 'uuid';
import { GanttChart } from '@/app/application/project-management/components/GanttChart';
import axios from 'axios';
import api from "@/app/util/api";


export function MainForm() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [contractors, setContractors] = useState<{ id: number; name: string }[]>([]);
    const [contractorQuery, setContractorQuery] = useState('');
    const [selectedContractor, setSelectedContractor] = useState<number | null>(null);
    const [projectImages, setProjectImages] = useState<ProjectImage[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [newProject, setNewProject] = useState<Partial<Project>>({
        name: '',
        status: 'New',
        startDate: new Date(),
        endDate: new Date(),
        description: '',
    });

    const fetchContractors = async (query: string) => {
        if (query.length < 2) {
            setContractors([]); // Hide dropdown if query is too short
            return;
        }

        // Temporary mock data
        const mockContractors = [
            { id: 1, name: "John Doe" },
            { id: 2, name: "Jane Smith" },
            { id: 3, name: "Michael Johnson" }
        ];

        // Filter mock contractors
        const filteredContractors = mockContractors.filter(c =>
            c.name.toLowerCase().includes(query.toLowerCase())
        );

        setContractors(filteredContractors);
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProject.name || !newProject.startDate || !newProject.endDate || !selectedContractor) return;

        const newProjectComplete: Project = {
            id: uuidv4(),
            name: newProject.name || '',
            status: newProject.status as 'New' | 'In Progress' | 'Completed',
            startDate: new Date(newProject.startDate),
            endDate: new Date(newProject.endDate),
            description: newProject.description || '',
            expanded: false,
            tasks: [],
            contractorId: selectedContractor,
            images: projectImages ?? [],// Add images to the new project
        };

        try {
            // **Retrieve the token from localStorage, sessionStorage, or cookies**
            //const token = localStorage.getItem('token'); // Adjust based on how you store the token

            // Prepare request payload
            const params = {
                taskname: newProjectComplete.name,
                status: newProjectComplete.status,
                startDate: newProjectComplete.startDate.toISOString(),
                endDate: newProjectComplete.endDate.toISOString(),
                description: newProjectComplete.description,
                contractorId: newProjectComplete.contractorId,
                images: (newProjectComplete.images ?? []).map(img => img.url)
            };

            const response = await api.post(
                `http://35.193.219.136:4040/api/v1/main/create-main-task`,
                params.toString(),
                {
                    headers: { "Content-Type": "application/x-www-form-urlencoded", "X-Require-Auth": "true" }
                }
            );

            if (response.status === 201) {
                setProjects([...projects, newProjectComplete]);
                setShowForm(false);
                setNewProject({
                    name: '',
                    status: 'New',
                    startDate: new Date(),
                    endDate: new Date(),
                    description: '',
                });
                setSelectedContractor(null);
                setProjectImages([]);
            }
        } catch (error) {
            console.error('Error creating project:', error);
            alert('Failed to create the project. Please try again.');
        }
    };





    const handleProjectToggle = (projectId: string) => {
        setProjects(projects.map(project =>
            project.id === projectId
                ? { ...project, expanded: !project.expanded }
                : project
        ));
    };

    //project update in frontend
    const handleUpdateProject = (updatedProjectData: Project) => {
        setProjects(prevProjects =>
            prevProjects.map(project =>
                project.id === updatedProjectData.id
                    ? { ...project, ...updatedProjectData }
                    : project
            )
        );
    };

    //project delete in frontend
    const handleDeleteProject = (projectId: string) => {
        setProjects(prevProjects =>
            prevProjects.filter(project => project.id !== projectId)
        );
    };


    // Image handling functions
    const handleImageUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        // In a real application, you would upload this to a server/storage
        // For demo purposes, we're creating object URLs
        Array.from(files).forEach(file => {
            const newImage: ProjectImage = {
                id: uuidv4(),
                url: URL.createObjectURL(file),

            };
            setProjectImages(prevImages => [...prevImages, newImage]);
        });

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleRemoveImage = (id: string) => {
        setProjectImages(prevImages => prevImages.filter(image => image.id !== id));

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
                    <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-xl max-h-[90vh] overflow-y-auto"> {/* Added max-height and overflow */}
                        <h3 className="text-2xl font-bold mb-4 text-black text-center">Add New Project</h3>
                        <form onSubmit={handleSubmit}>

                            {/* Project Name */}
                            <div className="mb-1">
                                <label className="block text-sm font-medium mb-1 text-black">Project Name</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                                    value={newProject.name}
                                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                                    placeholder="Enter project name"
                                    required
                                />
                            </div>

                            {/* Start and End Date */}
                            <div className="grid grid-cols-2 gap-6 mb-1">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-black">Start Date</label>
                                    <input
                                        type="date"
                                        className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                                        value={newProject.startDate?.toISOString().split('T')[0]}
                                        onChange={(e) => setNewProject({
                                            ...newProject,
                                            startDate: new Date(e.target.value)
                                        })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-black">End Date</label>
                                    <input
                                        type="date"
                                        className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                                        value={newProject.endDate?.toISOString().split('T')[0]}
                                        onChange={(e) => setNewProject({
                                            ...newProject,
                                            endDate: new Date(e.target.value)
                                        })}
                                        required
                                    />
                                </div>
                            </div>


                            <div className="grid grid-cols-2 gap-6 mb-1">
                                {/* Status Selection */}
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-black">Status</label>
                                    <select
                                        className="w-full p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-gray-600"
                                        value={newProject.status}
                                        onChange={(e) => setNewProject({
                                            ...newProject,
                                            status: e.target.value as 'New' | 'In Progress' | 'Completed'
                                        })}
                                    >
                                        <option value="New">New</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>

                                {/* Contractor Selection */}
                                <div className="mb-1 relative">
                                    <label className="block text-sm font-medium mb-1 text-black">Assign
                                        Contractor</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                                        value={contractorQuery}
                                        onChange={(e) => {
                                            setContractorQuery(e.target.value);
                                            fetchContractors(e.target.value);
                                        }}
                                        placeholder="Type contractor name..."
                                    />
                                    {contractors.length > 0 && (
                                        <ul className="absolute left-0 w-full bg-white border border-gray-400 shadow-md rounded-lg z-10 max-h-48 overflow-y-auto">
                                            {contractors.map((contractor) => (
                                                <li
                                                    key={contractor.id}
                                                    className="p-2 cursor-pointer hover:bg-gray-200"
                                                    onClick={() => {
                                                        setSelectedContractor(contractor.id);
                                                        setContractorQuery(contractor.name);
                                                        setContractors([]);
                                                    }}
                                                >
                                                    {contractor.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            {/* Project Description */}
                            <div className="mb-5">
                                <label className="block text-sm font-medium mb-2 text-black">Project
                                    Description</label>
                                <textarea
                                    className="w-full p-3 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
                                    rows={4}
                                    placeholder="Enter a brief project description"
                                    value={newProject.description}
                                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                                />
                            </div>

                            {/*Project images*/}
                            <div className="mb-5">
                                <label className="block text-sm font-medium mb-2 text-black">Project Images</label>
                                <div
                                    onClick={handleImageUploadClick}
                                    className="w-full p-6 h-40 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-50 transition flex flex-col items-center justify-center gap-2"
                                >
                                    {projectImages.length > 0 ? (
                                        <div className="flex flex-wrap gap-2 justify-center">
                                            {projectImages.map((image) => (
                                                <div key={image.id} className="relative w-16 h-16">
                                                    <img
                                                        src={image.url}
                                                        alt="Uploaded"
                                                        className="w-full h-full object-cover rounded-lg border shadow-sm"
                                                    />
                                                    <button
                                                        className="absolute top-0 right-0 bg-red-500 rounded-full p-1 text-white"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleRemoveImage(image.id);
                                                        }}
                                                    >
                                                        <X className="w-3 h-3"/>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center text-gray-500 text-center">
                                            <ImageIcon className="w-12 h-12 text-gray-400 mb-2"/>
                                            <p className="text-sm font-semibold">Drag & Drop Images Here</p>
                                            <p className="text-xs text-gray-400">or click to browse</p>
                                            <p className="text-xs text-gray-400">JPG, PNG, GIF (Max 5MB each)</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        accept="image/*"
                                        multiple
                                    />
                                </div>
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
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}