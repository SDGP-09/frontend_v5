'use client';

import { useState, useEffect } from 'react';
import { Plus, ArrowLeft, Calendar, CheckCircle, Clock, FileText, User } from 'lucide-react';
import { SubtaskForm } from './SubtaskForm';
import { Task, Project } from '@/app/types/project';
import { GanttChart } from './GanttChart';
import Link from 'next/link';

// Add contractor interface
interface Contractor {
    id: number;
    name: string;
    image: string;
}

interface TaskDetailsProps {
    projectId: string;
}

export function TaskDetails({ projectId }: TaskDetailsProps) {
    const [showSubtaskForm, setShowSubtaskForm] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [contractor, setContractor] = useState<Contractor | null>(null);

    // Simulated API call
    useEffect(() => {
        setTimeout(() => {
            const project: Project = {
                id: projectId,
                name: 'Sample Project',
                status: 'In Progress' as const,
                startDate: new Date(),
                endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                description: 'An apartment construction project involves building a residential complex consisting of multiple units designed for individual living. The project begins with planning and designing the structure, ensuring that the design meets zoning regulations, building codes, and the needs of future residents. Architects and engineers collaborate to create detailed blueprints that include the layout, materials, and utilities.\n' +
                    '\n' +
                    'The construction phase starts with site preparation, followed by the laying of foundations. The structure is built using concrete, steel, and other durable materials to ensure stability and safety. Once the framework is in place, workers install plumbing, electrical systems, and other essential infrastructure. Interior finishes, including flooring, walls, and fixtures, are added to complete the apartments.\n' +
                    '\n' +
                    'The final stages include landscaping and exterior finishing, ensuring the building is visually appealing and functional. After inspection and approval, the apartments are ready for occupancy, providing a comfortable and secure living environment for residents.',
                tasks: [],
                expanded: true,
                contractorId: 1,
            };

            // Simulated contractor data
            const contractorData: Contractor = {
                id: 1,
                name: 'Alex Johnson',
                image: '/api/placeholder/150/150',
            };

            setCurrentProject(project);
            setProjects([project]);
            setContractor(contractorData);
            setLoading(false);
        }, 500);
    }, [projectId]);



    // Calculate remaining days
    const calculateRemainingDays = () => {
        if (!currentProject) return 0;

        const endDate = new Date(currentProject.endDate);
        const today = new Date();
        const diffTime = endDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays > 0 ? diffDays : 0;
    };

    // Status badge color
    const getStatusColor = () => {
        if (!currentProject) return 'bg-gray-200';

        switch(currentProject.status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'In Progress': return 'bg-blue-100 text-blue-800';
            case 'New': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };


    //handle subtask details in frontend
    const handleAddSubtask = (subtask: Task) => {
        if (!currentProject) return;

        const updatedProject = {
            ...currentProject,
            tasks: Array.isArray(currentProject.tasks) ? [...currentProject.tasks, subtask] : [subtask], // Ensure tasks is an array
        };

        setCurrentProject(updatedProject);
        setProjects(projects.map(p => (p.id === projectId ? updatedProject : p)));
        setShowSubtaskForm(false);
    };


    const handleProjectToggle = (projectId: string) => {
        setProjects(projects.map(project =>
            project.id === projectId ? { ...project, expanded: !project.expanded } : project
        ));
    };



    // Update project details in frontend
    const handleUpdateProject = (updatedProject: Project) => {
        setProjects(prevProjects =>
            prevProjects.map(project =>
                project.id === updatedProject.id
                    ? { ...project, ...updatedProject }
                    : project
            )
        );

        if (currentProject && currentProject.id === updatedProject.id) {
            setCurrentProject(updatedProject);
        }
    };



    // Delete project from frontend
    const handleDeleteProject = (projectId: string) => {
        setProjects(prevProjects =>
            prevProjects.filter(project => project.id !== projectId)
        );
    };



    //Update task in frontend
    const handleUpdateTask = (updatedTask: Task) => {
        if (!currentProject || !currentProject.tasks) return;  // Add this check

        const updatedProjects = projects.map(project =>
            project.id === updatedTask.projectId
                ? {
                    ...project,
                    tasks: project.tasks.map(task =>
                        task.id === updatedTask.id
                            ? { ...task, ...updatedTask }
                            : task
                    )
                }
                : project
        );
        setProjects(updatedProjects);

        if (currentProject.id === updatedTask.projectId) {
            const updatedCurrentProject = {
                ...currentProject,
                tasks: currentProject.tasks.map(task =>
                    task.id === updatedTask.id ? { ...task, ...updatedTask } : task
                )
            };
            setCurrentProject(updatedCurrentProject);
        }
    };


    //Delete task from frontend
    const handleDeleteTask = (taskId: string, projectId: string) => {
        if (!projects) return; // Check that projects is defined

        const updatedProjects = projects.map(project => {
            if (project.id === projectId) {
                return {
                    ...project,
                    tasks: project.tasks.filter(task => task.id !== taskId) // Remove the task by id
                };
            }
            return project;
        });

        setProjects(updatedProjects);

        if (currentProject?.id === projectId && currentProject.tasks) {
            const updatedProject = {
                ...currentProject,
                tasks: currentProject.tasks.filter(task => task.id !== taskId)
            };
            setCurrentProject(updatedProject);
        }
    };


    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600 font-medium">Loading project details...</p>
                </div>
            </div>
        );
    }

    if (!currentProject) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8 bg-white rounded-xl shadow-lg">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Project Not Found</h2>
                    <p className="text-gray-600 mb-4">The project you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                    <Link
                        href="/application/project-management"
                        className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                    >
                        Return to Projects
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <div className="mb-8">
                    <Link
                        href="/application/project-management"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Projects
                    </Link>
                </div>

                {/* Project Header */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 md:p-8">
                        <div className="flex items-center space-x-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
                                {currentProject.status}
                            </span>
                            <span className="text-blue-100 text-sm">Project ID: {currentProject.id}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">{currentProject.name}</h1>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Description Section - with fixed height to match timeline+status cards */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg h-full">
                            <div className="p-5 border-b border-gray-100">
                                <div className="flex items-center">
                                    <FileText className="w-6 h-6 text-blue-600 mr-3" />
                                    <h2 className="text-2xl font-bold text-gray-800">Description</h2>
                                </div>
                            </div>
                            <div className="p-5 h-full overflow-y-auto">
                                <div className="prose max-w-none text-gray-700">
                                    {currentProject.description ? (
                                        <p className="leading-relaxed break-words text-justify">{currentProject.description}</p>
                                    ) : (
                                        <p className="text-gray-500 italic text-justify">No description provided.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timeline & Status Cards */}
                    <div className="space-y-4">
                        {/* Contractor Card - NEW */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="border-b border-gray-100 p-5">
                                <div className="flex items-center">
                                    <User className="w-5 h-5 text-blue-600 mr-3" />
                                    <h3 className="text-xl font-bold text-gray-800">Assigned Contractor</h3>
                                </div>
                            </div>
                            {contractor ? (
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="mr-4">
                                            <img
                                                src={contractor.image}
                                                alt={contractor.name}
                                                className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-800">{contractor.name}</h4>

                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-5">
                                    <p className="text-gray-500 italic">No contractor assigned</p>
                                </div>
                            )}
                        </div>

                        {/* Timeline Card */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="border-b border-gray-100 p-5">
                                <h3 className="text-xl font-bold text-gray-800">Timeline</h3>
                            </div>
                            <div className="p-5 space-y-3">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                        <Calendar className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Start Date</p>
                                        <p className="text-gray-800 font-semibold">{currentProject.startDate.toLocaleDateString('en-US', {
                                            weekday: 'short',
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                        <Calendar className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">End Date</p>
                                        <p className="text-gray-800 font-semibold">{currentProject.endDate.toLocaleDateString('en-US', {
                                            weekday: 'short',
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                        <Clock className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Time Remaining</p>
                                        <p className="text-gray-800 font-semibold">
                                            {calculateRemainingDays()} days remaining
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Status Card */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="border-b border-gray-100 p-5">
                                <h3 className="text-xl font-bold text-gray-800">Status</h3>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                        <CheckCircle className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Current Status</p>
                                        <div className="flex items-center mt-1">
                                            <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor()}`}>
                                                {currentProject.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Add Subtask Button */}
                        <div>
                            <div className="p-5">
                                <button
                                    onClick={() => setShowSubtaskForm(true)}
                                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-md hover:from-green-500 hover:to-blue-600 transition-all shadow-md"
                                >
                                    <Plus className="w-5 h-5" />
                                    <span>Add Subtask</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gantt Chart / Timeline Section */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                    <div className="border-b border-gray-100 p-5">
                        <h2 className="text-2xl font-bold text-gray-800">Project Timeline</h2>
                    </div>
                    <div className="p-5">
                        <GanttChart
                            projects={projects}
                            onProjectToggle={handleProjectToggle}
                            onUpdateTask={handleUpdateTask}
                            onDeleteTask={handleDeleteTask}
                            onUpdateProject={handleUpdateProject}
                            onDeleteProject={handleDeleteProject}
                            selectedProjectId={projectId}
                        />
                    </div>
                </div>

                {/* Subtask Form Modal */}
                {showSubtaskForm && (
                    <div>
                        <SubtaskForm onSubmit={handleAddSubtask} onCancel={() => setShowSubtaskForm(false)} />
                    </div>
                )}
            </div>
        </div>
    );
}
