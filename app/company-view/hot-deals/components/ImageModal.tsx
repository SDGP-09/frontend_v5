"use client";


import React, {useState} from "react";
import { X } from "lucide-react";

interface ImageModalProps {
    imageUrl: string;
    onClose: () => void;
}

export default function ImageModal({ imageUrl, onClose }: ImageModalProps) {
    // This closes the modal if the user clicks the black overlay

    const [isClosing, setIsClosing] = useState(false);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).classList.contains("image-modal-overlay")) {
            setIsClosing(true);
        }
    };

    const handleAnimationEnd = () => {
        if (isClosing) {
            onClose();
        }
    };

    const handleClose = () => {
        setIsClosing(true); // (4) Helper for close button
    };


    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50 cursor-default image-modal-overlay"
            onClick={handleOverlayClick}
        >
            <div className="relative animate-modal-in">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute left-4 top-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
                >
                    <X className="w-6 h-6 text-white" />
                </button>

                {/* Enlarged Image */}
                <img
                    src={imageUrl}
                    alt="Enlarged view"
                    className="max-w-full max-h-[90vh] object-contain rounded-lg"
                />
            </div>
        </div>
    );
}