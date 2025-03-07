"use client";

import React, { useState } from 'react';
import { Edit2 } from 'lucide-react';

interface Update {
    date: string;
    title: string;
    description: string;
    author: string;
}

interface ProjectUpdatesEditProps {
    updates: Update[];
    onUpdate: (updates: Update[]) => void;
}

const ProjectUpdatesEdit: React.FC<ProjectUpdatesEditProps> = ({ updates, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUpdates, setEditedUpdates] = useState(updates);

    const handleSave = () => {
        onUpdate(editedUpdates);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedUpdates(updates);
        setIsEditing(false);
    };

    const handleAdd = () => {
        setEditedUpdates([...editedUpdates, {
            date: new Date().toISOString().split('T')[0],
            title: "New Update",
            description: "Update description",
            author: "Author Name"
        }]);
    };

    const handleRemove = (index: number) => {
        setEditedUpdates(editedUpdates.filter((_, i) => i !== index));
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Recent Updates</h2>
                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <button onClick={handleAdd} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                                Add Update
                            </button>
                            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                Save Changes
                            </button>
                            <button onClick={handleCancel} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            <Edit2 size={16} /> Edit Updates
                        </button>
                    )}
                </div>
            </div>
            <div className="space-y-6">
                {editedUpdates.map((update: Update, index: number) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                        {isEditing ? (
                            <div className="space-y-4">
                                <input type="text" value={update.title} onChange={(e) => { const newUpdates = [...editedUpdates]; newUpdates[index] = { ...update, title: e.target.value }; setEditedUpdates(newUpdates); }} className="w-full p-2 border rounded-md" placeholder="Update Title" />
                                <input type="date" value={update.date} onChange={(e) => { const newUpdates = [...editedUpdates]; newUpdates[index] = { ...update, date: e.target.value }; setEditedUpdates(newUpdates); }} className="w-full p-2 border rounded-md" />
                                <textarea value={update.description} onChange={(e) => { const newUpdates = [...editedUpdates]; newUpdates[index] = { ...update, description: e.target.value }; setEditedUpdates(newUpdates); }} className="w-full p-2 border rounded-md" rows={3} placeholder="Update Description" />
                                <input type="text" value={update.author} onChange={(e) => { const newUpdates = [...editedUpdates]; newUpdates[index] = { ...update, author: e.target.value }; setEditedUpdates(newUpdates); }} className="w-full p-2 border rounded-md" placeholder="Author" />
                                <button onClick={() => handleRemove(index)} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">Remove</button>
                            </div>
                        ) : (
                            <>
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold text-gray-800">{update.title}</h3>
                                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{update.date}</span>
                                </div>
                                <p className="text-gray-700 mb-4">{update.description}</p>
                                <div className="text-sm text-gray-600 italic">Posted by: {update.author}</div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectUpdatesEdit;