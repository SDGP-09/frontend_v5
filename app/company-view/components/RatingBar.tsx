// application/Company-profile/ongoing-projects/components/RatingBar.tsx
"use client";
import React from "react";

interface RatingBarProps {
    rating: number;
    count: number;
    total: number;
}

const RatingBar: React.FC<RatingBarProps> = ({ rating, count, total }) => {
    const percentage = (count / total) * 100;
    return (
        <div className="flex items-center gap-2">
            <span className="w-8 text-sm">{rating}★</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <span className="w-12 text-sm text-gray-600">{count}</span>
        </div>
    );
};

export default RatingBar;
