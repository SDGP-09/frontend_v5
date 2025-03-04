"use client";
import React, { useState, useEffect } from "react";
import {


    Star,

    BadgeCheck,
    Info,
} from "lucide-react";
import Image from "next/image";

// Sample data - in a real app, this would come from an API
const companyData = {
    name: "BuildMaster Construction",
    location: "New York, NY",
    profileImage:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
    isApproved: true,
    ratings: {
        5: 150,
        4: 80,
        3: 20,
        2: 5,
        1: 2,
    },
    occupiedDates: [
        "2024-03-15",
        "2024-03-16",
        "2024-03-20",
        "2024-03-21",
        "2024-03-22",
    ],
};

const hotDeals = [
    {
        id: 1,
        title: "Spring Special Offer",
        description: "20% off on all residential projects",
        image:
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 2,
        title: "Commercial Package",
        description: "Complete office renovation package",
        image:
            "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 3,
        title: "Quick Service Deal",
        description: "Same day consultation for urgent projects",
        image:
            "https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?auto=format&fit=crop&q=80&w=800",
    },
];

const ongoingProjects = [
    {
        id: 1,
        title: "City Center Mall",
        image:
            "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 2,
        title: "Riverside Apartments",
        image:
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 3,
        title: "Tech Park Phase 2",
        image:
            "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 4,
        title: "Green Valley Homes",
        image:
            "https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?auto=format&fit=crop&q=80&w=800",
    },
];

const completedProjects = [
    {
        id: 1,
        title: "Downtown Plaza",
        image:
            "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 2,
        title: "Harbor Bridge",
        image:
            "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 3,
        title: "Metro Station",
        image:
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 4,
        title: "Sports Complex",
        image:
            "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=800",
    },
];

const RatingBar = ({
                       rating,
                       count,
                       total,
                   }: {
    rating: number;
    count: number;
    total: number;
}) => {
    const percentage = (count / total) * 100;
    return (
        <div className="flex items-center gap-2">
            <span className="w-8 text-sm">{rating}★</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <span className="w-12 text-sm text-gray-600">{count}</span>
        </div>
    );
};

const AvailabilityCalendar = () => {
    const today = new Date();
    const daysInMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
    ).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <div className="grid grid-cols-7 gap-1 p-4 bg-white rounded-lg shadow-sm">
            {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                <div
                    key={day}
                    className="text-center text-sm font-semibold text-gray-600"
                >
                    {day}
                </div>
            ))}
            {days.map((day) => {
                const isOccupied = companyData.occupiedDates.includes(
                    `2024-03-${day.toString().padStart(2, "0")}`
                );
                return (
                    <div
                        key={day}
                        className={`text-center p-1 text-sm rounded ${
                            isOccupied ? "bg-red-100 text-red-600" : "text-gray-700"
                        }`}
                    >
                        {day}
                    </div>
                );
            })}
        </div>
    );
};

function CompanyProfile() {
    const [currentDeal, setCurrentDeal] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDeal((prev) => (prev + 1) % hotDeals.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const totalRatings = Object.values(companyData.ratings).reduce(
        (a, b) => a + b,
        0
    );
    const averageRating =
        Object.entries(companyData.ratings).reduce(
            (acc, [key, value]) => acc + Number(key) * value,
            0
        ) / totalRatings;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* First Row */}
            <div className="max-w-7xl mx-auto w-full px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-6 bg-white p-6 rounded-lg shadow-sm">
                        <Image
                            src={companyData.profileImage}
                            alt={companyData.name}
                            className="w-full md:w-48 lg:w-full xl:w-48 h-48 object-cover rounded-lg"
                        />
                        <div className="flex flex-col justify-center flex-grow">
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold">{companyData.name}</h1>
                            </div>
                            <p className="text-gray-600 mb-4">{companyData.location}</p>
                            <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-md hover:from-green-500 hover:to-blue-600 transition-all">
                                Connect
                            </button>
                        </div>
                    </div>

                    {/* Ratings */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <h2 className="text-xl font-semibold">Ratings</h2>
                                {companyData.isApproved && (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <BadgeCheck className="w-4 h-4 mr-1" />
                    Approved
                  </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">
                  {averageRating.toFixed(1)}
                </span>
                                <Star className="w-6 h-6 text-yellow-400 fill-current" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            {Object.entries(companyData.ratings)
                                .reverse()
                                .map(([rating, count]) => (
                                    <RatingBar
                                        key={rating}
                                        rating={Number(rating)}
                                        count={count}
                                        total={totalRatings}
                                    />
                                ))}
                        </div>
                        <button className="mt-4 w-full bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition-all">
                            Rate Company
                        </button>
                    </div>

                    {/* Calendar */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Availability</h2>
                        <AvailabilityCalendar />
                    </div>
                </div>
            </div>

            {/* Second Row */}
            <div className="max-w-7xl mx-auto w-full px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Hot Deals Carousel */}
                    <div className="bg-white p-6 rounded-lg shadow-sm h-full">
                        <h2 className="text-xl font-semibold mb-6">Hot Deals</h2>
                        <div className="relative">
                            <div className="overflow-hidden">
                                <div
                                    className="flex transition-transform duration-500"
                                    style={{ transform: `translateX(-${currentDeal * 100}%)` }}
                                >
                                    {hotDeals.map((deal) => (
                                        <div key={deal.id} className="w-full flex-shrink-0">
                                            <div className="relative aspect-video rounded-lg overflow-hidden">
                                                <Image
                                                    src={deal.image}
                                                    alt={deal.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                                    <h3 className="text-white font-semibold">
                                                        {deal.title}
                                                    </h3>
                                                    <p className="text-white/80 text-sm">
                                                        {deal.description}
                                                    </p>
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
                                {hotDeals.map((_, index) => (
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

                    {/* Ongoing Projects */}
                    <div className="bg-white p-6 rounded-lg shadow-sm h-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Ongoing Projects</h2>
                            <button className="text-blue-500 hover:text-blue-600 transition-colors">
                                View All
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <div className="flex gap-4 pb-4">
                                {ongoingProjects.map((project) => (
                                    <div
                                        key={project.id}
                                        className="flex-shrink-0 w-72 group hover:transform hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <div className="relative aspect-video rounded-lg overflow-hidden">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button className="bg-white text-gray-900 px-4 py-2 rounded-md flex items-center gap-2">
                                                    <Info className="w-4 h-4" />
                                                    Details
                                                </button>
                                            </div>
                                        </div>
                                        <h3 className="mt-2 font-semibold">{project.title}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Third Row */}
            <div className="max-w-7xl mx-auto w-full px-4 py-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Completed Projects</h2>
                        <button className="text-blue-500 hover:text-blue-600 transition-colors">
                            View All
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <div className="flex gap-4 pb-4">
                            {completedProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="flex-shrink-0 w-72 group hover:transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="relative aspect-video rounded-lg overflow-hidden">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button className="bg-white text-gray-900 px-4 py-2 rounded-md flex items-center gap-2">
                                                <Info className="w-4 h-4" />
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className="mt-2 font-semibold">{project.title}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyProfile;
