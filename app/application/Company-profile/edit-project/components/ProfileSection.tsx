"use client";
import React from "react";
import Image from "next/image";
import { Star, Edit2 } from "lucide-react";

/**
 * ProfileSectionProps
 *
 * @param companyName - The name of the company.
 * @param location - The company's location.
 * @param rating - The company's rating.
 * @param reviewsCount - The number of reviews.
 * @param onEditProfile - Callback function when "Edit Profile" is clicked.
 * @param profileImage - URL of the company’s profile image.
 */
interface ProfileSectionProps {
    companyName: string;
    location: string;
    rating: number;
    reviewsCount: number;
    onEditProfile: () => void;
    profileImage: string;
}

/**
 * ProfileSection Component
 *
 * Displays the company’s profile information along with an option to edit the profile.
 */
export default function ProfileSection({
                                           companyName,
                                           location,
                                           rating,
                                           reviewsCount,
                                           onEditProfile,
                                           profileImage,
                                       }: ProfileSectionProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex gap-6">
                <Image
                    src={profileImage}
                    alt={companyName}
                    width={160} // Equivalent to w-40 (40 * 4px = 160px)
                    height={160} // Equivalent to h-40
                    className="rounded-lg object-cover"
                    priority // Ensures faster loading for key images
                />
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold">{companyName}</h1>
                    <p className="text-gray-600">{location}</p>
                    <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold">{rating}</span>
                        <span className="text-gray-500">({reviewsCount} reviews)</span>
                    </div>
                    {/* Edit Profile Button */}
                    <button
                        onClick={onEditProfile}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:bg-blue-700 transition mt-2"
                    >
                        <Edit2 className="w-4 h-4" />
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
}
