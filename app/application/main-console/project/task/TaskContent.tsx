"use client"

import { useSearchParams, useParams } from "next/navigation";
import {useRouter} from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { Hash, FileTextIcon, PercentSquare, Link2, Pencil, Trash2, AlertCircle, Calendar, Clock } from 'lucide-react';
import ProjectLayout from "@/app/components/ProjectLayout";



export default function Task (){
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const [isDeleting, setIsDeleting] = useState(false);


    const task = {
        id: searchParams.get("id"),
        name: searchParams.get("name"),
        start: searchParams.get("start"),
        end: searchParams.get("end"),
        progress: searchParams.get("progress"),
        dependencies: searchParams.get("dependencies"),
        description: searchParams.get("description"),
    };

    const handleDelete = async () => {
        if (!task.id) return;

        try {
            setIsDeleting(true);
            await axios.delete(`http://35.193.219.136:4040/api/tasks/${task.id}`);
            router.push("/application/main-console/project");
        } catch (error) {
            console.error("Error deleting task:", error);
            setIsDeleting(false);
        }
    };

    const handleUpdate = () => {
        router.push(`/application/main-console/project/addtask?id=${task.id}&name=${task.name}&start=${task.start}&end=${task.end}&progress=${task.progress}&dependencies=${task.dependencies}&description=${task.description}`);
    };

    // Calculate the duration in days
    const calculateDuration = () => {
        if (!task.start || !task.end) return "N/A";

        const startDate = new Date(task.start);
        const endDate = new Date(task.end);
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
    };

    // Format date for display
    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return "N/A";

        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Get task status based on progress
    const getTaskStatus = () => {
        const progressNum = Number(task.progress) || 0;
        if (progressNum === 100) return "Completed";
        if (progressNum > 0) return "In Progress";
        return "Not Started";
    };

    // Get status color
    const getStatusColor = () => {
        const status = getTaskStatus();
        if (status === "Completed") return "text-green-600 bg-green-50 border-green-100";
        if (status === "In Progress") return "text-blue-600 bg-blue-50 border-blue-100";
        return "text-orange-600 bg-orange-50 border-orange-100";
    };

    // Action buttons for the layout
    const actionButtons = (
        <>
            <button
                className="py-2 px-4 rounded-full flex items-center gap-2 bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 transition-colors font-sans"
                onClick={handleUpdate}
            >
                <Pencil className="h-4 w-4" />
                <span>Edit</span>
            </button>

            <button
                className="py-2 px-4 rounded-full flex items-center gap-2 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition-colors font-sans"
                onClick={handleDelete}
                disabled={isDeleting}
            >
                <Trash2 className="h-4 w-4" />
                <span>{isDeleting ? "Deleting..." : "Delete"}</span>
            </button>
        </>
    );



    return(
        <ProjectLayout
            title={task.name || "Task Details"}
            subtitle={`Duration: ${calculateDuration()}`}
            status={{
                text: getTaskStatus(),
                color: getStatusColor()
            }}
            actions={actionButtons}
        >
            <div className="p-6">
                {/* Task Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* ID */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-500 mb-1 flex items-center font-sans">
                            <Hash className="h-4 w-4 mr-1" />
                            Task ID
                        </label>
                        <div className="bg-white border border-gray-300 rounded-full px-4 py-2 text-gray-800 font-sans">
                            {task.id || "N/A"}
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-500 mb-1 flex items-center font-sans">
                            <PercentSquare className="h-4 w-4 mr-1" />
                            Progress
                        </label>
                        <div className="flex items-center font-sans bg-white  border-white rounded-full px-4 py-2">
                            <div className="w-full bg-gray-200 rounded-full h-4 mr-2">
                                <div
                                    className="bg-blue-600 h-4 rounded-full"
                                    style={{ width: `${task.progress || 0}%` }}
                                ></div>
                            </div>
                            <span className="text-sm text-gray-700 min-w-[40px] text-right">{task.progress || 0}%</span>
                        </div>
                    </div>

                    {/* Start Date */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-500 mb-1 flex items-center font-sans">
                            <Calendar className="h-4 w-4 mr-1" />
                            Start Date
                        </label>
                        <div className="bg-white border border-gray-300 rounded-full px-4 py-2 text-gray-800 font-sans">
                            {formatDate(task.start)}
                        </div>
                    </div>

                    {/* End Date */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-500 mb-1 flex items-center font-sans">
                            <Clock className="h-4 w-4 mr-1" />
                            End Date
                        </label>
                        <div className="bg-white border border-gray-300 rounded-full px-4 py-2 text-gray-800 font-sans">
                            {formatDate(task.end)}
                        </div>
                    </div>

                    {/* Dependencies */}
                    <div className="flex flex-col col-span-2">
                        <label className="text-sm font-medium text-gray-500 mb-1 flex items-center font-sans">
                            <Link2 className="h-4 w-4 mr-1" />
                            Dependencies
                        </label>
                        <div className="bg-white border border-gray-300 rounded-full px-4 py-2 text-gray-800 font-sans">
                            {task.dependencies ? task.dependencies.split(',').map((dep, i) => (
                                <span key={i} className="inline-block bg-blue-50 text-blue-600 rounded-full px-2 py-1 text-xs mr-2">
                                    {dep.trim()}
                                </span>
                            )) : <span className="text-gray-500">None</span>}
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                <div className="mt-6">
                    <label className="text-sm font-medium text-gray-500 mb-2 flex items-center font-sans">
                        <FileTextIcon className="h-4 w-4 mr-1" />
                        Description
                    </label>
                    <div className="bg-white border border-gray-300 rounded-2xl p-4 text-gray-700 min-h-[200px] whitespace-pre-wrap font-sans">
                        {task.description ||
                            <div className="flex items-center text-gray-500">
                                <AlertCircle className="h-4 w-4 mr-2" />
                                No description available
                            </div>
                        }
                    </div>
                </div>
            </div>
        </ProjectLayout>

    );
}