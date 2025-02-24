"use client";
import React, { useState, useEffect } from "react";
import {
    Building2,
    Users,
    Hammer,
    FileSpreadsheet,
    Instagram,
    Mail,
    Menu,
    X, Facebook, Linkedin, Youtube,
} from "lucide-react";

const images = [
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2071",
    "https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?auto=format&fit=crop&q=80&w=2071",
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2070",
];

function Home() {
    const [currentImage, setCurrentImage] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const goToImage = (index: number) => {
        setCurrentImage(index);
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navigation */}
            <nav className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Building2 className="h-8 w-8 text-green-500" />
                            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
                BuildConnect
              </span>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-700 hover:text-green-500 transition-colors duration-300"
                            >
                                {isMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>

                        {/* Desktop nav items */}
                        {/*<div className="hidden md:flex items-center space-x-4">*/}
                        {/*    <button className="px-4 py-2 text-green-500 hover:text-green-600 transition-colors duration-300 font-medium">*/}
                        {/*        Login*/}
                        {/*    </button>*/}
                        {/*    <button className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-md hover:from-green-500 hover:to-blue-600 transition-all duration-300 shadow-sm hover:shadow-md">*/}
                        {/*        Sign Up*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <button className="block w-full text-left px-3 py-2 text-green-500 hover:text-green-600 transition-colors duration-300 font-medium">
                                Login
                            </button>
                            <button className="block w-full text-left px-3 py-2 text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-md hover:from-green-500 hover:to-blue-600 transition-colors duration-300">
                                Sign Up
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Image Carousel */}
            <div className="relative h-[35vh] overflow-hidden">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`absolute w-full h-full transition-opacity duration-1000 ${
                            currentImage === index ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <img
                            src={img}
                            alt={`Construction site ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h1 className="text-white text-4xl md:text-5xl font-bold text-center px-4">
                                Building Tomorrow's Projects Today
                            </h1>
                        </div>
                    </div>
                ))}
                {/* Carousel Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToImage(index)}
                            className={`transition-all duration-300 rounded-full ${
                                currentImage === index
                                    ? "w-8 bg-white"
                                    : "w-2 bg-white/60 hover:bg-white/80"
                            } h-2`}
                            aria-label={`Go to image ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Options Section */}
            <div className="py-16 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
                        Choose Your Path
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="text-center">
                                <Hammer className="w-12 h-12 mx-auto text-green-500 mb-4 transition-transform duration-300 group-hover:scale-110" />
                                <h3 className="text-xl font-semibold mb-4 transition-colors duration-300 group-hover:text-green-500">
                                    Find a Contractor
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Connect with qualified contractors for your construction needs
                                </p>
                                <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-md hover:from-green-500 hover:to-blue-600 transition-all duration-300 shadow-sm hover:shadow-md">
                                    Search Contractors
                                </button>
                            </div>
                        </div>

                        <div className="group bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="text-center">
                                <Users className="w-12 h-12 mx-auto text-blue-500 mb-4 transition-transform duration-300 group-hover:scale-110" />
                                <h3 className="text-xl font-semibold mb-4 transition-colors duration-300 group-hover:text-blue-500">
                                    Find a Consultant
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Get expert advice from experienced construction consultants
                                </p>
                                <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-md hover:from-green-500 hover:to-blue-600 transition-all duration-300 shadow-sm hover:shadow-md">
                                    Search Consultants
                                </button>
                            </div>
                        </div>

                        <div className="group bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="text-center">
                                <FileSpreadsheet className="w-12 h-12 mx-auto text-green-500 mb-4 transition-transform duration-300 group-hover:scale-110" />
                                <h3 className="text-xl font-semibold mb-4 transition-colors duration-300 group-hover:text-green-500">
                                    Create a Project
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Start your construction project and find the right team
                                </p>
                                <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-md hover:from-green-500 hover:to-blue-600 transition-all duration-300 shadow-sm hover:shadow-md">
                                    Start Project
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white mt-auto">
                <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h4 className="text-lg font-semibold mb-4">About Us</h4>
                            <p className="text-gray-400">
                                BuildConnect is your premier platform for connecting
                                construction professionals and clients.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors duration-300"
                                    >
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors duration-300"
                                    >
                                        Services
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors duration-300"
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
                            <div className="flex space-x-4">
                                <a
                                    href="https://www.facebook.com/share/1BNmU8dVrW/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors duration-300"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="w-6 h-6"/>
                                </a>
                                <a
                                    href="https://www.instagram.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors duration-300"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="w-6 h-6"/>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/civilink-construction-platform-23ab41352/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors duration-300"
                                    aria-label="Linkedin"
                                >
                                    <Linkedin className="w-6 h-6"/>
                                </a>
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors duration-300"
                                    aria-label="Youtube"
                                >
                                    <Youtube className="w-6 h-6"/>
                                </a>
                                <a
                                    href="mailto:civilinkconstructionplatform@gmail.com"
                                    className="text-gray-400 hover:text-white transition-colors duration-300"
                                    aria-label="Email"
                                >

                                <Mail className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
                        <p>&copy; 2024 BuildConnect. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;

