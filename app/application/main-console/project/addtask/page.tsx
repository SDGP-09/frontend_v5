"use client"
import axios from "axios";

import { useState } from "react";

export default function Addtask() {
    const [projectId] = useState("6541");
    const [name, setName] = useState("project A");
    const [startDate, setStartDate] = useState("2023-10-02");
    const [endDate, setEndDate] = useState("2023-10-02");
    const [progress, setProgress] = useState(20);
    const [dependencies, setDependencies] = useState("");
    const [description, setDescription] = useState("");

    const handleSave =async () => {
        const projectData = {
            id: projectId,
            name,
            startDate,
            endDate,
            progress:progress.toString(),
            dependencies,
            description,
        };
        try {
            const response = await axios.post("http://localhost:7878/api/project/add-task", projectData,{
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("Task added successfully!", response.data);
        } catch (error) {
            console.error("Error adding task:", error);
        }

        console.log("Saved project:", projectData);
        // You can replace this with an API call or other logic.
    };

    return (
        <div className="w-full h-full p-4">
            {/* Header */}
            <div className="w-full h-10 flex items-center justify-between">
                <div className="text-2xl font-bold ml-2">
                    <p>Project Overview</p>
                </div>
                <div>
                    <button
                        onClick={handleSave}
                        className="py-1 px-5 border border-white rounded-full flex items-center gap-2 cursor-pointer"
                    >
                        <i className="ri-sticky-note-add-line"></i>
                        <span>Save</span>
                    </button>
                </div>
            </div>

            {/* Row 1 */}
            <div className="flex w-full mt-6 space-x-6">
                <div className="flex-1 flex items-center text-xl">
                    <label className="mr-4">ID:</label>
                    <div className="flex-1 bg-gray-700 px-6 py-2 rounded-full">{projectId}</div>
                </div>

                <div className="flex-1 flex items-center text-xl">
                    <label className="mr-4">Name:</label>
                    <input
                        className="flex-1 bg-gray-700 px-6 py-2 rounded-full"
                        type="text"
                        value={name}
                        placeholder="Enter project name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
            </div>

            {/* Row 2 */}
            <div className="flex w-full mt-6 space-x-6">
                <div className="flex-1 flex items-center text-xl">
                    <label className="mr-4">Start:</label>
                    <input
                        className="flex-1 bg-gray-700 px-6 py-2 rounded-full"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>

                <div className="flex-1 flex items-center text-xl">
                    <label className="mr-4">End:</label>
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
                    <label className="mr-4">Progress:</label>
                    <input
                        className="flex-1 bg-gray-700 px-6 py-2 rounded-full"
                        type="number"
                        value={progress}
                        min={0}
                        max={100}
                        onChange={(e) => setProgress(Number(e.target.value))}
                    />
                </div>

                <div className="flex-1 flex items-center text-xl">
                    <label className="mr-4">Dependencies:</label>
                    <input
                        className="flex-1 bg-gray-700 px-6 py-2 rounded-full"
                        type="text"
                        value={dependencies}
                        placeholder="Enter dependencies"
                        onChange={(e) => setDependencies(e.target.value)}
                    />
                </div>
            </div>

            {/* Description */}
            <div className="flex flex-col w-full mt-6">
                <label className="text-xl mb-2 pl-1">Description:</label>
                <textarea
                    className="w-full h-[100px] bg-gray-700 text-xl p-4 rounded-xl resize-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write a short project description..."
                ></textarea>
            </div>
        </div>
    );
}
