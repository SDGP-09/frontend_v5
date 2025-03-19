"use client";


import React, { useState, Suspense } from "react";
import FilterDropdown from "./components/FilterDropdown";
import AdsList from "./components/AdsList";
import { Ad } from "@/app/types";

interface BackendDealPortable {
    id: number;
    ownerId: number;
    title: string;
    description: string;
    dealField: string;
    imageLinks: string[];
    fullDescription: string;
    show: boolean;
    perHour: number;
    perDay: number;
    perWeek: number;
    perMonth: number;
    perYear: number;
    price: number;
}

function convertDealPortableToAd(backendDeal: BackendDealPortable): Ad {
    return {
        id: backendDeal.id,
        ownerId: backendDeal.ownerId,
        title: backendDeal.title,
        description: backendDeal.description,
        field: backendDeal.dealField,
        images: backendDeal.imageLinks,
        fullDescription: backendDeal.fullDescription,
        prices: {
            hour: backendDeal.perHour,
            day: backendDeal.perDay,
            week: backendDeal.perWeek,
            month: backendDeal.perMonth,
            year: backendDeal.perYear,
        },
        visibility: backendDeal.show,
    };
}

/**
 * 1) We have some sample data to demonstrate the functionality.
 *    In a real app, you might fetch this data from an API or server.
 */
const sampleAds: Ad[] = [
    {
        id: 1,
        ownerId: 1,
        title: "Heavy Equipment Operator",
        description:
            "Experienced operator available for construction projects. Specialized in excavators and bulldozers.",
        field: "logistics",
        prices: {
            "hour": 200,
            "day": 190,
            "week": 180,
            "month": 170,
            "year": 160,
        },
        visibility: true,
        images: [
            "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1578864669335-71f3f5ad4d1e?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&q=80&w=2070",
        ],
        fullDescription:
            "With over 10 years of experience in operating heavy construction equipment, I specialize in precise excavation, land clearing, and material handling. Available for both short-term and long-term projects. Certified and insured.",
    },
    {
        id: 2,
        ownerId: 2,
        title: "Electrical Engineering Consultant",
        description:
            "Professional electrical engineer offering consulting services for construction projects.",
        field: "power",
        prices: {
            "hour": 200,
            "day": 190,
            "week": 180,

        },
        visibility: true,
        images: [
            "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1581092162384-8987c1d64926?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=2070",
        ],
        fullDescription:
            "Specialized in electrical system design, power distribution, and energy efficiency solutions. Offering comprehensive consulting services for residential and commercial construction projects. Available for site visits and remote consultations.",
    },
];

/**
 * 2) We have fields that the dropdown uses for filtering.
 */
const fields = ["all", "logistics", "power", "construction", "consulting"];

/**
 * 3) Our main component that ties everything together.
 */
export default function HotDealsPage() {
    // We store the currently selected field for filtering.
    const [selectedField, setSelectedField] = useState("all");

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/*
        The NavBar and layout are already handled by your global layout.tsx,
        so we don't import or add them again here.
      */}

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/*
          1) Filter Dropdown
             - We pass fields and our state for selectedField.
             - When the dropdown changes, we update the state (selectedField).
        */}
                <FilterDropdown
                    fields={fields}
                    selectedField={selectedField}
                    onFieldSelect={(newField) => setSelectedField(newField)}
                />

                {/*
          2) Ads List
             - We pass the sampleAds and the current selectedField.
             - The AdsList will handle filtering and the modals internally.
        */}
                <Suspense fallback={<div>Loading ads...</div>}>
                <AdsList ads={sampleAds} selectedField={selectedField} />
                </Suspense>
                </main>
        </div>
    );
}