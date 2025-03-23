"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import CompanyInfo from "../components/CompanyInfo";
import CompanyRatings from "../components/CompanyRatings";
import AvailabilityCalendar from "../components/AvailabilityCalendar";
import HotDealsCarousel from "../components/HotDealsCarousel";
import OngoingProjects from "../components/OngoingProjects";
import CompletedProjects from "../components/CompletedProjects";
import { convertBackendToFrontEnd, CompanyData, BackendCompanyData } from "../../util/dataConversion";

export default function CompanyProfileByIdPage() {
    const params = useParams();
    const id= Array.isArray(params.id)? params.id[0]:params.id;
    const [companyData, setCompanyData] = useState<CompanyData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [formData, setFormData] = useState<CompanyData | null>(null);
    const isInitialMount = useRef<boolean>(true);

    useEffect(() => {
        if (!id) {
            setIsLoading(false);
            return;
        }


        // Async function to fetch data from the backend
        const fetchCompanyDetails = async () => {
            try {
                setIsLoading(true);

                // 1) Make the POST request to /api/contractors/Company-details
                //    passing the ID in the request body.
                const response = await axios.post(
                    `http://35.193.219.136:4040/api/contractors/Company-details`,
                    { id: parseInt(id, 10) }, // must match your IdBasedRequestDTO
                    {
                        headers: {
                            "X-Require-Auth": "true",
                            "Content-Type": "application/json"
                        },
                    }
                );

                // 2) The backend returns a StandardResponse, so the actual data is in response.data.data
                //    e.g. { code: 200, message: "Company details", data: {...} }
                const backendResponse = response.data?.data;

                // 3) We still need some fields that your front-end expects but the backend might not provide
                //    (e.g., isApproved, occupiedStartDate, etc.). For now, let’s assume you either
                //    get them from the backend or just fill them in as dummy data:
                // const isApproved = true; // or read from backend if available
                // const occupiedStartDate = "2024-03-15";
                // const occupiedEndDate = "2024-03-22";

                // 4) Also assume ongoingProjects and completedProjects are not yet returned by the backend,
                //    so we use some dummy data:
                // const dummyOngoingProjects = [
                //     { id: 1, title: "City Center Mall", image: "https://via.placeholder.com/300" },
                //     { id: 2, title: "Riverside Apartments", image: "https://via.placeholder.com/300" },
                // ];
                // const dummyCompletedProjects = [
                //     { id: 1, title: "Downtown Plaza", image: "https://via.placeholder.com/300" },
                //     { id: 2, title: "Harbor Bridge", image: "https://via.placeholder.com/300" },
                // ];

                // 5) Merge the backend data with your dummy or extra fields
                const mergedBackendData: BackendCompanyData = {
                    name: backendResponse.name,
                    location: backendResponse.location,
                    profileImage: backendResponse.profileImage,
                    ratings: backendResponse.ratings,
                    hotDeals: backendResponse.hotDeals,
                    isApproved: backendResponse.isApproved,
                    ongoingProjects: backendResponse.ongoingProjects,
                    completedProjects: backendResponse.completedProjects,
                    occupiedStartDate: backendResponse.occupiedStartDate,
                    occupiedEndDate: backendResponse.occupiedEndDate,
                };

                // 6) Convert it to the front-end shape
                const frontEndData = convertBackendToFrontEnd(mergedBackendData);

                // 7) Store in state
                setCompanyData(frontEndData);
            } catch (error) {
                console.error("Error fetching company details:", error);
                setCompanyData(null);
            } finally {
                setIsLoading(false);
            }
        };

        // Call the function
        fetchCompanyDetails();
    }, [id]);

    // Loading & error states
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!companyData) {
        return <div>No company data found for id: {id}</div>;
    }

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
                        contractorId={parseInt(id as string, 10)}
                    />
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Availability</h2>
                        <AvailabilityCalendar occupiedDates={[companyData.occupiedStartDate, companyData.occupiedEndDate]} />
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
