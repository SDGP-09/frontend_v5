'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Check, X } from 'lucide-react';
import { SubtaskForm } from './SubtaskForm';
import { Task, Project } from '@/app/types/project';
import { GanttChart } from './GanttChart';

interface TaskDetailsProps {
    projectId: string;
}

export function TaskDetails({ projectId }: TaskDetailsProps) {
    const [showSubtaskForm, setShowSubtaskForm] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);

    const [editingField, setEditingField] = useState<keyof Project | null>(null);
    const [editValue, setEditValue] = useState<string | Date>('');

    // Simulated API call
    useEffect(() => {
        const project: Project = {
            id: projectId,
            name: 'Sample Project',
            status: 'In Progress' as const,
            startDate: new Date(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            description: 'This is a sample project description',
            contractor: 'John Construction Co.',
            tasks: [],
            expanded: true,
        };

        setCurrentProject(project);
        setProjects([project]);
    }, [projectId]);

    const handleAddSubtask = (subtask: Task) => {
        if (!currentProject) return;

        const updatedProject = {
            ...currentProject,
            tasks: [...currentProject.tasks, subtask],
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

    const startEditing = (field: keyof Project, value: string | Date) => {
        setEditingField(field);
        setEditValue(value);
    };

    const saveEdit = () => {
        if (!currentProject || !editingField) return;

        const updatedProject = {
            ...currentProject,
            [editingField]: editValue,
        };

        setCurrentProject(updatedProject);
        setProjects(projects.map(p => (p.id === projectId ? updatedProject : p)));

        setEditingField(null);
        setEditValue('');
    };

    const cancelEditing = () => {
        setEditingField(null);
        setEditValue('');
    };

    const renderEditableField = (field: keyof Project, label: string, value: string | Date) => {
        const displayValue = value instanceof Date ? value.toLocaleDateString() : value;

        return (
            <div className="flex justify-between items-center">
                <div className="w-full">
                    <h2 className="text-lg font-semibold">{label}</h2>
                    {editingField === field ? (
                        field === 'description' ? (
                            <textarea
                                className="border px-2 py-1 rounded-md w-full resize-none max-w-full h-48"
                                value={editValue as string}
                                onChange={(e) => setEditValue(e.target.value)}
                            />
                        ) : (
                            <input
                                type={field.includes('Date') ? 'date' : 'text'}
                                className="border px-2 py-1 rounded-md w-full"
                                value={field.includes('Date') ? new Date(editValue as string).toISOString().split('T')[0] : (editValue as string)}
                                onChange={(e) => setEditValue(field.includes('Date') ? new Date(e.target.value) : e.target.value)}
                            />
                        )
                    ) : (
                        <div
                            className="text-gray-600 w-full overflow-hidden whitespace-pre-wrap break-words"
                            style={{ wordWrap: 'break-word' }}
                        >
                            {displayValue}
                        </div>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    {editingField === field ? (
                        <>
                            <button onClick={saveEdit} className="text-green-500 hover:text-green-700">
                                <Check className="w-5 h-5" />
                            </button>
                            <button onClick={cancelEditing} className="text-red-500 hover:text-red-700">
                                <X className="w-5 h-5" />
                            </button>
                        </>
                    ) : (
                        <button onClick={() => startEditing(field, value)} className="text-gray-500">
                            <Pencil className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
        );
    };

    if (!currentProject) return null;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
                    {currentProject.name}
                </h1>
                <button
                    onClick={() => setShowSubtaskForm(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-md hover:from-green-500 hover:to-blue-600 transition-all shadow-md"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Subtask</span>
                </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                    {renderEditableField('status', 'Status', currentProject.status)}
                    {renderEditableField('contractor', 'Contractor', currentProject.contractor)}
                    {renderEditableField('description', 'Description', currentProject.description)}
                </div>
                <div className="space-y-4">
                    {renderEditableField('startDate', 'Start Date', currentProject.startDate)}
                    {renderEditableField('endDate', 'End Date', currentProject.endDate)}
                </div>
            </div><br /><br /><br />

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Timeline</h2>
                <GanttChart
                    projects={projects}
                    onProjectToggle={handleProjectToggle}
                    selectedProjectId={projectId}
                />
            </div>

            {showSubtaskForm && (
                <SubtaskForm onSubmit={handleAddSubtask} onCancel={() => setShowSubtaskForm(false)} />
            )}
        </div>
    );
}
