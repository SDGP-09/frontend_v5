'use client';
import { useState } from 'react';

const MainForm = () => {
    const [showForm, setShowForm] = useState(false);
    const [task, setTask] = useState({
        taskname: '',
        status: 'New',
        startDate: '',
        endDate: '',
        description: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Project Created:', task);
        setShowForm(false);
    };
    return (
        <div>
            <button
                className="fixed bottom-5 right-5 border border-black text-white  bg-black  p-2  "
                onClick={() => setShowForm(true)}
            >
                Create Task
            </button>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-[46rem] shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-center">Start Your Project with CiviLink</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block mb-1">Task Name:</label>
                                <input
                                    type="text"
                                    name="taskname"
                                    value={task.taskname}
                                    onChange={handleInputChange}
                                    className="w-full h-10 border border-gray-400 p-2 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Status:</label>
                                <select
                                    name="status"
                                    value={task.status}
                                    onChange={handleInputChange}
                                    className="w-full h-10 border border-gray-400 p-2 rounded-lg"
                                >
                                    <option value="New">New</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                            <div className="mb-4 flex gap-4">
                                <div className="w-1/2">
                                    <label className="block mb-1">Start Date:</label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={task.startDate}
                                        onChange={handleInputChange}
                                        className="w-full h-10 border border-gray-400 p-2 rounded-lg"
                                        required
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="block mb-1">End Date:</label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={task.endDate}
                                        onChange={handleInputChange}
                                        className="w-full h-10 border border-gray-400 p-2 rounded-lg"
                                        required
                                    />
                                </div>
                            </div>
                                <div className="mb-4">
                                    <label className="block mb-1">Description:</label>
                                    <textarea
                                        name="description"
                                        value={task.description}
                                        onChange={handleInputChange}
                                        className="w-full h-28 border border-gray-400 p-2 rounded-lg"
                                        required
                                    />
                                </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="border border-blue-950 text-white bg-blue-950  p-2  mr-2"
                                >
                                    Create
                                </button>

                                <button
                                    type="button"
                                    className="border border-black text-white bg-black  p-2 "
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainForm;
