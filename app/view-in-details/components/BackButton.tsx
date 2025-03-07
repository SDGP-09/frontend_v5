"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const BackButton = () => {
    return (
        <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                    <ChevronLeft size={20} />
                    <span className="ml-1">Back to Projects</span>
                </Link>
            </div>
        </div>
    );
};

export default BackButton;
