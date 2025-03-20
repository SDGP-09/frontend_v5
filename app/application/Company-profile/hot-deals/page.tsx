"use client";
/**
 * This file is the Next.js 13+ route for "/application/Company-profile/hot-deals".
 * It replaces your old "ManageAds.tsx" from the separate React project.
 */
import React, { useState, Suspense } from "react";
import { Building2, ChevronDown } from "lucide-react";
import ManageAdsList from "./components/ManageAdsList";
// import your Ad type from whichever file you are storing it in.
import { Ad } from "@/app/types/advertisement.hot-deals";

/**
 * Sample data for demonstration.
 * In a real app, you might fetch from an API or server.
 */
const sampleAds: Ad[] = [
    {
        id: 1,
        ownerId: 1,
        title: "Heavy Equipment Operator",
        description: "Experienced operator available...",
        field: "logistics",
        prices: { hour: 150, day: 1000, week: 5000 },
        images: [
            "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1578864669335-71f3f5ad4d1e?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&q=80&w=2070",
        ],
        fullDescription:
            "With over 10 years of experience in operating heavy construction equipment...",
        visibility: true,
    },
    {
        id: 2,
        ownerId: 2,
        title: "Electrical Engineering Consultant",
        description: "Professional electrical engineer offering...",
        field: "power",
        prices: { hour: 200, day: 1500, month: 25000 },
        images: [
            "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1581092162384-8987c1d64926?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=2070",
        ],
        fullDescription:
            "Specialized in electrical system design, power distribution...",
        visibility: false,
    },
];

const fields = ["all", "logistics", "power", "construction", "consulting"];

export default function ManageHotDealsPage() {
    // Drop-down state
    const [selectedField, setSelectedField] = useState("all");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // The ads are stored in local state
    const [ads, setAds] = useState<Ad[]>(sampleAds);

    /**
     * Dummy function to handle updating an existing ad.
     * In real usage, you'd call an API, then update local state.
     */
    const handleUpdateAd = (updatedAd: Ad) => {
        setAds((prev) =>
            prev.map((ad) => (ad.id === updatedAd.id ? updatedAd : ad))
        );
    };

    /**
     * Dummy function to handle creating a new ad.
     */
    const handleCreateAd = (newAd: Omit<Ad, "id">) => {
        const nextId = Math.max(...ads.map((a) => a.id)) + 1;
        const ad: Ad = { ...newAd, id: nextId };
        setAds((prev) => [...prev, ad]);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="relative mb-8">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-48 px-4 py-2 text-left bg-white rounded-lg shadow flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    >
            <span className="capitalize">
              {selectedField === "all" ? "All Fields" : selectedField}
            </span>
                        <ChevronDown
                            className={`w-5 h-5 transition-transform duration-200 ${
                                isDropdownOpen ? "transform rotate-180" : ""
                            }`}
                        />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                            {fields.map((field) => (
                                <button
                                    key={field}
                                    onClick={() => {
                                        setSelectedField(field);
                                        setIsDropdownOpen(false);
                                    }}
                                    className="w-full px-4 py-2 text-left capitalize hover:bg-gray-50 transition-colors duration-200"
                                >
                                    {field === "all" ? "All Fields" : field}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* The main listing of Ads */}
                <Suspense fallback={<div>Loading ads...</div>}>
                <ManageAdsList
                    ads={ads}
                    selectedField={selectedField}
                    onUpdateAd={handleUpdateAd}
                    onCreateAd={handleCreateAd}
                />
                </Suspense>
            </main>
        </div>
    );
}
