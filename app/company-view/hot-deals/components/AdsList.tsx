"use client";

import React, { useState } from "react";
import { Ad } from "@/app/types"; // adjust the import path if needed
import AdCard from "./AdCard";
import AdModal from "./AdModal";
import ImageModal from "./ImageModal";

interface AdsListProps {
    ads: Ad[];
    selectedField: string;
}

export default function AdsList({ ads, selectedField }: AdsListProps) {
    // Store the currently selected Ad (for detail modal)
    const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
    // Store the currently enlarged image URL (for image modal)
    const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

    // Filter logic: if "all" is selected, show all. Otherwise match the `field`.
    const filteredAds = selectedField === "all"
        ? ads
        : ads.filter((ad) => ad.field === selectedField);

    // This opens the detail modal (AdModal) if user clicks anywhere
    // on the card except the "Make a deal!" button.
    const handleCardClick = (ad: Ad) => {
        setSelectedAd(ad);
    };

    // This closes the detail modal by setting selectedAd to null.
    const handleCloseAdModal = () => {
        setSelectedAd(null);
    };

    // This opens the image modal for a specific image.
    const handleEnlargeImage = (imageUrl: string) => {
        setEnlargedImage(imageUrl);
    };

    // This closes the image modal.
    const handleCloseImageModal = () => {
        setEnlargedImage(null);
    };

    return (
        <>
            {/*
        Grid layout of Ad Cards
      */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAds.map((ad) => (
                    <AdCard
                        key={ad.id}
                        ad={ad}
                        onCardClick={() => handleCardClick(ad)}
                    />
                ))}
            </div>

            {/*
        The Ad detail modal (shows up if selectedAd != null).
      */}
            {selectedAd && (
                <AdModal
                    ad={selectedAd}
                    onClose={handleCloseAdModal}
                    onImageClick={handleEnlargeImage}
                />
            )}

            {/*
        The enlarged image modal (shows up if enlargedImage != null).
      */}
            {enlargedImage && (
                <ImageModal
                    imageUrl={enlargedImage}
                    onClose={handleCloseImageModal}
                />
            )}
        </>
    );
}