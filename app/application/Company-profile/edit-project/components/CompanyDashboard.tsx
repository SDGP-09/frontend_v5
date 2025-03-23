"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import ProfileSection from "./ProfileSection";
import CalendarSection from "./CalendarSection";
import HotDealsSection from "./HotDealsSection";
import OngoingProjectsSection from "./OngoingProjectsSection";
import CompletedProjectsSection from "./CompletedProjectsSection";
import {
    convertBackendToFrontEnd,
    CompanyData,
    BackendCompanyData,
} from "../../../../util/dataConversion";

export default function CompanyProfileByIdPage() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    // State for editing the profile (controls modal visibility)
    const [isEditingProfile, setIsEditingProfile] = useState(false);

    const [companyDetails, setCompanyDetails] = useState<CompanyData | null>(null);
    const [formData, setFormData] = useState<CompanyData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedDates, setSelectedDates] = useState<number[]>([]);
    const [isEditing, setIsEditing] = useState(false);

    // File states
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string>("");

    // Drag-and-drop highlighting
    const [isDragging, setIsDragging] = useState(false);

    // [CHANGED] If you want a saving indicator, define a state for it:
    const [isSaving, setIsSaving] = useState(false);

    // Reference to the hidden file input
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Fetch company details on mount
    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                setIsLoading(true);
                const contractorId = parseInt(id!, 10);
                const response = await axios.post(
                    `http://35.193.219.136:4040/api/contractors/Company-details`,
                    { id: contractorId },
                    {
                        headers: {
                            "X-Require-Auth": "true",
                            "Content-Type": "application/json",},
                    }
                );

                const backendResponse = response.data?.data;
                if (backendResponse) {
                    // Prepare a BackendCompanyData object
                    const backendData: BackendCompanyData = {
                        name: response.data.name,
                        location: response.data.location,
                        profileImage: response.data.profileImage,
                        ratings: response.data.ratings || {},
                        hotDeals: response.data.hotDeals || [],
                        ongoingProjects: response.data.ongoingProjects || [],
                        completedProjects: response.data.completedProjects || [],
                        isApproved: response.data.isApproved ?? true,
                        occupiedStartDate: response.data.occupiedStartDate ?? "2024-03-15",
                        occupiedEndDate: response.data.occupiedEndDate ?? "2024-03-22",
                    };

                    // Convert the backend data to the front-end shape
                    const convertedData = convertBackendToFrontEnd(backendData);
                    setCompanyDetails(convertedData);
                    setFormData(convertedData);
                }else {
                    // [CREATE MODE] No data exists: initialize formData with empty values.
                    const emptyData: CompanyData = {
                        name: "",
                        location: "",
                        profileImage: "",
                        isApproved: false,
                        ratings: {},
                        hotDeals: [],
                        ongoingProjects: [],
                        completedProjects: [],
                        occupiedStartDate: "",
                        occupiedEndDate: ""
                    };
                    setFormData(emptyData);
                    setCompanyDetails(null);
                    // Also automatically set edit mode for creation.
                    setIsEditingProfile(true);
                }
            } catch (error) {
                console.error("Error fetching company details:", error);
                const emptyData: CompanyData = {
                    name: "",
                    location: "",
                    profileImage: "",
                    isApproved: false,
                    ratings: {},
                    hotDeals: [],
                    ongoingProjects: [],
                    completedProjects: [],
                    occupiedStartDate: "",
                    occupiedEndDate: ""
                };
                setFormData(emptyData);
                setCompanyDetails(null);
                setIsEditingProfile(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCompanyDetails();
    }, [id]);

    // Toggle date selection in the calendar
    const toggleDateSelection = (day: number) => {
        setSelectedDates((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    // Handle text input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!formData) return; // [CHANGED] Guard against null
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Drag & Drop Handlers
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            setSelectedFile(file);

            if (file.type.startsWith("image/")) {
                setFilePreview(URL.createObjectURL(file));
            } else {
                setFilePreview("");
            }
        }
    };

    // Handle "Browse" button click
    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    // Handle manual file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedFile(file);

            if (file.type.startsWith("image/")) {
                setFilePreview(URL.createObjectURL(file));
            } else {
                setFilePreview("");
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;

        // If a new file is chosen and it's an image, update the profile image
        if (selectedFile && filePreview && selectedFile.type.startsWith("image/")) {
            formData.profileImage = filePreview;
        }

        const payload = {
            name: formData.name,
            location: formData.location,
            profileImage: formData.profileImage,
        };

        setIsSaving(true);

        try {
            const response = await axios.post(
                `http://35.193.219.136:4040/api/contractors/update`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Require-Auth": "true",
                    },
                }
            );

            if (response.status === 200 || response.status === 201) {
                console.log("Profile updated successfully:", response.data);
                setCompanyDetails(formData);
            }else {
                // No profile exists: Create a new contractor.
                const response = await axios.post(
                    `http://35.193.219.136:4040/api/contractors`,
                    payload, // Ensure this matches your ContractorDTO structure.
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "X-Require-Auth": "true",
                        },
                    }
                );
                if (response.status === 200 || response.status === 201) {
                    console.log("Contractor created successfully:", response.data);
                    setCompanyDetails(formData);
                }
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again.");
        } finally {
            setIsSaving(false);
        }
        setIsEditingProfile(false);
    };

    // If company details have not been loaded yet, show a loading state
    if (!companyDetails) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* First Row: Profile and Calendar */}
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-8">
                        <ProfileSection
                            companyName={companyDetails.name}
                            location={companyDetails.location}
                            rating={companyDetails.ratings["5"] || 0}
                            reviewsCount={Object.values(companyDetails.ratings).reduce(
                                (acc, val) => acc + val,
                                0
                            )}
                            onEditProfile={() => setIsEditingProfile(true)}
                            profileImage={companyDetails.profileImage}
                        />
                    </div>
                    <div className="col-span-4">
                        <CalendarSection
                            selectedDates={selectedDates}
                            toggleDateSelection={toggleDateSelection}
                        />
                    </div>
                </div>

                {/* Second Row: Hot Deals and Ongoing Projects */}
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-4">
                        <HotDealsSection />
                    </div>
                    <div className="col-span-8">
                        <OngoingProjectsSection />
                    </div>
                </div>

                {/* Third Row: Completed Projects */}
                <CompletedProjectsSection />
            </div>

            {/* Edit Profile Modal */}
            {isEditingProfile && formData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Company Profile</h2>
                            <button
                                onClick={() => setIsEditingProfile(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <span className="text-lg">&times;</span>
                            </button>
                        </div>

                        {/* EDIT FORM */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            {/* DRAG & DROP UPLOADER */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload Assets
                                </label>
                                <div
                                    className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center ${
                                        isDragging ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-gray-50"
                                    }`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-14 h-14 text-gray-400 mb-3"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M7 16a4 4 0 0110 0H7z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 11v8m0-8l-3 3m3-3l3 3"
                                        />
                                    </svg>

                                    <p className="text-gray-500 mb-2 text-center">
                                        Drag and Drop assets here
                                    </p>
                                    <p className="text-gray-500 font-semibold">Or</p>
                                    <button
                                        type="button"
                                        onClick={handleBrowseClick}
                                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Browse
                                    </button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </div>
                            </div>

                            {/* ACTION BUTTONS */}
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsEditingProfile(false)}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isSaving && (
                <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg">
                    Saving...
                </div>
            )}
        </div>
    );
}
