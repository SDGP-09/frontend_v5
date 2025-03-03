'use client';


import React from 'react';

interface DeleteConversationModalProps {
    conversationName: string;
    onDelete: () => void;
    onCancel: () => void;
}

export default function DeleteConversationModal({
                                                    conversationName,
                                                    onDelete,
                                                    onCancel,
                                                }: DeleteConversationModalProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            {/* Modal box */}
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-2 relative">
                {/* Title or message */}
                <h2 className="text-lg font-semibold mb-4">
                    Are you sure you want to delete{' '}
                    <span className="font-bold">{conversationName}</span>?
                </h2>

                {/* Buttons */}
                <div className="flex justify-end space-x-2">
                    {/* Cancel button */}
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    {/* Delete button (red) */}
                    <button
                        onClick={onDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}