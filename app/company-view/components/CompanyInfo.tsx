"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CompanyInfoProps {
    name: string;
    location: string;
    profileImage: string;
}

export default function CompanyInfo({ name, location, profileImage }: CompanyInfoProps) {
    return (
        <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-6 bg-white p-6 rounded-lg shadow-sm">
            <div className="relative w-full md:w-48 lg:w-full xl:w-48 h-48">
                <Image
                    src={profileImage}
                    alt={name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-lg"
                />
            </div>
            <div className="flex flex-col justify-center flex-grow">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">{name}</h1>
                </div>
                <p className="text-gray-600 mb-4">{location}</p>
                <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-md hover:from-green-500 hover:to-blue-600 transition-all">
                    <Link href="/messenger" target="_self" rel="noopener noreferrer">
                        Connect
                    </Link>
                </button>
            </div>
        </div>
    );
}
