
"use client";
import React from "react";
import CompanyInfo from "./components/CompanyInfo";
import CompanyRatings from "./components/CompanyRatings";
import AvailabilityCalendar from "./components/AvailabilityCalendar";
import HotDealsCarousel from "./components/HotDealsCarousel";
import OngoingProjects from "./components/OngoingProjects";
import CompletedProjects from "./components/CompletedProjects";

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

const ongoingProjectsData = [
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

const completedProjectsData = [
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

export default function CompanyProfilePage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* First Row */}
            <div className="max-w-7xl mx-auto w-full px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <CompanyInfo
                        name={companyData.name}
                        location={companyData.location}
                        profileImage={companyData.profileImage}
                    />

                    {/* Ratings */}
                    <CompanyRatings
                        ratings={companyData.ratings}
                        isApproved={companyData.isApproved}
                    />

                    {/* Calendar */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Availability</h2>
                        <AvailabilityCalendar occupiedDates={companyData.occupiedDates} />
                    </div>
                </div>
            </div>

            {/* Second Row */}
            <div className="max-w-7xl mx-auto w-full px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Hot Deals Carousel */}
                    <HotDealsCarousel deals={hotDeals} />

                    {/* Ongoing Projects */}
                    <OngoingProjects projects={ongoingProjectsData} />
                </div>
            </div>

            {/* Third Row */}
            <div className="max-w-7xl mx-auto w-full px-4 py-8">
                <CompletedProjects projects={completedProjectsData} />
            </div>
        </div>
    );
}
