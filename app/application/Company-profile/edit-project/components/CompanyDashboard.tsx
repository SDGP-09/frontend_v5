// "use client";
// // import React, { useState } from "react";
// import React, { useState, useEffect, useRef } from "react";
// import ProfileSection from "./ProfileSection";
// import CalendarSection from "./CalendarSection";
// import HotDealsSection from "./HotDealsSection";
// import OngoingProjectsSection from "./OngoingProjectsSection";
// import CompletedProjectsSection from "./CompletedProjectsSection";
//
// /**
//  * CompanyDashboard
//  *
//  * This is the main dashboard component for the company profile.
//  * It renders:
//  *  - The ProfileSection (company information and edit button)
//  *  - The CalendarSection (availability calendar)
//  *  - The HotDealsSection (promotional offers)
//  *  - The OngoingProjectsSection (list of active projects)
//  *  - The CompletedProjectsSection (grid of completed projects)
//  *
//  * It also manages the state for selected calendar dates and the edit profile mode.
//  */
// export default function CompanyDashboard() {
//     // State for calendar selected dates
//     const [selectedDates, setSelectedDates] = useState<number[]>([15, 16, 20, 21, 22]);
//     // State for editing the profile (controls modal visibility)
//     const [isEditingProfile, setIsEditingProfile] = useState(false);
//     // State for holding company details
//     const [companyDetails, setCompanyDetails] = useState({
//         id: "company1",
//         name: "BuildMaster Construction",
//         location: "New York, NY",
//         rating: 4.4,
//         reviews: 257,
//         profileImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=300&h=300",
//     });
//     // Form data to update company details
//     // const [formData, setFormData] = useState(companyDetails);
//     // Form data to update company details
//     const [formData, setFormData] = useState(companyDetails);
//     // State to simulate saving process
//     const [isSaving, setIsSaving] = useState(false);
//
//     // useRef to skip saving simulation on initial mount
//     const isInitialMount = useRef(true);
//
//     /**
//      * toggleDateSelection
//      * Toggles the selection of a day on the calendar.
//      *
//      * @param day - The day (number) to toggle.
//      */
//     const toggleDateSelection = (day: number) => {
//         setSelectedDates((prev) =>
//             prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
//         );
//     };
//
//     // Handle form input change
//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: name === 'rating' || name === 'reviews' ? Number(value) : value,
//         }));
//     };
//
//     // Handle form submit
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         setCompanyDetails(formData);
//         setIsEditingProfile(false);
//     };
//     // useEffect to simulate saving data to backend when companyDetails changes (except on initial mount)
//     useEffect(() => {
//         if (isInitialMount.current) {
//             isInitialMount.current = false;
//         } else {
//             setIsSaving(true);
//             // Simulate API call delay
//             const timer = setTimeout(() => {
//                 console.log("Dummy data saved for id:", companyDetails.id, companyDetails);
//                 setIsSaving(false);
//             }, 1000);
//             return () => clearTimeout(timer);
//         }
//     }, [companyDetails]);
//
//     return (
//         <div className="min-h-screen bg-gray-50 p-6">
//             <div className="max-w-7xl mx-auto space-y-6">
//                 {/* First Row: Profile and Calendar */}
//                 <div className="grid grid-cols-12 gap-6">
//                     {/* Profile Section */}
//                     <div className="col-span-8">
//                         <ProfileSection
//                             companyName={companyDetails.name}
//                             location={companyDetails.location}
//                             rating={companyDetails.rating}
//                             reviewsCount={companyDetails.reviews}
//                             onEditProfile={() => setIsEditingProfile(true)}
//                             profileImage={companyDetails.profileImage}
//                         />
//                     </div>
//                     {/* Calendar Section */}
//                     <div className="col-span-4">
//                         <CalendarSection
//                             selectedDates={selectedDates}
//                             toggleDateSelection={toggleDateSelection}
//                         />
//                     </div>
//                 </div>
//
//                 {/* Second Row: Hot Deals and Ongoing Projects */}
//                 <div className="grid grid-cols-12 gap-6">
//                     {/* Hot Deals Section */}
//                     <div className="col-span-4">
//                         <HotDealsSection />
//                     </div>
//                     {/* Ongoing Projects Section */}
//                     <div className="col-span-8">
//                         <OngoingProjectsSection />
//                     </div>
//                 </div>
//
//                 {/* Third Row: Completed Projects */}
//                 <CompletedProjectsSection />
//             </div>
//
//             {/* Edit Profile Modal */}
//             {isEditingProfile && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//                     <div className="bg-white rounded-lg max-w-md w-full p-6">
//                         <div className="flex justify-between items-center mb-4">
//                             <h2 className="text-xl font-semibold">Edit Company Profile</h2>
//                             <button
//                                 onClick={() => setIsEditingProfile(false)}
//                                 className="text-gray-500 hover:text-gray-700"
//                             >
//                                 <span className="text-lg">&times;</span>
//                             </button>
//                         </div>
//                         <form onSubmit={handleSubmit} className="space-y-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Company Name
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     value={formData.name}
//                                     onChange={handleInputChange}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Location
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="location"
//                                     value={formData.location}
//                                     onChange={handleInputChange}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Rating
//                                 </label>
//                                 <input
//                                     type="number"
//                                     name="rating"
//                                     value={formData.rating}
//                                     onChange={handleInputChange}
//                                     step="0.1"
//                                     min="0"
//                                     max="5"
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Number of Reviews
//                                 </label>
//                                 <input
//                                     type="number"
//                                     name="reviews"
//                                     value={formData.reviews}
//                                     onChange={handleInputChange}
//                                     min="0"
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                                 />
//                             </div>
//                             <div className="flex justify-end space-x-3 mt-6">
//                                 <button
//                                     type="button"
//                                     onClick={() => setIsEditingProfile(false)}
//                                     className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     // className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
//                                     className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:bg-blue-700 transition mt-2"
//                                 >
//                                     Save Changes
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//             {/* Dummy Saving Indicator */}
//             {isSaving && (
//                 <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg">
//                     Saving...
//                 </div>
//             )}
//         </div>
//     );
// }
"use client";
import React, { useState, useEffect, useRef } from "react";
import ProfileSection from "./ProfileSection";
import CalendarSection from "./CalendarSection";
import HotDealsSection from "./HotDealsSection";
import OngoingProjectsSection from "./OngoingProjectsSection";
import CompletedProjectsSection from "./CompletedProjectsSection";

/**
 * CompanyDashboard
 */
export default function CompanyDashboard() {
    // State for calendar selected dates
    const [selectedDates, setSelectedDates] = useState<number[]>([15, 16, 20, 21, 22]);

    // State for editing the profile (controls modal visibility)
    const [isEditingProfile, setIsEditingProfile] = useState(false);

    // State for holding company details
    const [companyDetails, setCompanyDetails] = useState({
        id: "company1",
        name: "BuildMaster Construction",
        location: "New York, NY",
        rating: 4.4,
        reviews: 257,
        // Existing profile image
        profileImage:
            "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=300&h=300",
    });

    // Form data to update company details
    const [formData, setFormData] = useState(companyDetails);

    // NEW: State for image file and preview
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

    // State to simulate saving process
    const [isSaving, setIsSaving] = useState(false);
    // useRef to skip saving simulation on initial mount
    const isInitialMount = useRef(true);

    /**
     * toggleDateSelection
     * Toggles the selection of a day on the calendar.
     */
    const toggleDateSelection = (day: number) => {
        setSelectedDates((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    /**
     * handleInputChange
     * Updates text fields in formData (for name, location, rating, reviews).
     */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "rating" || name === "reviews" ? Number(value) : value,
        }));
    };

    /**
     * handleFileChange
     * Triggered when user picks an image file from their computer.
     */
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedImage(file);
            // Generate a temporary local preview
            setImagePreview(URL.createObjectURL(file));
        }
    };

    /**
     * handleSubmit
     * When the user clicks "Save Changes" in the modal, we update our company details.
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // If the user selected a new image, update formData to reflect the preview
        if (selectedImage && imagePreview) {
            formData.profileImage = imagePreview;
        }

        // Update main state
        setCompanyDetails(formData);
        setIsEditingProfile(false);

        // In a real app, you'd also send `selectedImage` to your server here
        // via an API call or Next.js API route.
    };

    /**
     * Simulate saving data to a backend (just logs to console).
     */
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            setIsSaving(true);
            // Simulate API call delay
            const timer = setTimeout(() => {
                console.log("Dummy data saved for id:", companyDetails.id, companyDetails);
                setIsSaving(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [companyDetails]);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* First Row: Profile and Calendar */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Profile Section */}
                    <div className="col-span-8">
                        <ProfileSection
                            companyName={companyDetails.name}
                            location={companyDetails.location}
                            rating={companyDetails.rating}
                            reviewsCount={companyDetails.reviews}
                            onEditProfile={() => setIsEditingProfile(true)}
                            profileImage={companyDetails.profileImage}
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

            {/* Edit Profile Modal */}
            {isEditingProfile && (
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
                            {/*<div>*/}
                            {/*    /!*<label className="block text-sm font-medium text-gray-700 mb-1">*!/*/}
                            {/*    /!*    Rating*!/*/}
                            {/*    /!*</label>*!/*/}
                            {/*    <input*/}
                            {/*        type="number"*/}
                            {/*        name="rating"*/}
                            {/*        value={formData.rating}*/}
                            {/*        onChange={handleInputChange}*/}
                            {/*        step="0.1"*/}
                            {/*        min="0"*/}
                            {/*        max="5"*/}
                            {/*        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"*/}
                            {/*    />*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    /!*<label className="block text-sm font-medium text-gray-700 mb-1">*!/*/}
                            {/*    /!*    Number of Reviews*!/*/}
                            {/*    /!*</label>*!/*/}
                            {/*    <input*/}
                            {/*        type="number"*/}
                            {/*        name="reviews"*/}
                            {/*        value={formData.reviews}*/}
                            {/*        onChange={handleInputChange}*/}
                            {/*        min="0"*/}
                            {/*        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"*/}
                            {/*    />*/}
                            {/*</div>*/}

                            {/* NEW: Image Upload Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Profile Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                                {/* Show preview if user selected a new image */}
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="mt-2 w-32 h-32 object-cover rounded-full"
                                    />
                                )}
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsEditingProfile(false)}
                                //     className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                                // >
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:bg-blue-700 transition mt-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:bg-blue-700 transition mt-2"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Dummy Saving Indicator */}
            {isSaving && (
                <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg">
                    Saving...
                </div>
            )}
        </div>
    );
}
