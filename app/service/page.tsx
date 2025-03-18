"use client";

import React from "react";
import { ClipboardList, MessageSquare, FileText, Shield } from "lucide-react";

export default function Services() {
    const services = [
        {
            icon: <ClipboardList className="h-12 w-12 text-white" />,
            title: "Project Management",
            shortDesc: "Streamline your construction projects with our comprehensive project management tools.",
            longDesc:
                "Project Management tools are designed to help construction companies efficiently plan, execute, and monitor their projects. With real-time progress tracking, resource allocation, and deadline management, businesses can stay on top of every detail. Our platform enables seamless collaboration between contractors, consultants, and stakeholders, ensuring smooth communication and coordination.",
            bgColor: "from-green-400 to-green-600",
            iconBg: "bg-green-500",
        },
        {
            icon: <MessageSquare className="h-12 w-12 text-white" />,
            title: "Interplatform Messaging",
            shortDesc: "Keep your team connected with real-time messaging across all platforms.",
            longDesc:
                "Our Interplatform Messaging system ensures your team stays connected across web and mobile. Share updates instantly, exchange critical project files, and collaborate seamlessly in real-time. With features like read receipts, file sharing, and group conversations, communication barriers are eliminated, keeping everyone on the same page regardless of their location or device.",
            bgColor: "from-blue-400 to-blue-600",
            iconBg: "bg-blue-500",
        },
        {
            icon: <FileText className="h-12 w-12 text-white" />,
            title: "Tender Management",
            shortDesc: "Simplify your tender process with our advanced management system.",
            longDesc:
                "Our system enables businesses to publish tenders, receive bids from qualified contractors, and compare proposals efficiently. With real-time updates and automated tracking, stakeholders can stay informed about deadlines, bid evaluations, and approvals. Whether you're a project owner seeking the best contractor or a contractor looking for new opportunities, CiviLink simplifies tendering, enhances transparency, and ensures a smooth, competitive bidding process.",
            bgColor: "from-purple-400 to-purple-600",
            iconBg: "bg-purple-500",
        },
        {
            icon: <Shield className="h-12 w-12 text-white" />,
            title: "Company-Based Authentication",
            shortDesc:
                "Secure your project data with our robust company-based authentication system.",
            longDesc:
                "CiviLink ensures secure access control with a robust company-based authentication system, protecting your project data from unauthorized access. Businesses can manage user roles, set permissions, and restrict sensitive information to authorized personnel only. This system enhances data privacy and security, ensuring that only verified team members can access critical project details.",
            bgColor: "from-red-400 to-red-600",
            iconBg: "bg-red-500",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50" id="top">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-20">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        Comprehensive solutions designed for the construction industry
                    </p>
                </div>
            </div>

            {/* Services Overview */}
            <div className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            Transforming Construction Project Management
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Our suite of integrated services is designed to address the unique
                            challenges of the construction industry
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-lg overflow-hidden"
                            >
                                <div className={`h-2 bg-gradient-to-r ${service.bgColor}`}></div>
                                <div className="p-8">
                                    <div className="flex items-center mb-6">
                                        <div className={`${service.iconBg} p-3 rounded-lg mr-4`}>
                                            {service.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-800">
                                            {service.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 mb-4 font-medium">
                                        {service.shortDesc}
                                    </p>
                                    <p className="text-gray-700">{service.longDesc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="py-16 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            Why Choose CiviLink
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Our platform offers unique advantages that set us apart
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Integrated Ecosystem",
                                description:
                                    "All your construction management needs in one platform, eliminating the need for multiple disconnected tools.",
                                icon: "🔄",
                            },
                            {
                                title: "Industry-Specific Design",
                                description:
                                    "Built specifically for construction professionals, with workflows that match real-world processes.",
                                icon: "🏗️",
                            },
                            {
                                title: "Scalable Solutions",
                                description:
                                    "Suitable for projects of all sizes, from small renovations to large-scale infrastructure developments.",
                                icon: "📈",
                            },
                            {
                                title: "Real-Time Collaboration",
                                description:
                                    "Connect all stakeholders in real-time, reducing delays and miscommunication.",
                                icon: "👥",
                            },
                            {
                                title: "Data-Driven Insights",
                                description:
                                    "Leverage project data to make informed decisions and improve future performance.",
                                icon: "📊",
                            },
                            {
                                title: "Mobile Accessibility",
                                description:
                                    "Access your projects anytime, anywhere with our mobile-responsive platform.",
                                icon: "📱",
                            },
                        ].map((benefit, index) => (
                            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
                                <div className="text-4xl mb-4">{benefit.icon}</div>
                                <h3 className="text-xl font-bold mb-2 text-gray-800">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-700">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16 px-6 bg-gradient-to-r from-green-500 to-blue-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        Ready to Transform Your Construction Projects?
                    </h2>
                    <p className="text-xl mb-8">
                        Join thousands of construction professionals who are already
                        benefiting from CiviLink&apos;s comprehensive platform.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-md hover:bg-gray-100 transition-colors duration-300">
                            Get Started
                        </button>
                        <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-md hover:bg-white/10 transition-colors duration-300">
                            Request Demo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
