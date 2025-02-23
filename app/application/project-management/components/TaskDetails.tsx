'use client';

import { ChevronDown, ChevronRight, Trash } from 'lucide-react';
import { Project, Task } from '@/app/types/project';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface GanttChartProps {
    projects: Project[];
    onProjectToggle?: (projectId: string) => void;
    onProjectUpdate?: (project: Project) => void;
    onTaskUpdate?: (projectId: string, task: Task) => void;
    onTaskDelete?: (projectId: string, taskId: string) => void; // Added callback for deleting tasks
    selectedProjectId?: string;
}

export function GanttChart({
                               projects,
                               onProjectToggle,
                               onProjectUpdate,
                               onTaskUpdate,
                               onTaskDelete,
                               selectedProjectId
                           }: GanttChartProps) {
    const [timelineUnits, setTimelineUnits] = useState<string[]>([]);
    const [timelineWidth, setTimelineWidth] = useState('');
    const [useMonths, setUseMonths] = useState(false);
    const [earliestDate, setEarliestDate] = useState(new Date());

    // Helper functions
    const daysBetween = (date1: Date, date2: Date) => {
        return Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));
    };

    const monthsBetween = (date1: Date, date2: Date) => {
        return (
            (date2.getFullYear() - date1.getFullYear()) * 12 +
            date2.getMonth() - date1.getMonth()
        );
    };

    const getEarliestDate = (projects: Project[]) => {
        if (projects.length === 0) return new Date();
        const projectDates = projects.map(p => p.startDate.getTime());
        const taskDates = projects.flatMap(p =>
            p.tasks.map(t => new Date(t.startDate).getTime())
        );
        return new Date(Math.min(...projectDates, ...taskDates));
    };

    const getLatestDate = (projects: Project[]) => {
        if (projects.length === 0) {
            const date = new Date();
            date.setDate(date.getDate() + 30);
            return date;
        }
        const projectDates = projects.map(p => p.endDate.getTime());
        const taskDates = projects.flatMap(p =>
            p.tasks.map(t => new Date(t.endDate).getTime())
        );
        return new Date(Math.max(...projectDates, ...taskDates));
    };

    const getPosition = (startDate: Date) => {
        if (useMonths) {
            const months = monthsBetween(earliestDate, startDate);
            return `${months * 10}rem`;
        }
        const days = daysBetween(earliestDate, startDate);
        return `${days * 5}rem`;
    };

    const getWidth = (startDate: Date, endDate: Date) => {
        if (useMonths) {
            const duration = monthsBetween(startDate, endDate) + 1;
            return `${duration * 10}rem`;
        }
        const duration = daysBetween(startDate, endDate);
        return `${duration * 5}rem`;
    };

    // Update timeline when projects change
    useEffect(() => {
        const earliest = getEarliestDate(projects);
        const latest = getLatestDate(projects);
        const totalDays = daysBetween(earliest, latest) + 1;
        const shouldUseMonths = totalDays > 60;

        setUseMonths(shouldUseMonths);
        setEarliestDate(earliest);

        const units = shouldUseMonths
            ? Array.from(
                { length: monthsBetween(earliest, latest) + 1 },
                (_, i) => {
                    const date = new Date(earliest);
                    date.setMonth(date.getMonth() + i);
                    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
                }
            )
            : Array.from(
                { length: totalDays },
                (_, i) => {
                    const date = new Date(earliest);
                    date.setDate(date.getDate() + i);
                    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                }
            );

        setTimelineUnits(units);
        setTimelineWidth(shouldUseMonths ? `${units.length * 10}rem` : `${units.length * 5}rem`);
    }, [projects]);

    const handleProjectToggle = (projectId: string) => {
        onProjectToggle?.(projectId);
    };

    const handleTaskDelete = (projectId: string, taskId: string) => {
        // Here the delete callback is triggered with the respective project and task IDs.
        onTaskDelete?.(projectId, taskId);
    };

    return (
        <div className="relative border rounded-lg shadow-sm overflow-x-auto">
            <div className="inline-block min-w-full">
                {/* Header */}
                <div className="sticky top-0 z-50 bg-white border-b flex">
                    <div className="sticky left-0 w-64 flex-shrink-0 p-4 font-semibold bg-white">
                        Projects
                    </div>
                    <div className="inline-flex" style={{ width: timelineWidth }}>
                        {timelineUnits.map((unit) => (
                            <div
                                key={unit}
                                className={`font-semibold bg-white border-r text-center whitespace-nowrap ${
                                    useMonths ? 'w-40' : 'w-20'
                                } p-4`}
                            >
                                {unit}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Projects and Tasks */}
                <div>
                    {projects.map(project => (
                        <div key={project.id} className={`${selectedProjectId === project.id ? 'bg-blue-50' : ''}`}>
                            {/* Project Row */}
                            <div className="flex group hover:bg-gray-50">
                                <div className="sticky left-0 w-64 flex-shrink-0 p-4 border-r bg-white z-40 flex items-center justify-between">
                                    <div className="flex items-center space-x-2 flex-1">
                                        <button
                                            onClick={() => handleProjectToggle(project.id)}
                                            className="p-1 hover:bg-gray-200 rounded"
                                        >
                                            {project.expanded ? (
                                                <ChevronDown className="w-4 h-4" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4" />
                                            )}
                                        </button>
                                        <div className="flex-1">
                                            <Link
                                                href={`/project/${project.id}`}
                                                className="text-sm font-medium hover:text-blue-600 transition-colors"
                                            >
                                                {project.name}
                                            </Link>
                                            <div className="text-xs text-gray-500">{project.contractor}</div>
                                        </div>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                                        <button className="p-1 hover:bg-gray-200 rounded">
                                            <Trash className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <div style={{ width: timelineWidth }}>
                                    <div className="relative" style={{ height: '3.5rem' }}>
                                        <div
                                            className={`absolute top-1/2 -translate-y-1/2 h-8 rounded-lg shadow-md cursor-pointer hover:brightness-110 transition-all ${
                                                project.status === 'Completed'
                                                    ? 'bg-gradient-to-r from-green-400 to-blue-500'
                                                    : project.status === 'In Progress'
                                                        ? 'bg-gradient-to-r from-green-400 to-blue-500'
                                                        : 'bg-gradient-to-r from-gray-300 to-gray-400'
                                            }`}
                                            style={{
                                                left: getPosition(project.startDate),
                                                width: getWidth(project.startDate, project.endDate),
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Tasks */}
                            {project.expanded && project.tasks.map(task => (
                                <div key={task.id} className="flex group hover:bg-gray-50/80">
                                    <div className="sticky left-0 w-64 flex-shrink-0 p-4 border-r bg-gray-50 z-40 flex items-center justify-between">
                                        <div className="flex items-center space-x-2 pl-8 flex-1">
                            <span className="text-sm cursor-pointer hover:text-blue-600 transition-colors">
                              {task.name}
                            </span>
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                                            <button
                                                className="p-1 hover:bg-gray-200 rounded mr-1"
                                                onClick={() => handleTaskDelete(project.id, task.id)} // Calling the delete handler
                                            >
                                                <Trash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{ width: timelineWidth }}>
                                        <div className="relative" style={{ height: '3.5rem' }}>
                                            <div
                                                className={`absolute top-1/2 -translate-y-1/2 h-6 rounded-lg shadow-sm cursor-pointer hover:brightness-110 transition-all ${
                                                    task.status === 'Completed'
                                                        ? 'bg-gradient-to-r from-green-400/80 to-blue-500/80'
                                                        : task.status === 'In Progress'
                                                            ? 'bg-gradient-to-r from-yellow-400/80 to-orange-500/80'
                                                            : 'bg-gradient-to-r from-gray-300/80 to-gray-400/80'
                                                }`}
                                                style={{
                                                    left: getPosition(new Date(task.startDate)),
                                                    width: getWidth(new Date(task.startDate), new Date(task.endDate)),
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
