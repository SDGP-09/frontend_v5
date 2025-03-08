"use client";
import React from "react";
import PromotionCard from "./PromotionCard";
import Image from 'next/image';

/**
 * HotDealsSection Component
 *
 * Displays the list of promotional offers ("Hot Deals") available along with a header and an option to add new deals.
 */
export default function HotDealsSection() {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Hot Deals</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                    Add New
                </button>
            </div>
            <div className="space-y-4">
                <PromotionCard
                    title="Spring Special Offer"
                    discount="20%"
                    description="off on all residential projects"
                    active={true}
                />
                <PromotionCard
                    title="Early Bird Discount"
                    discount="15%"
                    description="for bookings made 3 months in advance"
                    active={false}
                />
            </div>
        </div>
    );
}
