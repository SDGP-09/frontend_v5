"use client";

import React, { useState } from 'react';
import { Edit2 } from 'lucide-react';

interface ProjectImageGridEditProps {
    images: string[];
    name: string;
    onNameChange?: (name: string) => void;
}

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
                <button
                    onClick={onSave}
                    className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    <Edit2 size={16} /> Save
                </button>
                <button
                    onClick={onCancel}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

const ProjectImageGridEdit: React.FC<ProjectImageGridEditProps> = ({
                                                                       images,
                                                                       name,
                                                                       onNameChange,
                                                                   }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(name);

    const handleSave = () => {
        if (onNameChange) {
            onNameChange(editedName);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedName(name);
        setIsEditing(false);
    };

    return (
        <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 h-[35vh]">
                {images.map((image: string, index: number) => (
                    <div
                        key={index}
                        className={`relative overflow-hidden ${
                            images.length === 1
                                ? 'col-span-3'
                                : images.length === 2
                                    ? 'col-span-3 md:col-span-1.5'
                                    : 'col-span-3 md:col-span-1'
                        }`}
                    >
                        <img
                            src={image}
                            alt={`Project image ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>
            <div className="absolute bottom-0 right-0 bg-gradient-to-tl from-black/80 to-transparent p-6 text-white max-w-full">
                <div className="flex items-center gap-2">
                    <EditableField
                        value={editedName}
                        onChange={setEditedName}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        isEditing={isEditing}
                    />
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="p-1 hover:bg-white/20 rounded-full transition-colors"
                        >
                            <Edit2 size={16} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectImageGridEdit;
