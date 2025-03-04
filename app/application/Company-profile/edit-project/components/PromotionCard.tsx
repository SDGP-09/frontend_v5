"use client";
import React from "react";

/**
 * PromotionCardProps
 *
 * @param title - The title of the promotion.
 * @param discount - The discount offered.
 * @param description - A short description of the promotion.
 * @param active - Boolean flag indicating if the promotion is active.
 */
interface PromotionCardProps {
    title: string;
    discount: string;
    description: string;
    active: boolean;
}

/**
 * PromotionCard Component
 *
 * Renders a single promotional offer card with a title, discount details, and an active toggle.
 */
export default function PromotionCard({
                                          title,
                                          discount,
                                          description,
                                          active,
                                      }: PromotionCardProps) {
    return (
        <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-medium">{title}</h3>
                    <p className="text-sm text-gray-600">
                        {discount} {description}
                    </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={active}
                        readOnly
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>
        </div>
    );
}
