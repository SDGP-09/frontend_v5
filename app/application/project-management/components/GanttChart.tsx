'use client';

import { ChevronDown, ChevronRight, Trash, Pencil,X, Image as ImageIcon } from 'lucide-react';
import { Project,Task,ProjectImage} from '@/app/types/project';
import Link from 'next/link';
import { useEffect, useState ,useRef} from 'react';
import { v4 as uuidv4 } from 'uuid';




interface GanttChartProps {
    projects: Project[];
    onProjectToggle?: (projectId: string) => void;
    selectedProjectId?: string;
    onUpdateProject?: (project: Project) => void;
    onDeleteProject?: (projectId: string) => void;
    onUpdateTask?: (task: Task) => void;
    onDeleteTask?: (taskId: string, projectId: string) => void;
}

export function GanttChart({
                               projects,
                               onProjectToggle,
                               selectedProjectId,
                               onUpdateProject,
                               onDeleteProject,
                               onUpdateTask,
                               onDeleteTask
                           }: GanttChartProps) {
    const [timelineUnits, setTimelineUnits] = useState<string[]>([]);
    const [timelineWidth, setTimelineWidth] = useState('');
    const [useMonths, setUseMonths] = useState(false);
    const [earliestDate, setEarliestDate] = useState(new Date());

    // State for edit/delete modals
    const [editProjectModalOpen, setEditProjectModalOpen] = useState(false);
    const [editTaskModalOpen, setEditTaskModalOpen] = useState(false);
    const [deleteProjectModalOpen, setDeleteProjectModalOpen] = useState(false);
    const [deleteTaskModalOpen, setDeleteTaskModalOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState<Project| null>(null);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);

    //  state for contractor selection
    const [contractors, setContractors] = useState<{ id: number; name: string }[]>([]);
    const [contractorQuery, setContractorQuery] = useState('');
    const [selectedContractor, setSelectedContractor] = useState<number | null>(null);

    //state for images
    const [projectImages, setProjectImages] = useState<ProjectImage[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);



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


    // Fetch contractors
    const fetchContractors = async (query: string) => {
        if (query.length < 2) {
            setContractors([]); // Hide dropdown if query is too short
            return;
        }
        // Temporary mock data - same as in MainForm
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



    const handleImageUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };


    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        Array.from(files).forEach(file => {
            const newImage: ProjectImage = {
                id: uuidv4(),
                url: URL.createObjectURL(file),
            };
            setProjectImages(prevImages => [...prevImages, newImage]); // Add new images
        });

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };



    const handleRemoveImage = (id: string) => {
        setProjectImages(prevImages => prevImages.filter(image => image.id !== id));
    };




    // open modal to edit project
    const handleEditProject = (project: Project) => {
        setCurrentProject({
            id: project.id,
            name: project.name,
            startDate: project.startDate,
            endDate: project.endDate,
            status: project.status,
            description: project.description,
            tasks: project.tasks,
            expanded: project.expanded,
            contractorId: project.contractorId,
            images:project.images|| []
        });
        setProjectImages(project.images || []);

        // Set contractor query to the contractor name if available
        if (project.contractorId) {
            // In a real app, you'd fetch the contractor name from the ID
            const mockContractors = [
                { id: 1, name: "John Doe" },
                { id: 2, name: "Jane Smith" },
                { id: 3, name: "Michael Johnson" }
            ];

            const contractor = mockContractors.find(c => c.id === project.contractorId);
            if (contractor) {
                setContractorQuery(contractor.name);
            }
            setSelectedContractor(project.contractorId);
        } else {
            setContractorQuery('');
            setSelectedContractor(null);
        }

        setEditProjectModalOpen(true);
    };



    // Save updated project data (API)
    const handleProjectUpdate = () => {
        if (currentProject && onUpdateProject) {
            // Include the selected contractor ID in the update
            onUpdateProject({
                ...currentProject,
                contractorId: selectedContractor || currentProject.contractorId,
                images: projectImages
            });
        }
        setEditProjectModalOpen(false);
    };





    // open modal to Delete project
    const handleDeleteProject = (project: Project) => {
        setCurrentProject({
            id: project.id,
            name: project.name,
            startDate: project.startDate,
            endDate: project.endDate,
            status: project.status,
            description: project.description,
            tasks: project.tasks,
            expanded: project.expanded,
            contractorId: project.contractorId
        });
        setDeleteProjectModalOpen(true);
    };



    //delete project confirm (API)
    const confirmDeleteProject = () => {
        if (currentProject && onDeleteProject) {
            onDeleteProject(currentProject.id);
        }
        setDeleteProjectModalOpen(false);
    };



    // open modal to edit task
    const handleEditTask = (task: Task, projectId: string) => {
        setCurrentTask({
            id: task.id,
            projectId: projectId,
            name: task.name,
            startDate: new Date(task.startDate),
            endDate: new Date(task.endDate),
            status: task.status ?? 'New',
            description: task.description ?? ''
        });
        setEditTaskModalOpen(true);
    };

    //save updated task details(API)
    const handleTaskUpdate = () => {
        if (currentTask && onUpdateTask) {
            onUpdateTask(currentTask);
        }
        setEditTaskModalOpen(false);
    };


    // open modal to Delete task
    const handleDeleteTask = (task: Task, projectId: string) => {
        setCurrentTask({
            id: task.id,
            projectId: projectId,
            name: task.name,
            startDate: new Date(task.startDate),
            endDate: new Date(task.endDate),
            status:task.status ?? 'New',
            description:  task.description ?? ''
        });
        setDeleteTaskModalOpen(true);
    };

    //delete task confirm(API)
    const confirmDeleteTask = () => {
        if (currentTask && onDeleteTask) {
            onDeleteTask(currentTask.id, currentTask.projectId);
        }
        setDeleteTaskModalOpen(false);
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
                                                href={`/application/project-management/${project.id}`}
                                                className="text-sm font-medium hover:text-blue-600 transition-colors"
                                            >
                                                {project.name}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                                        <button
                                            className="p-1 hover:bg-gray-200 rounded mr-1"
                                            onClick={() => handleEditProject(project)}
                                        >
                                            <Pencil className="w-4 h-4"/>
                                        </button>
                                        <button
                                            className="p-1 hover:bg-gray-200 rounded"
                                            onClick={() => handleDeleteProject(project)}
                                        >
                                            <Trash className="w-4 h-4"/>
                                        </button>
                                    </div>
                                </div>
                                <div style={{width: timelineWidth}}>
                                    <div className="relative" style={{height: '3.5rem' }}>
                                        <div
                                            className={`absolute top-1/2 -translate-y-1/2 h-8 rounded-lg shadow-md cursor-pointer hover:brightness-110 transition-all ${
                                                project.status === 'Completed'
                                                    ? 'bg-gradient-to-r from-green-400 to-blue-500'
                                                    : project.status === 'In Progress'
                                                        ? 'bg-gradient-to-r from-green-400 to-blue-500'
                                                        : 'bg-gradient-to-r from-green-300 to-blue-300'
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
                                            <Link
                                                href={`/application/project-management/Task/${task.id}`}
                                                className="text-sm cursor-pointer hover:text-blue-600 transition-colors"
                                            >
                                                {task.name}
                                            </Link>

                                       </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                                            <button
                                                className="p-1 hover:bg-gray-200 rounded mr-1"
                                                onClick={() => handleEditTask(task, project.id)}
                                            >
                                                <Pencil className="w-4 h-4"/>
                                            </button>
                                            <button
                                                className="p-1 hover:bg-gray-200 rounded mr-1"
                                                onClick={() => handleDeleteTask(task, project.id)}
                                            >
                                                <Trash className="w-4 h-4"/>
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{width: timelineWidth}}>
                                        <div className="relative" style={{ height: '3.5rem' }}>
                                            <div
                                                className={`absolute top-1/2 -translate-y-1/2 h-6 rounded-lg shadow-sm cursor-pointer hover:brightness-110 transition-all ${
                                                    task.status === 'Completed'
                                                        ? 'bg-gradient-to-r from-green-400 to-blue-500'
                                                        : task.status === 'In Progress'
                                                            ? 'bg-gradient-to-r from-green-400 to-blue-500'
                                                            : 'bg-gradient-to-r from-green-300 to-blue-300'
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



            {/* Edit Project Modal */}
            {editProjectModalOpen && currentProject && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-xl max-h-[90vh] overflow-y-auto">
                        <h3 className="text-2xl font-bold mb-4 text-black text-center">Edit Project</h3>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleProjectUpdate();
                        }}>
                            {/* Project Name */}
                            <div className="mb-1">
                                <label className="block text-sm font-medium mb-1 text-black">Project Name</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                                    value={currentProject.name}
                                    onChange={(e) => setCurrentProject({...currentProject, name: e.target.value})}
                                    placeholder="Enter project name"
                                />
                            </div>

                            {/* Start and End Date */}
                            <div className="grid grid-cols-2 gap-6 mb-1">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-black">Start Date</label>
                                    <input
                                        type="date"
                                        className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                                        value={currentProject.startDate.toISOString().split('T')[0]}
                                        onChange={(e) => setCurrentProject({
                                            ...currentProject,
                                            startDate: new Date(e.target.value)
                                        })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-black">End Date</label>
                                    <input
                                        type="date"
                                        className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                                        value={currentProject.endDate.toISOString().split('T')[0]}
                                        onChange={(e) => setCurrentProject({
                                            ...currentProject,
                                            endDate: new Date(e.target.value)
                                        })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-1">
                                {/* Status Dropdown */}
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-black">Status</label>
                                    <select
                                        className="w-full p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-gray-600"
                                        value={currentProject.status}
                                        onChange={(e) => setCurrentProject({...currentProject, status: e.target.value as "New" | "In Progress" | "Completed"})}>
                                        <option value="New">New</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>

                                {/* Contractor Selection */}
                                <div className="mb-1 relative">
                                    <label className="block text-sm font-medium mb-1 text-black">Assign Contractor</label>
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
                                <label className="block text-sm font-medium mb-2 text-black">Project Description</label>
                                <textarea
                                    className="w-full p-3 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
                                    rows={4}
                                    placeholder="Enter a brief project description"
                                    value={currentProject.description || ""}
                                    onChange={(e) => setCurrentProject({
                                        ...currentProject,
                                        description: e.target.value
                                    })}
                                />
                            </div>

                            {/* Project Images */}
                            <div className="mb-5">
                                <label className="block text-sm font-medium mb-2 text-black">Project Images</label>

                                <div
                                    onClick={handleImageUploadClick}
                                    className="w-full p-6 h-40 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-50 transition flex flex-col items-center justify-center gap-2 relative"
                                >
                                    {/* Display Uploaded Images */}
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

                                    {/* Small Attachment Icon in Bottom Right */}
                                    <div className="absolute bottom-2 right-2 text-gray-500">
                                        <ImageIcon className="w-5 h-5"/>
                                    </div>

                                    {/* File Input */}
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
                                    onClick={() => setEditProjectModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:from-green-500 hover:to-blue-600 focus:outline-none"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {/* Delete Project Modal */}
            {deleteProjectModalOpen && currentProject && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Delete Project</h3>
                        <p>Are you sure you want to delete
                            project &quot;{currentProject?.name ?? "this project"}&quot;? This action cannot be undone.</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                                onClick={() => setDeleteProjectModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                onClick={confirmDeleteProject}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* Edit Task Modal */}
            {editTaskModalOpen && currentTask && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-lg sm:max-w-md">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Edit Task</h3>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleTaskUpdate();
                        }}>
                            {/* Task Name */}
                            <div className="mb-1">
                                <label className="block text-sm font-medium mb-1 text-gray-700">Task Name</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    value={currentTask.name}
                                    placeholder="Enter task name"
                                    onChange={(e) => setCurrentTask({...currentTask, name: e.target.value})}
                                />
                            </div>

                            {/* Date Inputs (Start Date & End Date) */}
                            <div className="grid grid-cols-2 gap-6 mb-1">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700">Start Date</label>
                                    <input
                                        type="date"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                        value={currentTask.startDate.toISOString().split('T')[0]}
                                        onChange={(e) => setCurrentTask({
                                            ...currentTask,
                                            startDate: new Date(e.target.value)
                                        })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700">End Date</label>
                                    <input
                                        type="date"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                        value={currentTask.endDate.toISOString().split('T')[0]}
                                        onChange={(e) => setCurrentTask({
                                            ...currentTask,
                                            endDate: new Date(e.target.value)
                                        })}
                                    />
                                </div>
                            </div>

                            {/* Task Status */}
                            <div className="mb-1">
                                <label className="block text-sm font-medium mb-1 text-gray-700">Status</label>
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    value={currentTask.status}
                                    onChange={(e) => setCurrentTask({...currentTask, status: e.target.value as "New" | "In Progress" | "Completed"})}

                                >
                                    <option value="New">New</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>

                            {/* Description */}
                            <div className="mb-5">
                                <label className="block text-sm font-medium mb-2 text-gray-700">Task Description</label>
                                <textarea
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    rows={4}
                                    placeholder="Enter a brief task description.."
                                    value={currentTask.description}
                                    onChange={(e) => setCurrentTask({...currentTask, description: e.target.value})}
                                ></textarea>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none"
                                    onClick={() => setEditTaskModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg  hover:from-green-500 hover:to-blue-600 focus:outline-none"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            )}

            {/* Delete Task Modal */}
            {deleteTaskModalOpen && currentTask && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Delete Task</h3>
                        <p>Are you sure you want to delete
                            project &quot;{currentTask?.name ?? "this project"}&quot;? This action cannot be
                            undone.</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                                onClick={() => setDeleteTaskModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                onClick={confirmDeleteTask}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}