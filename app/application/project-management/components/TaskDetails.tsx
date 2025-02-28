'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
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

    // Simulated API call
    useEffect(() => {
        const project: Project = {
            id: projectId,
            name: 'Sample Project',
            status: 'In Progress' as const,
            startDate: new Date(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            description: 'This is a sample project description',
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
                    <h2 className="text-lg font-semibold">Status</h2>
                    <div className="text-gray-600">{currentProject.status}</div>

                    <h2 className="text-lg font-semibold">Description</h2>
                    <div className="text-gray-600 whitespace-pre-wrap break-words">{currentProject.description}</div>
                </div>
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Start Date</h2>
                    <div className="text-gray-600">{currentProject.startDate.toLocaleDateString()}</div>

                    <h2 className="text-lg font-semibold">End Date</h2>
                    <div className="text-gray-600">{currentProject.endDate.toLocaleDateString()}</div>
                </div>
            </div>
            <br /><br /><br />

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Timeline</h2>
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

            {showSubtaskForm && (
                <SubtaskForm onSubmit={handleAddSubtask} onCancel={() => setShowSubtaskForm(false)} />
            )}
        </div>
    );
}
