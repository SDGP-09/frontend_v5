'use client';

import { ChevronDown, ChevronRight, Pencil, Trash } from 'lucide-react';
import { Project } from '@/app/types/project';

interface GanttChartProps {
    projects: Project[];
    timelineUnits: string[];
    timelineWidth: string;
    useMonths: boolean;
    earliestDate: Date;
    toggleProject: (projectId: string) => void;
    getProjectPosition: (startDate: Date) => string;
    getProjectWidth: (startDate: Date, endDate: Date) => string;
}

export function GanttChart({
                               projects,
                               timelineUnits,
                               timelineWidth,
                               useMonths,
                               toggleProject,
                               getProjectPosition,
                               getProjectWidth,
                           }: GanttChartProps) {
    return (
        <div className="relative border rounded-lg shadow-sm overflow-x-auto">
            <div className="inline-block min-w-full">
                {/* Header */}
                <div className="sticky top-0 z-50 bg-white border-b flex">
                    {/* Projects header - fixed left */}
                    <div className="fixed w-64 flex-shrink-0 p-4 font-semibold bg-white border-r z-50">
                        Projects
                    </div>
                    {/* Spacer for fixed Projects header */}
                    <div className="w-64 flex-shrink-0" />
                    {/* Timeline headers - scrollable */}
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

                {/* Projects */}
                <div>
                    {projects.map(project => (
                        <div key={project.id}>
                            {/* Project Row */}
                            <div className="flex group hover:bg-gray-50">
                                <div className="sticky left-0 w-64 flex-shrink-0 p-4 border-r bg-white z-40 flex items-center justify-between">
                                    <div className="flex items-center space-x-2 flex-1">
                                        <button
                                            onClick={() => toggleProject(project.id)}
                                            className="p-1 hover:bg-gray-200 rounded"
                                        >
                                            {project.expanded ? (
                                                <ChevronDown className="w-4 h-4" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4" />
                                            )}
                                        </button>
                                        <div className="flex-1">
                                            <div className="text-sm font-medium">{project.name}</div>
                                            <div className="text-xs text-gray-500">{project.contractor}</div>
                                        </div>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                                        <button className="p-1 hover:bg-gray-200 rounded mr-1">
                                            <Pencil className="w-4 h-4" />
                                        </button>
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
                                                left: getProjectPosition(project.startDate),
                                                width: getProjectWidth(project.startDate, project.endDate),
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
                                            <span className="text-sm">{task.name}</span>
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                                            <button className="p-1 hover:bg-gray-200 rounded mr-1">
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button className="p-1 hover:bg-gray-200 rounded">
                                                <Trash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{ width: timelineWidth }}>
                                        <div className="relative" style={{ height: '3.5rem' }}>
                                            <div
                                                className="absolute top-1/2 -translate-y-1/2 h-6 rounded-lg bg-gradient-to-r from-green-400/40 to-blue-500/40 shadow-sm cursor-pointer hover:brightness-110 transition-all"
                                                style={{
                                                    left: getProjectPosition(task.startDate),
                                                    width: getProjectWidth(task.startDate, task.endDate),
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
