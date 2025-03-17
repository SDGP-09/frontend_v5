"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";

import CompanyInfo from "../components/CompanyInfo";
import CompanyRatings from "../components/CompanyRatings";
import AvailabilityCalendar from "../components/AvailabilityCalendar";
import HotDealsCarousel from "../components/HotDealsCarousel";
import OngoingProjects from "../components/OngoingProjects";
import CompletedProjects from "../components/CompletedProjects";
import { convertBackendToFrontEnd, calculateOccupiedDates, CompanyData, BackendCompanyData } from "../../util/dataConversion";


// Type the dummyData object
const dummyData: { [key: string]: CompanyData } = {
    "1":convertBackendToFrontEnd( {
        name: "BuildMaster Construction",
        location: "New York, NY",
        profileImage:
            "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800",
        isApproved: true,
        ratings: { 5: 150, 4: 80, 3: 20, 2: 5, 1: 2 },
        hotDeals: [
            {
                id: 1,
                title: "Spring Special Offer",
                description: "20% off on all residential projects",
                image:
                    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800",
            },
            {
                id: 2,
                title: "Commercial Package",
                description: "Complete office renovation package",
                image:
                    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800",
            },
        ],
        ongoingProjects: [
            {
                id: 1,
                title: "City Center Mall",
                image:
                    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800",
            },
            {
                id: 2,
                title: "Riverside Apartments",
                image:
                    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800",
            },
        ],
        completedProjects: [
            {
                id: 1,
                title: "Downtown Plaza",
                image:
                    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800",
            },
            {
                id: 2,
                title: "Harbor Bridge",
                image:
                    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800",
            },
        ],
        occupiedStartDate: "2024-03-15",
        occupiedEndDate: "2024-03-22",
    }),
    "2": convertBackendToFrontEnd({
        name: "Redwood Interiors",
        location: "Los Angeles, CA",
        profileImage:
            "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800",
        isApproved: false,
        ratings: { 5: 75, 4: 40, 3: 15, 2: 2, 1: 1 },
        hotDeals: [
            {
                id: 1,
                title: "Summer Renovation Special",
                description: "15% off on kitchen redesigns",
                image:
                    "https://images.unsplash.com/photo-1584986800933-0a6c9747b2ce?auto=format&fit=crop&w=800",
            },
            {
                id: 2,
                title: "Office Makeover",
                description: "Complete office interior for a flat rate",
                image:
                    "https://images.unsplash.com/photo-1618223155391-1fa1b8c70e07?auto=format&fit=crop&w=800",
            },
        ],
        ongoingProjects: [
            {
                id: 1,
                title: "Bayside Loft",
                image:
                    "https://images.unsplash.com/photo-1607603321898-dc02fe5fbbb0?auto=format&fit=crop&w=800",
            },
            {
                id: 2,
                title: "Downtown Penthouse",
                image:
                    "https://images.unsplash.com/photo-1607007059515-46e9b12fef47?auto=format&fit=crop&w=800",
            },
        ],
        completedProjects: [
            {
                id: 1,
                title: "Sunset Boulevard Office",
                image:
                    "https://images.unsplash.com/photo-1598300050211-4f03f6bbcb6e?auto=format&fit=crop&w=800",
            },
            {
                id: 2,
                title: "Historic Villa Remodel",
                image:
                    "https://images.unsplash.com/photo-1571941708172-3f8f58f6eb36?auto=format&fit=crop&w=800",
            },
        ],
        occupiedStartDate: "2024-03-10",
        occupiedEndDate: "2024-03-18",

    }),
};

export default function CompanyProfileByIdPage() {
    const params = useParams();
    let id: string;
    if (Array.isArray(params.id)) {
        id = params.id[0];
    } else if (params.id) {
        id = params.id;
    } else {
        id = "1"; // Default to "1" if no id is provided
    }

    const [companyData, setCompanyData] = useState<CompanyData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // Removed unused variables: isEditing, handleInputChange, and handleSubmit
    const [formData, setFormData] = useState<CompanyData | null>(null);
    const isInitialMount = useRef<boolean>(true);

    // Simulate fetching dummy data based on the "id" parameter
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            if (dummyData[id]) {
                const company = dummyData[id];
                setCompanyData(dummyData[id]);
                setFormData(dummyData[id]);
            } else {
                setCompanyData(null);
            }
            setIsLoading(false);
        }, 1000); // Simulated network delay
        return () => clearTimeout(timer);
    }, [id]);

    // Simulate saving updated data (skip initial mount)
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            console.log("Saving updated data for id:", id, companyData);
        }
    }, [companyData, id]);

    if (isLoading) return <div>Loading...</div>;
    if (!companyData) return <div>No company data found for id: {id}</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* FIRST ROW: Company Info, Ratings, Calendar */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <CompanyInfo
                        name={companyData.name}
                        location={companyData.location}
                        profileImage={companyData.profileImage}
                    />
                    <CompanyRatings
                        ratings={companyData.ratings}
                        isApproved={companyData.isApproved}
                    />
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Availability</h2>
                        <AvailabilityCalendar occupiedDates={companyData.occupiedDates} />
                    </div>
                </div>

                {/* SECOND ROW: Hot Deals and Ongoing Projects */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <HotDealsCarousel deals={companyData.hotDeals} />
                    <OngoingProjects projects={companyData.ongoingProjects} />
                </div>

                {/* THIRD ROW: Completed Projects */}
                <CompletedProjects projects={companyData.completedProjects} />
            </div>
        </div>
    );
}
