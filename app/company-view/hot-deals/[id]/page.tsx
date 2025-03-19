"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Ad } from "@/app/types/advertisement.hot-deals";
import AdsList from "@/app/company-view/hot-deals/components/AdsList";


// Dummy data for demonstration
const sampleAds: Ad[] = [
    {
        id: 1,
        ownerId: 1,
        title: "Heavy Equipment Operator",
        description:
            "Experienced operator available for construction projects. Specialized in excavators and bulldozers.",
        field: "logistics",
        prices: {
            hour: 200,
            day: 190,
            week: 180,
            month: 170,
            year: 160,
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
            hour: 200,
            day: 190,
            week: 180,
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

export default function AdDetailPage() {
    // Retrieve the id from the URL parameters
    const params = useParams();
    const adId = Number(params.id);

    // Find the ad that matches the id
    const ad = sampleAds.find((ad) => ad.id === adId);

    if (!ad) {
        return <div>Ad not found.</div>;
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold mb-6">{ad.title}</h1>
                <p className="text-gray-700 mb-4">{ad.description}</p>
                <div className="flex flex-wrap gap-4 mb-4">
                    {ad.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`${ad.title} image ${index + 1}`}
                            className="w-1/3 object-cover rounded"
                        />
                    ))}
                </div>
                <p className="mb-4">{ad.fullDescription}</p>
                <div>
                    <h2 className="text-xl font-semibold mb-2">Pricing</h2>
                    <ul className="list-disc ml-5">
                        {Object.entries(ad.prices).map(([interval, price]) => (
                            <li key={interval}>
                                Per {interval}: ${price}
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
}
