
"use client";
import React from "react";
import RatingBar from "./RatingBar";
import { BadgeCheck, Star } from "lucide-react";

interface CompanyRatingsProps {
    ratings: { [key: number]: number };
    isApproved: boolean;
}

const CompanyRatings: React.FC<CompanyRatingsProps> = ({ ratings, isApproved }) => {
    const totalRatings = Object.values(ratings).reduce((a, b) => a + b, 0);
    const averageRating =
        Object.entries(ratings).reduce(
            (acc, [key, value]) => acc + Number(key) * value,
            0
        ) / totalRatings;

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
                    .reverse()
                    .map(([rating, count]) => (
                        <RatingBar key={rating} rating={Number(rating)} count={count} total={totalRatings} />
                    ))}
            </div>
            <button className="mt-4 w-full bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition-all">
                Rate Company
            </button>
        </div>
    );
};

export default CompanyRatings;
