"use client";

import React, { useState } from 'react';
import { Calendar, Clock, Edit2 } from 'lucide-react';

interface EditableFieldProps {
    value: string;
    onChange: (value: string) => void;
    onSave: () => void;
    onCancel: () => void;
    isEditing: boolean;
    multiline?: boolean;
    label?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({
                                                         value,
                                                         onChange,
                                                         onSave,
                                                         onCancel,
                                                         isEditing,
                                                         multiline = false,
                                                         label,
                                                     }) => {
    if (!isEditing) {
        return <span>{value}</span>;
    }

    return (
        <div className="flex flex-col gap-1">
            {label && <span className="text-sm text-gray-600">{label}</span>}
            {multiline ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    rows={4}
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
            )}
            <div className="flex gap-2 mt-2">
                <button onClick={onSave} className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600">
                    Save
                </button>
                <button onClick={onCancel} className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                    Cancel
                </button>
            </div>
        </div>
    );
};

interface ProjectOverviewEditProps {
    project: {
        description: string;
        client: string;
        location: string;
        budget: string;
        startDate: string;
        estimatedCompletion: string;
    };
    onUpdate: (updatedProject: {
        description: string;
        client: string;
        location: string;
        budget: string;
        startDate: string;
        estimatedCompletion: string;
    }) => void;
}

const ProjectOverviewEdit: React.FC<ProjectOverviewEditProps> = ({ project, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedProject, setEditedProject] = useState(project);

    const handleSave = () => {
        onUpdate(editedProject);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedProject(project);
        setIsEditing(false);
    };

    return (
        <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Project Overview</h2>
                {!isEditing && (
                    <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        <Edit2 size={16} /> Edit Details
                    </button>
                )}
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
                <EditableField
                    value={editedProject.description}
                    onChange={(value) => setEditedProject({ ...editedProject, description: value })}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    isEditing={isEditing}
                    multiline
                    label="Description"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Project Details</h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">Client:</span>
                                <EditableField
                                    value={editedProject.client}
                                    onChange={(value) => setEditedProject({ ...editedProject, client: value })}
                                    onSave={handleSave}
                                    onCancel={handleCancel}
                                    isEditing={isEditing}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">Location:</span>
                                <EditableField
                                    value={editedProject.location}
                                    onChange={(value) => setEditedProject({ ...editedProject, location: value })}
                                    onSave={handleSave}
                                    onCancel={handleCancel}
                                    isEditing={isEditing}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">Budget:</span>
                                <EditableField
                                    value={editedProject.budget}
                                    onChange={(value) => setEditedProject({ ...editedProject, budget: value })}
                                    onSave={handleSave}
                                    onCancel={handleCancel}
                                    isEditing={isEditing}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Project Schedule</h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Calendar size={20} className="text-green-500" />
                                <span className="font-medium">Start Date:</span>
                                <EditableField
                                    value={editedProject.startDate}
                                    onChange={(value) => setEditedProject({ ...editedProject, startDate: value })}
                                    onSave={handleSave}
                                    onCancel={handleCancel}
                                    isEditing={isEditing}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={20} className="text-blue-500" />
                                <span className="font-medium">Estimated Completion:</span>
                                <EditableField
                                    value={editedProject.estimatedCompletion}
                                    onChange={(value) => setEditedProject({ ...editedProject, estimatedCompletion: value })}
                                    onSave={handleSave}
                                    onCancel={handleCancel}
                                    isEditing={isEditing}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectOverviewEdit;