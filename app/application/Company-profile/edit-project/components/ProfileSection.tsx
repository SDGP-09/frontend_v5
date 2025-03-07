"use client";
import React from "react";
import { Star, Edit2 } from "lucide-react";

/**
 * ProfileSectionProps
 *
 * @param companyName - The name of the company.
 * @param location - The company's location.
 * @param rating - The company's rating.
 * @param reviewsCount - The number of reviews.
 * @param isEditingProfile - Flag to indicate if the profile is in edit mode.
 * @param onEditProfile - Callback function when "Edit Profile" is clicked.
 * @param profileImage - URL of the company’s profile image.
 */
interface ProfileSectionProps {
    companyName: string;
    location: string;
    rating: number;
    reviewsCount: number;
    isEditingProfile: boolean;
    onEditProfile: () => void;
    profileImage: string;
}

/**
 * ProfileSection Component
 *
 * Displays the company’s profile information along with an option to edit the profile.
 */
export default function ProfileSection({
                                           companyName,
                                           location,
                                           rating,
                                           reviewsCount,
                                           onEditProfile,
                                           profileImage,
                                       }: ProfileSectionProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex gap-6">
                <img
                    src={profileImage}
                    alt={companyName}
                    className="w-40 h-40 rounded-lg object-cover"
                />
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold">{companyName}</h1>
                    <p className="text-gray-600">{location}</p>
                    <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold">{rating}</span>
                        <span className="text-gray-500">({reviewsCount} reviews)</span>
                    </div>
                    {/* Edit Profile Button */}
                    <button
                        onClick={onEditProfile}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:bg-blue-700 transition mt-2"
                    >
                        <Edit2 className="w-4 h-4" />
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
}
// "use client";
// import React, { useState } from 'react';
// import { Building2, MapPin, Star, X, Edit2 } from 'lucide-react';
// import Image from 'next/image';
//
// interface CompanyDetails {
//     name: string;
//     location: string;
//     rating: number;
//     reviews: number;
//     profileImage: string;
// }
//
// export default function Home() {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [companyDetails, setCompanyDetails] = useState<CompanyDetails>({
//         name: "BuildMaster Construction",
//         location: "New York, NY",
//         rating: 4.4,
//         reviews: 257,
//         profileImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=300&h=300",
//     });
//     const [formData, setFormData] = useState<CompanyDetails>(companyDetails);
//
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         setCompanyDetails(formData);
//         setIsModalOpen(false);
//     };
//
//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: name === 'rating' || name === 'reviews' ? Number(value) : value,
//             profileImage: name === 'profileImage' ? value : prev.profileImage
//         }));
//     };
//
//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Header */}
//             <header className="bg-white shadow-sm">
//                 <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
//                     <div className="flex items-center space-x-2 text-emerald-500">
//                         <Building2 className="h-6 w-6" />
//                         <span className="text-xl font-semibold">CiviLink</span>
//                     </div>
//                     <div className="flex items-center space-x-4">
//                         <button className="px-4 py-2 text-white bg-emerald-500 rounded-md hover:bg-emerald-600">
//                             Profile
//                         </button>
//                         <button className="px-4 py-2 text-red-500 hover:text-red-600">
//                             Logout
//                         </button>
//                     </div>
//                 </div>
//             </header>
//
//             {/* Main Content */}
//             <main className="max-w-7xl mx-auto px-4 py-8">
//                 <div className="bg-white rounded-xl shadow-sm p-6">
//                     <div className="flex gap-6">
//                         <div className="w-40 h-40 relative">
//                             <Image
//                                 src={companyDetails.profileImage}
//                                 alt={companyDetails.name}
//                                 layout="fill"
//                                 objectFit="cover"
//                                 className="rounded-lg"
//                             />
//                         </div>
//                         <div className="space-y-2">
//                             <h1 className="text-2xl font-bold">{companyDetails.name}</h1>
//                             <p className="text-gray-600">
//                                 <MapPin className="h-4 w-4 mr-1 inline-block" />
//                                 {companyDetails.location}
//                             </p>
//                             <div className="flex items-center gap-2">
//                                 <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
//                                 <span className="font-semibold">{companyDetails.rating}</span>
//                                 <span className="text-gray-500">({companyDetails.reviews} reviews)</span>
//                             </div>
//                             {/* Edit Profile Button */}
//                             <button
//                                 onClick={() => setIsModalOpen(true)}
//                                 className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:bg-blue-700 transition mt-2"
//                             >
//                                 <Edit2 className="w-4 h-4" />
//                                 Edit Profile
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//
//             {/* Edit Profile Modal */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//                     <div className="bg-white rounded-lg max-w-md w-full p-6">
//                         <div className="flex justify-between items-center mb-4">
//                             <h2 className="text-xl font-semibold">Edit Company Profile</h2>
//                             <button
//                                 onClick={() => setIsModalOpen(false)}
//                                 className="text-gray-500 hover:text-gray-700"
//                             >
//                                 <X className="h-5 w-5" />
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
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Profile Image URL
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="profileImage"
//                                     value={formData.profileImage}
//                                     onChange={handleInputChange}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                                 />
//                             </div>
//
//                             <div className="flex justify-end space-x-3 mt-6">
//                                 <button
//                                     type="button"
//                                     onClick={() => setIsModalOpen(false)}
//                                     className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
//                                 >
//                                     Save Changes
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }