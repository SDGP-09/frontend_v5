"use client";

import React, { useState } from "react";
import { Mail, Phone, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [formStatus, setFormStatus] = useState<{
        submitted: boolean;
        success: boolean;
        message: string;
    } | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        if (!formData.name || !formData.email || !formData.message) {
            setFormStatus({
                submitted: true,
                success: false,
                message: "Please fill in all fields",
            });
            return;
        }

        // Simulate a successful submission
        setFormStatus({
            submitted: true,
            success: true,
            message: "Thank you for your message! We will get back to you soon.",
        });

        // Reset form
        setFormData({
            name: "",
            email: "",
            message: "",
        });
    };

    return (
        <div className="min-h-screen bg-gray-50" id="top">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-20">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        Have questions or need assistance? We're here to help!
                    </p>
                </div>
            </div>

            {/* Contact Form Section */}
            <div className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
                            <p className="text-gray-700 mb-8">
                                We'd love to hear from you. Whether you have a question about our services,
                                need a demo, or want to join our team, we're ready to answer your questions.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="bg-green-100 p-3 rounded-full mr-4">
                                        <Mail className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-1 text-gray-800">Email Us</h3>
                                        <p className="text-gray-700">
                                            civilinkconstructionplatform@gmail.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                                        <Phone className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-1 text-gray-800">
                                            Connect With Us
                                        </h3>
                                        <div className="flex space-x-4 mt-2">
                                            <a
                                                href="https://www.facebook.com/share/1BNmU8dVrW/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors"
                                                aria-label="Facebook"
                                            >
                                                <Facebook className="h-5 w-5 text-blue-600" />
                                            </a>
                                            <a
                                                href="https://www.instagram.com/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors"
                                                aria-label="Instagram"
                                            >
                                                <Instagram className="h-5 w-5 text-pink-600" />
                                            </a>
                                            <a
                                                href="https://www.linkedin.com/in/civilink-construction-platform-23ab41352/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors"
                                                aria-label="LinkedIn"
                                            >
                                                <Linkedin className="h-5 w-5 text-blue-700" />
                                            </a>
                                            <a
                                                href="http://www.youtube.com/@CiviLinkConstructionPlatform"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors"
                                                aria-label="YouTube"
                                            >
                                                <Youtube className="h-5 w-5 text-red-600" />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md mt-8">
                                    <h3 className="text-lg font-semibold mb-3 text-gray-800">
                                        Our Online Platform
                                    </h3>
                                    <p className="text-gray-700">
                                        CiviLink is an online-only platform designed to connect
                                        construction professionals across the globe. We don't
                                        maintain a physical office as our services are delivered
                                        entirely through our digital platform.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                Send Us a Message
                            </h2>

                            {formStatus && (
                                <div
                                    className={`p-4 mb-6 rounded-md ${
                                        formStatus.success
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                    }`}
                                >
                                    {formStatus.message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <label
                                        htmlFor="name"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label
                                        htmlFor="email"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label
                                        htmlFor="message"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-medium rounded-md hover:from-green-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center"
                                >
                                    <Mail className="h-5 w-5 mr-2" />
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Media Section */}
            <div className="py-16 px-6 bg-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Follow Us</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
                        Stay updated with our latest news, projects, and industry insights by following us on social media.
                    </p>

                    <div className="flex flex-wrap justify-center gap-8">
                        <a
                            href="https://www.facebook.com/share/1BNmU8dVrW/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center group"
                        >
                            <div className="bg-blue-100 p-6 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
                                <Facebook className="h-10 w-10 text-blue-600" />
                            </div>
                            <span className="text-gray-800 font-medium">Facebook</span>
                        </a>

                        <a
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center group"
                        >
                            <div className="bg-pink-100 p-6 rounded-full mb-4 group-hover:bg-pink-200 transition-colors">
                                <Instagram className="h-10 w-10 text-pink-600" />
                            </div>
                            <span className="text-gray-800 font-medium">Instagram</span>
                        </a>

                        <a
                            href="https://www.linkedin.com/in/civilink-construction-platform-23ab41352/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center group"
                        >
                            <div className="bg-blue-100 p-6 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
                                <Linkedin className="h-10 w-10 text-blue-700" />
                            </div>
                            <span className="text-gray-800 font-medium">LinkedIn</span>
                        </a>

                        <a
                            href="http://www.youtube.com/@CiviLinkConstructionPlatform"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center group"
                        >
                            <div className="bg-red-100 p-6 rounded-full mb-4 group-hover:bg-red-200 transition-colors">
                                <Youtube className="h-10 w-10 text-red-600" />
                            </div>
                            <span className="text-gray-800 font-medium">YouTube</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
