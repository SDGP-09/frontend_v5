'use client';

import React from 'react';
import {
    Building2,
    Briefcase,
    Users,
    MessageCircle,
    ChevronRight
} from 'lucide-react';
import Head from 'next/head';

export default function applicationhomepage() {
    return (
        <>
            <Head>
                <title>Profile Dashboard</title>
                <meta name="description" content="Interactive profile dashboard"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-6">
                {/* Extra Large Profile Section */}
                <div className="flex flex-col items-center mb-16">
                    <img
                        src="/profile-placeholder.jpg"
                        alt="User Profile"
                        className="w-72 h-72 rounded-full border-8 border-white shadow-xl mb-6"
                    />
                    <h2 className="text-4xl font-bold text-white mb-2">John Doe</h2>
                    <p className="text-2xl text-white/90">Senior Developer</p>
                </div>

                {/* Cards Grid - with smaller cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {/* Company Profile Card */}
                    <div
                        className="bg-white rounded-xl shadow-xl aspect-square flex flex-col items-center justify-center p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-blue-50 group cursor-pointer relative overflow-hidden">
                        <div
                            className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                        <div className="p-5 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
                            <Building2 className="w-10 h-10 text-blue-500 group-hover:text-blue-600"/>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 text-center">Company
                            Profile</h2>
                        <p className="text-sm text-gray-500 mt-2 text-center">View company details</p>
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight className="w-5 h-5 text-blue-500"/>
                        </div>
                    </div>

                    {/* Professional Profile Card */}
                    <div
                        className="bg-white rounded-xl shadow-xl aspect-square flex flex-col items-center justify-center p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-green-50 group cursor-pointer relative overflow-hidden">
                        <div
                            className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                        <div className="p-5 bg-green-100 rounded-full mb-4 group-hover:bg-green-200 transition-colors">
                            <Users className="w-10 h-10 text-green-500 group-hover:text-green-600"/>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 group-hover:text-green-700 text-center">Professional
                            Profile</h2>
                        <p className="text-sm text-gray-500 mt-2 text-center">Manage experience & skills</p>
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight className="w-5 h-5 text-green-500"/>
                        </div>
                    </div>
                    {/* Project Management Card */}
                    <div className="bg-white rounded-xl shadow-xl aspect-square flex flex-col items-center justify-center p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-purple-50 group cursor-pointer relative overflow-hidden">
                        <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                        <div className="p-5 bg-purple-100 rounded-full mb-4 group-hover:bg-purple-200 transition-colors">
                            <Briefcase className="w-10 h-10 text-purple-500 group-hover:text-purple-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 group-hover:text-purple-700 text-center">Project Management</h2>
                        <p className="text-sm text-gray-500 mt-2 text-center">Track ongoing projects</p>
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight className="w-5 h-5 text-purple-500" />
                        </div>
                    </div>
                </div>

                {/* Message Icon */}
                <button className="fixed bottom-6 right-6 p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 hover:bg-blue-50">
                    <MessageCircle className="w-6 h-6 text-blue-500" />
                </button>
            </div>
        </>
    );

}