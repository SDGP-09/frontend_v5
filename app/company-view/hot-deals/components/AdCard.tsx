"use client";

import React from "react";
import { Ad } from "@/app/types";

interface AdCardProps {
    ad: Ad;
    onCardClick: () => void;
}

export default function AdCard({ ad, onCardClick }: AdCardProps) {
    /**
     * We have a button "Make a deal!" that stops event propagation so it
     * doesn't open the modal. That way the user can do something else with it
     * (like connecting them to a chat or negotiation flow).
     */
    const handleDealButtonClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        // You can do anything you want here, e.g. open a chat window
        alert("Make a deal button clicked!");
    };

    return (
        <div
            onClick={onCardClick}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] cursor-pointer group
             flex flex-col h-full"
        >
            {/* Card Image */}
            <div className="relative h-48">
                <img
                    src={ad.images[0]}
                    alt={ad.title}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white font-semibold text-lg">View more details</span>
                </div>
            </div>

            {/* Card Body */}
            <div className="p-4 flex flex-col flex-1 justify-between">
                <h3 className="text-xl font-semibold mb-2">{ad.title}</h3>
                <p className="text-gray-600 mb-4">{ad.description}</p>

                <button
                    onClick={handleDealButtonClick}
                    className="w-full px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300"
                >
                    Make a deal!
                </button>
            </div>
        </div>
    );
}