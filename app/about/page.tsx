"use client";

import React, { useRef, useEffect } from "react";
import { Building2, Users, Shield } from "lucide-react";

export default function About() {
    const videoRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
    }, []);

    return (
        <div className="min-h-screen bg-gray-50" id="top">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-20">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">About CiviLink</h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        Connecting construction professionals and clients for successful project delivery
                    </p>
                </div>
            </div>

            {/* Video Section */}
            <div className="py-16 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
                        See CiviLink in Action
                    </h2>
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
                        <iframe
                            ref={videoRef}
                            className="w-full h-[500px]"
                            src="https://www.youtube.com/embed/sKpPPVqj7LY?autoplay=1&mute=1&enablejsapi=1"
                            title="CiviLink Introduction"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-16 px-6 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Mission</h2>
                            <p className="text-lg text-gray-700 mb-6">
                                At CiviLink, we're revolutionizing the construction industry by creating a
                                comprehensive platform that connects contractors, consultants, and clients
                                in one seamless ecosystem.
                            </p>
                            <p className="text-lg text-gray-700 mb-6">
                                Our mission is to streamline construction project management, enhance communication,
                                and ensure successful project delivery through innovative technology solutions.
                            </p>
                            <p className="text-lg text-gray-700">
                                We believe that by bringing all stakeholders together on a single platform, we can
                                reduce delays, minimize misunderstandings, and maximize project success rates
                                across the industry.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="bg-green-100 p-3 rounded-full mr-4">
                                        <Building2 className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2 text-gray-800">Industry Expertise</h3>
                                        <p className="text-gray-700">
                                            Built by construction professionals for construction professionals,
                                            with deep industry knowledge.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                                        <Users className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2 text-gray-800">Collaborative Approach</h3>
                                        <p className="text-gray-700">
                                            Designed to foster collaboration between all project stakeholders
                                            from start to finish.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                                        <Shield className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2 text-gray-800">Secure &amp; Reliable</h3>
                                        <p className="text-gray-700">
                                            Enterprise-grade security and reliability to protect your valuable project data.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
