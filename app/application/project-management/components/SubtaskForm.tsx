'use client';

import { useState } from 'react';
import { Task } from '@/app/types/project';
import {v4 as uuidv4} from "uuid";


interface SubtaskFormProps {
    onSubmit: (task: Task) => void;
    onCancel: () => void;
}

export function SubtaskForm({ onSubmit, onCancel }: SubtaskFormProps) {
    const [newTask, setNewTask] = useState<Partial<Task>>({
        name: '',
        startDate: new Date(),
        endDate: new Date(),
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.name || !newTask.startDate || !newTask.endDate) return;

        const task: Task = {
            id:uuidv4() ,
            projectId: newTask.projectId ?? '',
            name: newTask.name,
            startDate: new Date(newTask.startDate),
            endDate: new Date(newTask.endDate),
            status: newTask.status ?? 'New',
            description: newTask.description ?? '',
        };
        onSubmit(task);
    };


    return (

        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-lg sm:max-w-md">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Add New SubTask</h3>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
            }}>
                {/* Task Name */}
                <div className="mb-1">
                    <label className="block text-sm font-medium mb-1 text-gray-700">Task Name</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        value={newTask.name}
                        placeholder="Enter task name"
                        onChange={(e) => setNewTask({...newTask, name: e.target.value})}
                    />
                </div>

                {/* Date Inputs (Start Date & End Date) */}
                <div className="grid grid-cols-2 gap-6 mb-1">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Start Date</label>
                        <input
                            type="date"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            value={newTask.startDate?.toISOString().split('T')[0]}
                            onChange={(e) => setNewTask({
                                ...newTask,
                                startDate: new Date(e.target.value)
                            })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">End Date</label>
                        <input
                            type="date"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            value={newTask.endDate?.toISOString().split('T')[0]}
                            onChange={(e) => setNewTask({
                                ...newTask,
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
                        value={newTask.status}
                        onChange={(e) => setNewTask({
                            ...newTask,
                            status: e.target.value as "New" | "In Progress" | "Completed"
                        })}
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
                        value={newTask.description}
                        onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    ></textarea>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:from-green-500 hover:to-blue-600 focus:outline-none"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    </div>

);
}

