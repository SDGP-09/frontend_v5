"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Ad } from "@/app/types/advertisement.hot-deals";
import ManageAdModal from "../components/ManageAdModal";

// Dummy data – in a real app, you’d fetch the specific ad by id.
const sampleAds: Ad[] = [
    {
        id: 1,
        ownerId: 1,
        title: "Heavy Equipment Operator",
        description: "Experienced operator available...",
        field: "logistics",
        prices: { hour: 150, day: 1000, week: 5000 },
        visibility: true,
        images: [
            "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1578864669335-71f3f5ad4d1e?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&q=80&w=2070",
        ],
        fullDescription: "With over 10 years of experience...",
    },
    {
        id: 2,
        ownerId: 1,
        title: "Electrical Engineering Consultant",
        description: "Professional electrical engineer offering...",
        field: "power",
        prices: { hour: 200, day: 1500, month: 25000 },
        visibility: false,
        images: [
            "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1581092162384-8987c1d64926?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=2070",
        ],
        fullDescription: "Specialized in electrical system design...",
    },
];

export default function ManageAdDetailPage() {
    const params = useParams();
    const router = useRouter();
    const adId = Number(params.id);
    const ad = sampleAds.find((item) => item.id === adId);

    if (!ad) {
        return <div>Ad not found.</div>;
    }

    const handleUpdateAd = (updatedAd: Ad) => {
        console.log("Updated ad:", updatedAd);
        router.push("/application/Company-profile/hot-deals");
    };

    const handleCreateAd = (newAd: Omit<Ad, "id">) => {
        console.log("Created ad:", newAd);
        router.push("/application/Company-profile/hot-deals");
    };

    // The onClose simply navigates back to the list
    const handleClose = () => {
        router.push("/application/Company-profile/hot-deals");
    };

    // Render the modal overlay for editing/viewing the ad.
    return (
        <ManageAdModal
            ad={ad}
            onClose={handleClose}
            onUpdateAd={handleUpdateAd}
            onCreateAd={handleCreateAd}
        />
    );
}
