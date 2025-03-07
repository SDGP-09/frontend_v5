"use client";

import React, { useState } from 'react';
import { Check, Edit2 } from 'lucide-react';

interface TimelineItem {
    date: string;
    title: string;
    description: string;
    status: 'completed' | 'in-progress' | 'upcoming';
}

interface ProjectTimelineEditProps {
    timeline: TimelineItem[];
    onUpdate: (timeline: TimelineItem[]) => void;
}

const ProjectTimelineEdit: React.FC<ProjectTimelineEditProps> = ({ timeline, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTimeline, setEditedTimeline] = useState(timeline);

    const handleSave = () => {
        onUpdate(editedTimeline);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedTimeline(timeline);
        setIsEditing(false);
    };

    const handleAdd = () => {
        setEditedTimeline([...editedTimeline, {
            date: new Date().toISOString().split('T')[0],
            title: "New Milestone",
            description: "Description",
            status: "upcoming"
        }]);
    };

    const handleRemove = (index: number) => {
        setEditedTimeline(editedTimeline.filter((_, i) => i !== index));
    };

    return (
        <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Project Timeline</h2>
                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <button onClick={handleAdd} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                                Add Milestone
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
                            <Edit2 size={16} /> Edit Timeline
                        </button>
                    )}
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="relative">
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
                    <div className="space-y-8">
                        {editedTimeline.map((item: TimelineItem, index: number) => (
                            <div key={index} className="relative">
                                <div className={`flex items-center mb-2 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className={`absolute left-4 md:left-1/2 w-8 h-8 rounded-full border-4 transform -translate-x-1/2 flex items-center justify-center ${
                                        item.status === 'completed' ? 'bg-green-500 border-green-200' :
                                            item.status === 'in-progress' ? 'bg-blue-500 border-blue-200' :
                                                'bg-gray-300 border-gray-200'
                                    }`}>
                                        {item.status === 'completed' && (
                                            <Check size={16} className="text-white" />
                                        )}
                                        {item.status === 'in-progress' && (
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        )}
                                    </div>
                                    <div className={`w-full md:w-1/2 ${
                                        index % 2 === 0 ? 'md:pr-12 pl-12 md:pl-0' : 'md:pl-12 pl-12'
                                    }`}>
                                        <div className={`bg-white p-4 rounded-lg border ${
                                            item.status === 'completed' ? 'border-green-200' :
                                                item.status === 'in-progress' ? 'border-blue-200' :
                                                    'border-gray-200'
                                        }`}>
                                            {isEditing ? (
                                                <div className="space-y-2">
                                                    <input type="text" value={item.title} onChange={(e) => { const newTimeline = [...editedTimeline]; newTimeline[index] = { ...item, title: e.target.value }; setEditedTimeline(newTimeline); }} className="w-full p-2 border rounded-md" placeholder="Milestone Title" />
                                                    <input type="date" value={item.date} onChange={(e) => { const newTimeline = [...editedTimeline]; newTimeline[index] = { ...item, date: e.target.value }; setEditedTimeline(newTimeline); }} className="w-full p-2 border rounded-md" />
                                                    <textarea value={item.description} onChange={(e) => { const newTimeline = [...editedTimeline]; newTimeline[index] = { ...item, description: e.target.value }; setEditedTimeline(newTimeline); }} className="w-full p-2 border rounded-md" rows={2} placeholder="Description" />
                                                    <select value={item.status} onChange={(e) => { const newTimeline = [...editedTimeline]; newTimeline[index] = { ...item, status: e.target.value as TimelineItem['status'] }; setEditedTimeline(newTimeline); }} className="w-full p-2 border rounded-md">
                                                        <option value="completed">Completed</option>
                                                        <option value="in-progress">In Progress</option>
                                                        <option value="upcoming">Upcoming</option>
                                                    </select>
                                                    <button onClick={() => handleRemove(index)} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">Remove</button>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="font-semibold text-gray-800">{item.title}</div>
                                                    <div className="text-sm text-gray-500 mb-2">{item.date}</div>
                                                    <p className="text-gray-700">{item.description}</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectTimelineEdit;