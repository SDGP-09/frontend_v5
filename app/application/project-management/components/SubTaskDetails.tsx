'use client';

import { useState, useEffect } from 'react';
import { Task, Project } from '@/app/types/project';
import Link from 'next/link';
import { ArrowLeft, Calendar, CheckCircle, Clock, Briefcase, FileText } from 'lucide-react';
import { MaterialTable } from '@/app/application/project-management/components/Materialtable';

interface SubTaskDetailsProps {
    taskId: string;
}

export function SubTaskDetails({ taskId }: SubTaskDetailsProps) {
    const [task, setTask] = useState<Task | null>(null);
    const [parentProject, setParentProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTask(null);
        setParentProject(null);
        setLoading(true);

        setTimeout(() => {
            const mockTask: Task = {
                id: taskId,
                projectId: 'project1',
                name: 'Sample Task',
                startDate: new Date(),
                endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                status: 'In Progress',
                description:
                    'An apartment construction project involves building a residential complex consisting of multiple units designed for individual living. The project begins with planning and designing the structure, ensuring that the design meets zoning regulations, building codes, and the needs of future residents. Architects and engineers collaborate to create detailed blueprints that include the layout, materials, and utilities.\n' +
                    '\n' +
                    'The construction phase starts with site preparation, followed by the laying of foundations. The structure is built using concrete, steel, and other durable materials to ensure stability and safety. Once the framework is in place, workers install plumbing, electrical systems, and other essential infrastructure. Interior finishes, including flooring, walls, and fixtures, are added to complete the apartments.\n' +
                    '\n' +
                    'The final stages include landscaping and exterior finishing, ensuring the building is visually appealing and functional. After inspection and approval, the apartments are ready for occupancy, providing a comfortable and secure living environment for residents.',
            };

            const mockProject: Project = {
                id: 'project1',
                name: 'Sample Project1',
                status: 'In Progress',
                startDate: new Date(),
                endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
                description: 'Creating a mobile application with an intuitive design and robust functionality.',
                tasks: [mockTask],
                expanded: true,
                contractorId: 1,
            };

            setTask(mockTask);
            setParentProject(mockProject);
            setLoading(false);
        }, 500);
    }, [taskId]);

    // Calculate remaining days
    const calculateRemainingDays = () => {
        if (!task) return 0;

        const endDate = new Date(task.endDate);
        const today = new Date();
        const diffTime = endDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays > 0 ? diffDays : 0;
    };

    // Status badge color
    const getStatusColor = () => {
        if (!task) return 'bg-gray-200';

        switch(task.status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'In Progress': return 'bg-blue-100 text-blue-800';
            case 'New': return 'bg-yellow-100 text-yellow-800';

            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600 font-medium">Loading task details...</p>
                </div>
            </div>
        );
    }

    if (!task) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8 bg-white rounded-xl shadow-lg">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Task Not Found</h2>
                    <p className="text-gray-600 mb-4"> The task you&apos;re looking for doesn&apos;t exist or has been removed.</p>
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
                {/* Back Button & Project Info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <Link
                        href={parentProject ? `/application/project-management/${parentProject.id}` : '/application/project-management'}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Project
                    </Link>

                    {parentProject && (
                        <div className="mt-4 md:mt-0 flex items-center bg-white py-2 px-4 rounded-full shadow-sm">
                            <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
                            <span className="font-medium text-gray-700">{parentProject.name}</span>
                        </div>
                    )}
                </div>

                {/* Task Header */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 md:p-8">
                        <div className="flex items-center space-x-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
                                {task.status}
                            </span>

                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">{task.name}</h1>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Description Section */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="p-6 md:p-8">
                            <div className="flex items-center mb-6">
                                <FileText className="w-6 h-6 text-blue-600 mr-3" />
                                <h2 className="text-2xl font-bold text-gray-800">Description</h2>
                            </div>
                            <div className="prose max-w-none text-gray-700">
                                {task.description ? (
                                    <p className="leading-relaxed break-words text-justify">{task.description}</p>
                                ) : (
                                    <p className="text-gray-500 italic text-justify">No description provided.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Timeline & Status Cards */}
                    <div className="space-y-6">
                        {/* Timeline Card */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="border-b border-gray-100 p-5">
                                <h3 className="text-xl font-bold text-gray-800">Timeline</h3>
                            </div>
                            <div className="p-5 space-y-5">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                        <Calendar className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Start Date</p>
                                        <p className="text-gray-800 font-semibold">{new Date(task.startDate).toLocaleDateString('en-US', {
                                            weekday: 'short',
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                        <Calendar className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">End Date</p>
                                        <p className="text-gray-800 font-semibold">{new Date(task.endDate).toLocaleDateString('en-US', {
                                            weekday: 'short',
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                        <Clock className="w-6 h-6 text-blue-600" />
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
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                        <CheckCircle className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Current Status</p>
                                        <div className="flex items-center mt-1">
                                            <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor()}`}>
                                                {task.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Materials Table */}
                <div>
                    <MaterialTable />
                </div>
            </div>
        </div>
    );
}