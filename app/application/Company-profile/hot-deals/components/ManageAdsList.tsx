"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

    const router = useRouter();
    const searchParams = useSearchParams();
    // Track the selected Ad (for editing in modal)
    const [selectedAd, setSelectedAd] = useState<Ad | null>(null);

    // On mount or when searchParams/ads change, check if there's an id in the URL.
    useEffect(() => {
        const idParam = searchParams.get("id");
        if (idParam) {
            const adId = Number(idParam);
            const foundAd = ads.find((ad) => ad.id === adId);
            if (foundAd) {
                setSelectedAd(foundAd);
            }
        }
    }, [searchParams, ads]);

    // Filter by field
    const filteredAds =
        selectedField === "all"
            ? ads
            : ads.filter((ad) => ad.field === selectedField);

    // When an ad card is clicked, select that ad and update the URL with its id
    const handleSelectAd = (ad: Ad) => {
        console.log("Ad selected:", ad);
        setSelectedAd(ad);
        window.history.pushState(null, "", `/application/Company-profile/hot-deals/${ad.id}`);
    };

    // When the modal is closed, clear the selected ad and remove the id from the URL
    const handleCloseModal = () => {
        setSelectedAd(null);
        window.history.pushState(null, "", `/application/Company-profile/hot-deals`);
    };

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
        window.history.pushState(null, "", `/application/Company-profile/hot-deals/0`);
    };

    return (
        <Suspense fallback={<div>Loading ads...</div>}>
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAds.map((ad) => (
                    <ManageAdCard
                        key={ad.id}
                        ad={ad}
                        onSelectAd={handleSelectAd}
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
                    onClose={handleCloseModal}
                    onUpdateAd={onUpdateAd}
                    onCreateAd={onCreateAd}
                />
            )}
        </>
        </Suspense>
    );
}
