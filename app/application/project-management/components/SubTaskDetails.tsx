import { useState, useEffect } from 'react';
import { Task, Project } from '@/app/types/project';
import Link from 'next/link';
import { ArrowLeft, Calendar, CheckCircle, Clock } from 'lucide-react';

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
                projectId: 'project-1',
                name: 'Sample Task',
                startDate: new Date(),
                endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                status: 'In Progress',
                description: ' This task involves planning, tracking, and managing the project\'s key milestones to ensure timely completion. It includes setting deadlines, assigning responsibilities, and monitoring progress. Regular updates and communication among team members are essential to identify risks and make necessary adjustments.' +
                    ' The task also involves maintaining documentation, ensuring compliance with project requirements, and optimizing workflow efficiency. ' +
                    'Collaboration tools and Gantt charts will be used to visualize project timelines and dependencies. Continuous evaluation and reporting will help improve decision-making and project execution. Successful completion of this task will contribute to the overall success and smooth execution of the project. ',
            };

            const mockProject: Project = {
                id: 'project-1',
                name: 'Sample Project1',
                status: 'In Progress',
                startDate: new Date(),
                endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
                description: 'Creating a mobile application with an intuitive design and robust functionality.',
                tasks: [mockTask],
                expanded: true,
            };

            setTask(mockTask);
            setParentProject(mockProject);
            setLoading(false);
        }, 500);
    }, [taskId]);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center ">
                <div className="animate-pulse text-gray-500 text-lg">Loading task details...</div>
            </div>
        );
    }

    if (!task) {
        return <div className="h-screen flex items-center justify-center text-red-500 text-lg">Task not found</div>;
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed':
                return 'bg-green-100 text-green-800';
            case 'In Progress':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const calculateTimeRemaining = () => {
        const today = new Date();
        const endDate = new Date(task.endDate);
        const daysRemaining = Math.floor((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        if (task.status === 'Completed') {
            return 'Task completed';
        } else if (daysRemaining < 0) {
            return `${Math.abs(daysRemaining)} days overdue`;
        } else if (daysRemaining === 0) {
            return 'Due today';
        } else {
            return `${daysRemaining} days remaining`;
        }
    };

    return (
        <div className="h-screen flex flex-col bg-gray-50 p-8">
            {/* Back Button */}
            <Link
                href={parentProject ? `/application/project-management/${parentProject.id}` : '/application/project-management'}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Project
            </Link>

            {/* Task Header */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-800">{task.name}</h1>
                <div className="flex items-center gap-3 mt-3">
                   <span
                       className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(task.status ?? 'Unknown')}`}>

                        {task.status}
                    </span>
                    {parentProject && (
                        <Link
                            href={`/application/project-management/${parentProject.id}`}
                            className="px-4 py-2 rounded-full bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200"
                        >
                            {parentProject.name}
                        </Link>
                    )}
                </div>
            </div>

            {/* Task Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
                {/* Description Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description</h2>
                        <p className="text-gray-700 leading-relaxed">{task.description || 'No description provided.'}</p>
                    </div>
                </div>

                {/* Timeline & Status */}
                <div className="space-y-6">
                    {/* Timeline */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Timeline</h3>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Calendar className="w-6 h-6 text-gray-500 mr-3" />
                                <div>
                                    <p className="text-gray-500 text-sm">Start Date</p>
                                    <p className="text-gray-800 font-medium">{new Date(task.startDate).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-6 h-6 text-gray-500 mr-3" />
                                <div>
                                    <p className="text-gray-500 text-sm">End Date</p>
                                    <p className="text-gray-800 font-medium">{new Date(task.endDate).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-6 h-6 text-gray-500 mr-3" />
                                <div>
                                    <p className="text-gray-500 text-sm">Time Remaining</p>
                                    <p className="text-gray-800 font-medium">{calculateTimeRemaining()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Status</h3>
                        <div className="flex items-center">
                            <CheckCircle className={`w-6 h-6 mr-3 ${task.status === 'Completed' ? 'text-green-500' : 'text-blue-500'}`} />
                            <div>
                                <p className="text-gray-500 text-sm">Current Status</p>
                                <p className="text-gray-800 font-medium">{task.status}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
