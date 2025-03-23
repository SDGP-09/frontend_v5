"use client";

import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { X, Upload, Check, Edit2, Calendar, Clock } from "lucide-react";

// Define your TimelineItem and Project types (adjust as needed)
export interface TimelineItem {
    date: string;
    title: string;
    description: string;
    status: "completed" | "in-progress" | "upcoming";
}

export interface Project {
    id: string;
    name: string;
    description: string;
    fullDescription?: string;
    startDate: string;
    estimatedCompletion: string;
    images: string[];
    timeline: TimelineItem[];
}

interface ManageProjectModalProps {
    project: Project;
    onClose: () => void;
    onUpdateProject: (updatedProject: Project) => void;
}

const SHORT_DESC_MAX_LENGTH = 120;

export default function ManageProjectModal({
                                               project,
                                               onClose,
                                               onUpdateProject,
                                           }: ManageProjectModalProps) {
    // Local copy for editing
    const [editedProject, setEditedProject] = useState<Project>({ ...project });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formTouched, setFormTouched] = useState(false);
    const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

    useEffect(() => {
        setEditedProject({ ...project });
        setFormTouched(false);
    }, [project]);

    // Simple form validation: check required fields
    const isFormValid =
        editedProject.name.trim() !== "" &&
        editedProject.description.trim() !== "" &&
        editedProject.images.length > 0;

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        const files = Array.from(e.target.files);
        const newImageUrls = files.map((file) => URL.createObjectURL(file));
        setEditedProject((prev) => ({
            ...prev,
            images: [...prev.images, ...newImageUrls],
        }));
        setFormTouched(true);
    };

    const handleRemoveImage = (index: number) => {
        const newImages = editedProject.images.filter((_, i) => i !== index);
        setEditedProject((prev) => ({ ...prev, images: newImages }));
        setFormTouched(true);
    };

    const handleTimelineChange = (
        index: number,
        field: keyof TimelineItem,
        value: string
    ) => {
        const newTimeline = [...editedProject.timeline];
        newTimeline[index] = { ...newTimeline[index], [field]: value };
        setEditedProject((prev) => ({ ...prev, timeline: newTimeline }));
        setFormTouched(true);
    };

    const handleAddTimelineItem = () => {
        setEditedProject((prev) => ({
            ...prev,
            timeline: [
                ...prev.timeline,
                {
                    date: new Date().toISOString().split("T")[0],
                    title: "New Milestone",
                    description: "Description",
                    status: "upcoming",
                },
            ],
        }));
        setFormTouched(true);
    };

    const handleRemoveTimelineItem = (index: number) => {
        const newTimeline = editedProject.timeline.filter((_, i) => i !== index);
        setEditedProject((prev) => ({ ...prev, timeline: newTimeline }));
        setFormTouched(true);
    };

    const handleSave = () => {
        if (!isFormValid) return;
        onUpdateProject(editedProject);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl relative p-6 overflow-auto max-h-[90vh]">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full"
                >
                    <X className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold mb-4">Edit Project</h2>

                {/* Editable Project Name */}
                <div className="mb-4">
                    <input
                        type="text"
                        value={editedProject.name}
                        onChange={(e) =>
                            setEditedProject((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="Project Title"
                        className="w-full text-2xl font-bold mb-2 p-2 border-b border-gray-200 focus:outline-none"
                    />
                </div>

                {/* Editable Images */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Images
                    </label>
                    <div className="flex flex-wrap gap-4 mb-2">
                        {editedProject.images.map((img, index) => (
                            <div key={index} className="relative w-32 h-32">
                                <img
                                    src={img}
                                    alt={`Project image ${index + 1}`}
                                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                                    onClick={() => setEnlargedImage(img)}
                                />
                                <button
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-1 right-1 bg-red-500 rounded-full p-1 shadow"
                                >
                                    <X className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-500 transition-colors duration-200"
                        >
                            <Upload className="w-6 h-6 text-gray-400" />
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleImageUpload}
                        />
                    </div>
                </div>

                {/* Editable Short Description */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Short Description
                    </label>
                    <textarea
                        value={editedProject.description}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val.length <= SHORT_DESC_MAX_LENGTH) {
                                setEditedProject((prev) => ({ ...prev, description: val }));
                            }
                            setFormTouched(true);
                        }}
                        placeholder="Brief description (max 120 characters)"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={2}
                    />
                    <span className="block text-right text-sm text-gray-500">
            {SHORT_DESC_MAX_LENGTH - editedProject.description.length} characters left
          </span>
                </div>

                {/* Editable Full Description */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Description
                    </label>
                    <textarea
                        value={editedProject.fullDescription || ""}
                        onChange={(e) =>
                            setEditedProject((prev) => ({
                                ...prev,
                                fullDescription: e.target.value,
                            }))
                        }
                        placeholder="Detailed description"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                    />
                </div>

                {/* Editable Timeline */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Timeline</h3>
                    <div className="space-y-4">
                        {editedProject.timeline.map((item, idx) => (
                            <div key={idx} className="border p-3 rounded space-y-2">
                                <div className="flex gap-2">
                                    <input
                                        type="date"
                                        value={item.date}
                                        onChange={(e) => handleTimelineChange(idx, "date", e.target.value)}
                                        className="w-full p-2 border rounded-md"
                                    />
                                    <select
                                        value={item.status}
                                        onChange={(e) =>
                                            handleTimelineChange(idx, "status", e.target.value)
                                        }
                                        className="w-full p-2 border rounded-md"
                                    >
                                        <option value="completed">Completed</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="upcoming">Upcoming</option>
                                    </select>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Milestone Title"
                                    value={item.title}
                                    onChange={(e) => handleTimelineChange(idx, "title", e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                />
                                <textarea
                                    placeholder="Description"
                                    value={item.description}
                                    onChange={(e) =>
                                        handleTimelineChange(idx, "description", e.target.value)
                                    }
                                    className="w-full p-2 border rounded-md"
                                    rows={2}
                                />
                                <button
                                    onClick={() => handleRemoveTimelineItem(idx)}
                                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    Remove Milestone
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleAddTimelineItem}
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        Add Milestone
                    </button>
                </div>

                {/* Save Button */}
                <button
                    onClick={handleSave}
                    disabled={!formTouched || !isFormValid}
                    className={`w-full px-6 py-3 rounded-lg text-white text-lg font-semibold transition-colors duration-300 ${
                        formTouched && isFormValid
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-300 cursor-not-allowed"
                    }`}
                >
                    Save
                </button>
            </div>

            {/* Enlarged Image Modal */}
            {enlargedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setEnlargedImage(null);
                        }
                    }}
                >
                    <div className="relative">
                        <button
                            onClick={() => setEnlargedImage(null)}
                            className="absolute top-4 right-4 p-2 bg-white/20 rounded-full"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>
                        <img
                            src={enlargedImage}
                            alt="Enlarged"
                            className="max-w-full max-h-[80vh] object-contain rounded"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
