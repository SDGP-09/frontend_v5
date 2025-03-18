"use client";

import Image from "next/image";
import { Contractor } from "./contractorService"; // Adjust the path as needed

export default function ContractorCard({ contractor }: { contractor: Contractor }) {
    if (!contractor || !contractor.name) {
        return (
            <div className="bg-white border rounded-lg shadow-lg p-6">
                <p className="text-red-500">Contractor data not available</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Contractor Image */}
            <div className="relative h-48 w-full">
                <Image
                    src={contractor.profilePicture || "/placeholder.jpg"}
                    alt={contractor.name}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Card Content */}
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    {contractor.name}
                </h2>
                {/* Optional rating and projects row */}
                {contractor.rating && contractor.projects && (
                    <div className="flex items-center mt-2 text-sm text-gray-600">
            <span className="text-yellow-400 mr-1">
              ★ {contractor.rating.toFixed(1)}
            </span>
                        <span className="text-gray-500">| {contractor.projects} projects</span>
                    </div>
                )}
                <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                    Connect
                </button>
            </div>
        </div>
    );
}
