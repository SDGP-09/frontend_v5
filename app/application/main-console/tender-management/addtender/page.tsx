"use client"
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Save, Calendar, Clock, Hash, Type, Link, FileText, PercentSquare, CheckCircle, AlertTriangle } from "lucide-react";
import TenderLayout from "@/app/components/TenderLayout";

export default function Addtender() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const tenderId = searchParams.get("id");
    const isEditMode = !!tenderId;

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [openDate, setOpenDate] = useState("");
    const [closeDate, setCloseDate] = useState("");
    const [progress, setProgress] = useState(0);
    const [dependencies, setDependencies] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState<boolean | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    useEffect(() => {

        if (isEditMode) {
            setId(tenderId || "");
            setName(searchParams.get("name") || "");
            setOpenDate(searchParams.get("open") || "");
            setCloseDate(searchParams.get("close") || "");
            setProgress(Number(searchParams.get("progress") || 0));
            setDependencies(searchParams.get("dependencies") || "");
            setDescription(searchParams.get("description") || "");
        } else {

            setId(uuidv4());
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);

            setOpenDate(today.toISOString().split('T')[0]);
            setCloseDate(tomorrow.toISOString().split('T')[0]);
            setProgress(0);
        }
    }, [isEditMode, tenderId, searchParams]);


    const validateForm = () => {
        if (!name.trim()) {
            setErrorMessage("Task name is required");
            return false;
        }

        if (!openDate) {
            setErrorMessage("Start date is required");
            return false;
        }

        if (!closeDate) {
            setErrorMessage("End date is required");
            return false;
        }

        const open = new Date(openDate);
        const close = new Date(closeDate);

        if (close < open) {
            setErrorMessage("End date cannot be before start date");
            return false;
        }

        return true;
    };


    const handleSave = async () => {

        // Reset status
        setSaveSuccess(null);
        setErrorMessage(null);

        // Validate form
        if (!validateForm()) {
            return;
        }

        try {
            setIsLoading(true);
            const tenderData = {
                id,
                name,
                openDate,
                closeDate,
                progress: progress.toString(),
                dependencies,
                description,
            };

            let response;
            if (isEditMode) {
                // Update existing task
                response = await axios.put(`http://localhost:7075/api/tenders/${id}`, tenderData, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                console.log("Tender updated successfully!", response.data);
            } else {
                // Create new task
                response = await axios.post("http://localhost:7075/api/tenders/save", tenderData, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                console.log("Tender added successfully!", response.data);
            }

            // Navigate back to Gantt chart after short delay
            setTimeout(() => {
                router.push("/application/main-console/tender-management/");
            }, 1000);

        } catch (error) {
            console.error("Error saving tender:", error);
            setSaveSuccess(false);
            setErrorMessage("Failed to save tender. Please try again.");
            setIsLoading(false);
        }
    };

    // Action button for the save
    const saveButton = (
        <button
            onClick={handleSave}
            disabled={isLoading}
            className="py-2 px-5 rounded-full flex items-center gap-2 cursor-pointer bg-gradient-to-r from-green-500 to-blue-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 ease-in-out"
        >
            {saveSuccess === true ? (
                <CheckCircle className="h-5 w-5" />
            ) : saveSuccess === false ? (
                <AlertTriangle className="h-5 w-5" />
            ) : (
                <Save className="h-5 w-5" />
            )}
            <span>
                {isLoading ? "Saving..." :
                    saveSuccess === true ? "Saved!" :
                        saveSuccess === false ? "Try Again" :
                            "Save Task"}
            </span>
        </button>
    );


    return (
        <TenderLayout
            title={isEditMode ? "Update Tender Details" : "Create New Tender"}
            actions={saveButton}
        >
            {/* Status message */}
            {errorMessage && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-6 mt-4">
                    <div className="flex items-center">
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                        <p className="text-red-700 font-medium">{errorMessage}</p>
                    </div>
                </div>
            )}

            {/* Main Form Content */}
            <div className="p-6">
                {/* Task ID and Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center font-sans">
                            <Hash className="h-4 w-4 mr-2 text-gray-500" />
                            Tender ID
                        </label>
                        <div className="flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500 font-sans">
                            {id}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center font-sans">
                            <Type className="h-4 w-4 mr-2 text-gray-500" />
                            Tender Name
                        </label>
                        <input
                            className="rounded-full border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans"
                            type="text"
                            value={name}
                            placeholder="Enter descriptive task name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>

                {/* Task Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center font-sans">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                            Open Date
                        </label>
                        <input
                            className="rounded-full border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans"
                            type="date"
                            value={openDate}
                            onChange={(e) => setOpenDate(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center font-sans">
                            <Clock className="h-4 w-4 mr-2 text-gray-500" />
                            Close Date
                        </label>
                        <input
                            className="rounded-full border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans"
                            type="date"
                            value={closeDate}
                            onChange={(e) => setCloseDate(e.target.value)}
                        />
                    </div>
                </div>

                {/* Task Progress and Dependencies */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center font-sans">
                            <PercentSquare className="h-4 w-4 mr-2 text-gray-500" />
                            Completion Progress (%)
                        </label>
                        <div className="flex items-center">
                            <input
                                className="w-full rounded-full border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans"
                                type="range"
                                min="0"
                                max="100"
                                value={progress}
                                onChange={(e) => setProgress(Number(e.target.value))}
                            />
                            <span className="ml-3 min-w-[40px] text-center font-medium text-gray-700">{progress}%</span>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center font-sans">
                            <Link className="h-4 w-4 mr-2 text-gray-500" />
                            Dependencies
                        </label>
                        <input
                            className="rounded-full border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans"
                            type="text"
                            value={dependencies}
                            placeholder="Enter task dependencies (comma separated IDs)"
                            onChange={(e) => setDependencies(e.target.value)}
                        />
                    </div>
                </div>

                {/* Task Description */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-2 flex items-center font-sans">
                        <FileText className="h-4 w-4 mr-2 text-gray-500" />
                        Tender Description
                    </label>
                    <textarea
                        className="rounded-2xl border border-gray-200 px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans"
                        value={description}
                        placeholder="Enter detailed task description, objectives, and requirements"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>
        </TenderLayout>

    );
}
