"use client";
import React, { useState } from "react";
import ManageAdCard from "./ManageAdCard";
import ManageAdModal from "./ManageAdModal";
import { Ad } from "@/app/types/advertisement.hot-deals";

interface ManageAdsListProps {
    ads: Ad[];
    selectedField: string;
    onUpdateAd: (ad: Ad) => void;
    onCreateAd: (ad: Omit<Ad, "id">) => void;
}

export default function ManageAdsList({
                                          ads,
                                          selectedField,
                                          onUpdateAd,
                                          onCreateAd,
                                      }: ManageAdsListProps) {
    // Track the selected Ad (for editing in modal)
    const [selectedAd, setSelectedAd] = useState<Ad | null>(null);

    // Filter by field
    const filteredAds =
        selectedField === "all"
            ? ads
            : ads.filter((ad) => ad.field === selectedField);

    // Create a new blank ad (on click of the black card)
    const handleCreateNew = () => {
        const newAd: Omit<Ad, "id"> = {
            title: "",
            ownerId: 0, //Make sure that you will be making changers on this GAYATHMA to that the id from params will be assigned here
            description: "",
            field: selectedField === "all" ? "logistics" : selectedField,
            prices: {},
            images: [],
            fullDescription: "",
            visibility: true,
        };
        setSelectedAd({ ...newAd, id: 0 }); // Temporarily use 0
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAds.map((ad) => (
                    <ManageAdCard
                        key={ad.id}
                        ad={ad}
                        onSelectAd={(selected) => setSelectedAd(selected)}
                        onUpdateAd={onUpdateAd}
                    />
                ))}

                {/* The "Create new" card */}
                <div
                    className="bg-gray-900 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] cursor-pointer flex items-center justify-center h-[300px]"
                    onClick={handleCreateNew}
                >
                    {/* A plus icon to indicate creation */}
                    <svg
                        className="w-16 h-16 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>

            {/* The Modal for editing/creating if there's a selectedAd */}
            {selectedAd && (
                <ManageAdModal
                    ad={selectedAd}
                    onClose={() => setSelectedAd(null)}
                    onUpdateAd={onUpdateAd}
                    onCreateAd={onCreateAd}
                />
            )}
        </>
    );
}
