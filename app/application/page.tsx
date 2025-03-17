'use client';

import React, { useState, useRef } from 'react';
import {
    Building2,
    Briefcase,
    Users,
    MessageCircle,
    ChevronRight,
    Pencil,
    Trash2
} from 'lucide-react';
import Head from 'next/head';
import { useRouter } from 'next/navigation'

export default function ApplicationHomepage() {
    const [profileImage, setProfileImage] = useState('/profile-placeholder.jpg');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleImageClick = () => {
            fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if(typeof reader.result === 'string') {
                    setProfileImage(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteImage = () => {
        setProfileImage('/profile-placeholder.jpg');
    };

    const handlePencilClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // Prevent event bubbling if needed.
        handleImageClick();
    };

    const handleTrashClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        handleDeleteImage();
    };

    const navigateToCompanyProfile = () => {
        router.push('application/Company-profile'); // Navigate to the company profile page
    };

    const navigateToProfessionalProfile = () => {
        router.push('application/company-professional-profile'); // Navigate to the professional profile page
    };

    const navigateToProjectManagement = () => {
        router.push('application/project-management'); // Navigate to the project management page
    };

    const navigateToMessenger = () => {
        router.push('/messenger');
    };

    return (
        <>
            <Head>
                <title>Profile Dashboard</title>
                <meta name="description" content="Interactive profile dashboard"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className="flex flex-col min-h-screen">
                {/* Top Section (replaces the old .bg-gradient with a "hero" style) */}
                <div className="relative h-[40vh] overflow-hidden">
                    {/* Gradient overlay filling the top section */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500"/>
                    {/* Extra Large Profile Section */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                        <div className="relative inline-block">
                            <img
                                src={profileImage}
                                alt=" "
                                className="w-48 h-48 rounded-full border-8 border-white shadow-xl mb-6"
                            />
                            <div className="absolute bottom-2 right-2 flex space-x-2">
                                <button
                                    onClick={handlePencilClick}
                                    className="bg-white p-1 rounded-full shadow hover:bg-gray-200"
                                    title="Edit Image"
                                >
                                    <Pencil className="w-5 h-5 text-gray-700"/>
                                </button>
                                <button
                                    onClick={handleTrashClick}
                                    className="bg-white p-1 rounded-full shadow hover:bg-gray-200"
                                    title="Delete Image"
                                >
                                    <Trash2 className="w-5 h-5 text-gray-700"/>
                                </button>
                            </div>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{display: 'none'}}
                        />
                        <h2 className="text-4xl font-bold text-white mb-2">John Doe</h2>

                    </div>
                </div>

                    {/* Cards Grid - with smaller cards */}
                    <div className="flex-grow bg-gray-50 pt-16 pb-8 px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {/* Company Profile Card */}
                            <div
                                onClick={navigateToCompanyProfile}
                                className="bg-white rounded-xl shadow-xl aspect-square flex flex-col items-center justify-center p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-blue-50 group cursor-pointer relative overflow-hidden"
                                style={{ aspectRatio: '1 / 1' }}>
                                <div
                                    className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                <div
                                    className="p-5 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
                                    <Building2 className="w-10 h-10 text-blue-500 group-hover:text-blue-600"/>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 text-center">Company
                                    Profile</h2>
                                <p className="text-sm text-gray-500 mt-2 text-center">View company details</p>
                                <div
                                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronRight className="w-5 h-5 text-blue-500"/>
                                </div>
                            </div>

                            {/* Professional Profile Card */}
                            <div
                                onClick={navigateToProfessionalProfile}
                                className="bg-white rounded-xl shadow-xl aspect-square flex flex-col items-center justify-center p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-green-50 group cursor-pointer relative overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                <div
                                    className="p-5 bg-green-100 rounded-full mb-4 group-hover:bg-green-200 transition-colors">
                                    <Users className="w-10 h-10 text-green-500 group-hover:text-green-600"/>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-green-700 text-center">Professional
                                    Profile</h2>
                                <p className="text-sm text-gray-500 mt-2 text-center">Manage experience & skills</p>
                                <div
                                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronRight className="w-5 h-5 text-green-500"/>
                                </div>
                            </div>
                            {/* Project Management Card */}
                            <div
                                onClick={navigateToProjectManagement}
                                className="bg-white rounded-xl shadow-xl aspect-square flex flex-col items-center justify-center p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-purple-50 group cursor-pointer relative overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                <div
                                    className="p-5 bg-purple-100 rounded-full mb-4 group-hover:bg-purple-200 transition-colors">
                                    <Briefcase className="w-10 h-10 text-purple-500 group-hover:text-purple-600"/>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-purple-700 text-center">Project
                                    Management</h2>
                                <p className="text-sm text-gray-500 mt-2 text-center">Track ongoing projects</p>
                                <div
                                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronRight className="w-5 h-5 text-purple-500"/>
                                </div>
                            </div>
                        </div>

                        {/* Message Icon */}
                        <button
                            onClick={navigateToMessenger}
                            className="fixed bottom-6 right-6 p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 hover:bg-blue-50">
                            <MessageCircle className="w-6 h-6 text-blue-500"/>
                        </button>
                    </div>
            </div>
            </>
            );
            }

