"use client";
import React, { useState } from "react";
import ProfileSection from "./ProfileSection";
import CalendarSection from "./CalendarSection";
import HotDealsSection from "./HotDealsSection";
import OngoingProjectsSection from "./OngoingProjectsSection";
import CompletedProjectsSection from "./CompletedProjectsSection";

/**
 * CompanyDashboard
 *
 * This is the main dashboard component for the company profile.
 * It renders:
 *  - The ProfileSection (company information and edit button)
 *  - The CalendarSection (availability calendar)
 *  - The HotDealsSection (promotional offers)
 *  - The OngoingProjectsSection (list of active projects)
 *  - The CompletedProjectsSection (grid of completed projects)
 *
 * It also manages the state for selected calendar dates and the edit profile mode.
 */
export default function CompanyDashboard() {
    // State for calendar selected dates
    const [selectedDates, setSelectedDates] = useState<number[]>([15, 16, 20, 21, 22]);
    // State for editing the profile (could be used to toggle an edit form)
    const [isEditingProfile, setIsEditingProfile] = useState(false);

    /**
     * toggleDateSelection
     * Toggles the selection of a day on the calendar.
     *
     * @param day - The day (number) to toggle.
     */
    const toggleDateSelection = (day: number) => {
        setSelectedDates((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* First Row: Profile and Calendar */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Profile Section */}
                    <div className="col-span-8">
                        <ProfileSection
                            companyName="BuildMaster Construction"
                            location="New York, NY"

                            rating={4.4}
                            reviewsCount={257}
                            isEditingProfile={isEditingProfile}
                            onEditProfile={() => setIsEditingProfile(true)}
                            profileImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=300&h=300"
                        />
                    </div>
                    {/* Calendar Section */}
                    <div className="col-span-4">
                        <CalendarSection
                            selectedDates={selectedDates}
                            toggleDateSelection={toggleDateSelection}
                        />
                    </div>
                </div>

                {/* Second Row: Hot Deals and Ongoing Projects */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Hot Deals Section */}
                    <div className="col-span-4">
                        <HotDealsSection />
                    </div>
                    {/* Ongoing Projects Section */}
                    <div className="col-span-8">
                        <OngoingProjectsSection />
                    </div>
                </div>

                {/* Third Row: Completed Projects */}
                <CompletedProjectsSection />
            </div>
        </div>
    );
}
