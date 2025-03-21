"use client"
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Addtask() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const taskId = searchParams.get("id");
    const isEditMode = !!taskId;

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [progress, setProgress] = useState(0);
    const [dependencies, setDependencies] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Initialize form with data if in edit mode
    useEffect(() => {
        // If we're in edit mode, populate the form with data from URL params
        if (isEditMode) {
            setId(taskId || "");
            setName(searchParams.get("name") || "");
            setStartDate(searchParams.get("start") || "");
            setEndDate(searchParams.get("end") || "");
            setProgress(Number(searchParams.get("progress") || 0));
            setDependencies(searchParams.get("dependencies") || "");
            setDescription(searchParams.get("description") || "");
        } else {
            // If it's a new task, generate a unique ID and set default dates
            setId(uuidv4());
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);

            setStartDate(today.toISOString().split('T')[0]);
            setEndDate(tomorrow.toISOString().split('T')[0]);
            setProgress(0);
        }
    }, [isEditMode, taskId, searchParams]);

    const handleSave = async () => {
        try {
            setIsLoading(true);
            const taskData = {
                id,
                name,
                startDate,
                endDate,
                progress: progress.toString(),
                dependencies,
                description,
            };

            let response;
            if (isEditMode) {
                // Update existing task
                response = await axios.put(`http://localhost:7075/api/tasks/${id}`, taskData, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                console.log("Task updated successfully!", response.data);
            } else {
                // Create new task
                response = await axios.post("http://localhost:7075/api/tasks/save", taskData, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                console.log("Task added successfully!", response.data);
            }

            // Navigate back to Gantt chart after saving
            router.push("/application/main-console/project");
        } catch (error) {
            console.error("Error saving task:", error);
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full h-full p-4">
            {/* Header */}
            <div className="w-full h-10 flex items-center justify-between">
                <div className="text-2xl font-bold ml-2">
                    <p>{isEditMode ? "Update Task" : "Create New Task"}</p>
                </div>
                <div>
                    <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="py-1 px-5 border border-white rounded-full flex items-center gap-2 cursor-pointer"
                    >
                        <i className="ri-sticky-note-add-line"></i>
                        <span>{isLoading ? "Saving..." : "Save"}</span>
                    </button>
                </div>
            </div>

            {/* Row 1 */}
            <div className="flex w-full mt-6 space-x-6">
                <div className="flex-1 flex items-center text-xl">
                    <label className="mr-4">ID:</label>
                    <div className="flex-1 bg-gray-700 px-6 py-2 rounded-full">{id}</div>
                </div>

                <div className="flex-1 flex items-center text-xl">
                    <label className="mr-4">Name:</label>
                    <input
                        className="flex-1 bg-gray-700 px-6 py-2 rounded-full"
                        type="text"
                        value={name}
                        placeholder="Enter task name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
            </div>

            {/* Row 2 */}
            <div className="flex w-full mt-6 space-x-6">
                <div className="flex-1 flex items-center text-xl">
                    <label className="mr-4">Start Date:</label>
                    <input
                        className="flex-1 bg-gray-700 px-6 py-2 rounded-full"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>

                <div className="flex-1 flex items-center text-xl">
                    <label className="mr-4">End Date:</label>
                    <input
                        className="flex-1 bg-gray-700 px-6 py-2 rounded-full"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>

            {/* Row 3 */}
            <div className="flex w-full mt-6 space-x-6">
                <div className="flex-1 flex items-center text-xl">
                    <label className="mr-4">Progress (%):</label>
                    <input
                        className="flex-1 bg-gray-700 px-6 py-2 rounded-full"
                        type="number"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={(e) => setProgress(Number(e.target.value))}
                    />
                </div>

                <div className="flex-1 flex items-center text-xl">
                    <label className="mr-4">Dependencies:</label>
                    <input
                        className="flex-1 bg-gray-700 px-6 py-2 rounded-full"
                        type="text"
                        value={dependencies}
                        placeholder="Task dependencies (comma separated IDs)"
                        onChange={(e) => setDependencies(e.target.value)}
                    />
                </div>
            </div>

            {/* Row 4 - Description */}
            <div className="flex flex-col w-full mt-6">
                <div className="flex items-center text-xl mb-2">
                    <label>Description:</label>
                </div>
                <textarea
                    className="w-full bg-gray-700 p-4 rounded-xl h-40"
                    value={description}
                    placeholder="Enter task description"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
        </div>
    );
}
