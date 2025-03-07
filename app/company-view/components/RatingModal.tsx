"use client";
import React, { useState } from "react";

interface RatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (rating: number) => void;
}

const RatingModal: React.FC<RatingModalProps> = ({
                                                     isOpen,
                                                     onClose,
                                                     onSubmit,
                                                 }) => {
    const [selectedRating, setSelectedRating] = useState<number>(0);
    const [hoverRating, setHoverRating] = useState<number>(0);

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (selectedRating > 0) {
            onSubmit(selectedRating);
            onClose();
        }
    };

    // Cute star SVG with face
    const HappyStar = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-10 h-10"
            fill="#FFD700"
            stroke="none"
        >
            <path d="M12 1.7l2.68 6.88 7.19.45-5.4 4.48 1.66 7.03L12 16.9l-6.13 3.64 1.66-7.03-5.4-4.48 7.19-.45L12 1.7z" />
            {/* Eyes */}
            <circle cx="8.5" cy="10" r="0.8" fill="#333" />
            <circle cx="15.5" cy="10" r="0.8" fill="#333" />
            {/* Smile */}
            <path
                d="M8.5 13.5c1.66 1.5 5.34 1.5 7 0"
                fill="none"
                stroke="#333"
                strokeWidth="0.7"
                strokeLinecap="round"
            />
        </svg>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-sm mx-4 overflow-hidden">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-white hover:text-gray-200 focus:outline-none z-10"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Gradient background at top */}
                <div
                    className="absolute top-0 left-0 right-0 h-44
bg-gradient-to-r from-green-400 to-blue-500
 rounded-b-[50%] transform translate-y-[-30%]"></div>

                {/* Modal content */}
                <div className="pt-20 pb-16 px-8 flex flex-col items-center relative z-0 -mt-12">
                    {/* Happy star icon */}
                    <div
                        className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center mb-4 border-4 border-white z-10">
                        <div
                            className="w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                            <HappyStar/>
                        </div>
                    </div><br/>

                    {/* Title */}
                    <h2 className="text-lg text-gray-700 font-medium font-bold mb-4 text-center">
                        How Would You Rate CiviLink Experience?
                    </h2>

                    {/* Star rating */}
                    <div className="flex items-center justify-center gap-2 mb-5">
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                                key={rating}
                                onClick={() => setSelectedRating(rating)}
                                onMouseEnter={() => setHoverRating(rating)}
                                onMouseLeave={() => setHoverRating(0)}
                                className="focus:outline-none transform transition-transform hover:scale-110"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="w-10 h-10"
                                    fill={
                                        rating <= (hoverRating || selectedRating)
                                            ? "#FFD700"
                                            : "none"
                                    }
                                    stroke={
                                        rating <= (hoverRating || selectedRating)
                                            ? "#FFD700"
                                            : "#D1D5DB"
                                    }
                                    strokeWidth="2"
                                >
                                    <path
                                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>

                            </button>
                        ))}
                    </div>

                    {/* Submit button */}
                    <button
                        onClick={handleSubmit}
                        className={`w-full py-2 px-4 rounded-md text-white font-medium transition-all text-sm ${
                            selectedRating > 0
                                ? "bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 shadow-sm hover:shadow-md"
                                : "bg-gray-300 cursor-not-allowed"
                        }`}
                        disabled={selectedRating === 0}
                    >
                        Submit
                    </button>

                    {/* No thanks button */}
                    <button
                        onClick={onClose}
                        className="mt-3 text-gray-500 hover:text-gray-700 font-medium text-sm"
                    >
                        No, Thanks!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RatingModal