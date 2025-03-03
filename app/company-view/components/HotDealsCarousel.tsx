// application/Company-profile/ongoing-projects/components/HotDealsCarousel.tsx
"use client";
import React, { useState, useEffect } from "react";

interface Deal {
    id: number;
    title: string;
    description: string;
    image: string;
}

interface HotDealsCarouselProps {
    deals: Deal[];
}

const HotDealsCarousel: React.FC<HotDealsCarouselProps> = ({ deals }) => {
    const [currentDeal, setCurrentDeal] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDeal((prev) => (prev + 1) % deals.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [deals.length]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm h-full">
            <h2 className="text-xl font-semibold mb-6">Hot Deals</h2>
            <div className="relative">
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-500"
                        style={{ transform: `translateX(-${currentDeal * 100}%)` }}
                    >
                        {deals.map((deal) => (
                            <div key={deal.id} className="w-full flex-shrink-0">
                                <div className="relative aspect-video rounded-lg overflow-hidden">
                                    <img
                                        src={deal.image}
                                        alt={deal.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                        <h3 className="text-white font-semibold">{deal.title}</h3>
                                        <p className="text-white/80 text-sm">{deal.description}</p>
                                        <button className="mt-2 bg-white text-gray-900 px-4 py-1 rounded-md text-sm hover:bg-gray-100 transition-colors">
                                            Learn More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {deals.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentDeal(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                currentDeal === index
                                    ? "w-8 bg-white"
                                    : "w-2 bg-white/60 hover:bg-white/80"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HotDealsCarousel;
