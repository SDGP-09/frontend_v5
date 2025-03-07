"use client";


import React, { useState } from "react";
import { FaPencilAlt } from "@/node_modules/react-icons/fa";
import Image from "next/image";


const CompanyProfessionalProfile = () => {
    const [profile, setProfile] = useState({
        name: "Mr. Nuwan Rajapaksha",
        title: "build future together",
        company: "CiviLink",
        email: "nuwan.rajapaksha@example.com",
        phone: "+94 77 123 4567",
        location: "Colombo, Sri Lanka",
        awards:"tfcy",
        description: "Experienced civil engineer specializing in structural design and project management.",
        profileImage: "/profile-placeholder.jpg",
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSave = () => {
        setIsEditing(false);
        alert("Profile updated successfully!");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center p-6">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Company Professional Profile</h2>



                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="flex flex-col items-center text-center relative">
                        <div className="relative w-32 h-32">
                            <Image
                                src={profile.profileImage}
                                alt="profile"
                                width={128}
                                height={128}
                                className="w-full h-full rounded-full border"
                            />

                            <label className="absolute bottom-2 right-2 bg-gray-700 text-white p-1 rounded-full cursor-pointer">
                                <FaPencilAlt size={14} />
                                <input type="file" accept="image/*" className="hidden" />
                            </label>
                        </div>
                        <p className="mt-4 text-xl font-semibold text-gray-700">{profile.company}</p>
                        <p className="mt-2 text-gray-600">{profile.title}</p>
                    </div>
                    <div className="space-y-4">
                        <p><strong>Chairmen:</strong> {profile.name}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Phone:</strong> {profile.phone}</p>
                        <p><strong>Location:</strong> {profile.location}</p>
                        <p><strong>Awards:</strong> {profile.awards}</p>
                        <p><strong>Description:</strong> {profile.description}</p>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition w-full mt-6 font-semibold shadow-md"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-96 max-h-[85vh] overflow-y-auto border border-gray-300">
                        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-600">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleChange}
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={profile.title}
                                    onChange={handleChange}
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600">Company</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={profile.company}
                                    onChange={handleChange}
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleChange}
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleChange}
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={profile.location}
                                    onChange={handleChange}
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600">Awards</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={profile.location}
                                    onChange={handleChange}
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600">Description</label>
                                <textarea
                                    name="description"
                                    value={profile.description}
                                    onChange={handleChange}
                                    className="w-full border rounded p-2 h-20"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition w-1/2 font-semibold shadow-md text-center"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition w-1/2 font-semibold shadow-md text-center"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyProfessionalProfile;
