"use client";
import React, {useState} from "react";
import {Eye, EyeOff, Trash2, X} from "lucide-react";
import { Ad } from "@/app/types/advertisement.hot-deals";

interface ManageAdCardProps {
    ad: Ad;
    onSelectAd: (ad: Ad) => void;
    onUpdateAd: (ad: Ad) => void;
}

export default function ManageAdCard({ ad, onSelectAd, onUpdateAd }: ManageAdCardProps) {
    // Toggle the "show" attribute

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);


    const handleCardClick = () => {
        if (!showDeleteConfirm) {
            onSelectAd(ad);
        }
    };

    const handleVisibilityToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        onUpdateAd({ ...ad, visibility: !ad.visibility });
    };


    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowDeleteConfirm(true); // open the confirm dialog
    };

    // Dummy function for “Delete”
    const handleDelete = () => {
        // Here you’d call your backend or global state.
        // Right now it’s blank, just closes the dialog.
        setShowDeleteConfirm(false);
    };

    return (
        <div
            className="bg-white rounded-xl shadow-lg cursor-pointer relative"
            onClick={handleCardClick}
        >
            <div className="relative h-48">
                <img
                    src={ad.images[0]}
                    alt={ad.title}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white font-semibold text-lg">Edit Details</span>
                </div>

                <button
                    className="absolute top-2 right-12 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
                    onClick={handleVisibilityToggle}
                >
                    {ad.visibility ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>

                <button
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
                    onClick={handleDeleteClick}
                >
                    <Trash2 className="w-5 h-5 text-red-600" />
                </button>
            </div>
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{ad.title}</h3>
                <p className="text-gray-600">{ad.description}</p>
            </div>

            {showDeleteConfirm && (
                <div
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center delete-confirm-overlay"
                    onClick={(e) => {
                        // close if user clicks outside the white popup but still inside the card
                        if ((e.target as HTMLElement).classList.contains("delete-confirm-overlay")) {
                            setShowDeleteConfirm(false);
                        }
                    }}
                >
                    <div className="bg-white rounded-lg shadow-xl p-6 relative">
                        <button
                            onClick={() => setShowDeleteConfirm(false)}
                            className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 rounded-md hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}
