"use client";
import React, { useState, useCallback } from "react";
import RatingBar from "./RatingBar";
import RatingModal from "./RatingModal";
import { BadgeCheck, Star } from "lucide-react";

interface CompanyRatingsProps {
    ratings: { [key: number]: number };
    isApproved: boolean;
}

const CompanyRatings: React.FC<CompanyRatingsProps> = ({
                                                           ratings: initialRatings,
                                                           isApproved,
                                                       }) => {
    const [ratings, setRatings] = useState(initialRatings);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Calculate statistics
    const totalRatings = Object.values(ratings).reduce((a, b) => a + b, 0);
    const averageRating =
        Object.entries(ratings).reduce(
            (acc, [key, value]) => acc + Number(key) * value,
            0
        ) / totalRatings || 0;

    // Handle new rating submission
    const handleRatingSubmit = useCallback((rating: number) => {
        setRatings((prevRatings) => {
            const newRatings = { ...prevRatings };
            newRatings[rating] = (newRatings[rating] || 0) + 1;
            return newRatings;
        });

        // You could add an API call here to save the rating to your backend
    }, []);

    // Open and close modal handlers
    const openModal = useCallback(() => setIsModalOpen(true), []);
    const closeModal = useCallback(() => setIsModalOpen(false), []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold">Ratings</h2>
                    {isApproved && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <BadgeCheck className="w-4 h-4 mr-1" />
              Approved
            </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
                    <Star className="w-6 h-6 text-yellow-400 fill-current" />
                </div>
            </div>

            <div className="space-y-2">
                {Object.entries(ratings)
                    .sort((a, b) => Number(b[0]) - Number(a[0])) // Sort by rating in descending order
                    .map(([rating, count]) => (
                        <RatingBar
                            key={rating}
                            rating={Number(rating)}
                            count={count}
                            total={totalRatings}
                        />
                    ))}
            </div>

            <button
                onClick={openModal}
                className="mt-4 w-full bg-gradient-to-r from-green-400 to-blue-500
 px-6 py-2 rounded-md  hover:from-green-500 hover:to-blue-600 transition-all font-medium text-white"
            >
                Rate Civilink
            </button>

            {/* Rating Modal */}
            <RatingModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={handleRatingSubmit}
            />
        </div>
    );
};

export default CompanyRatings;