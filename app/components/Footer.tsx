"use client";

import Link from "next/link";
import "../globals.css";
import {Facebook, Instagram, Linkedin, Mail, Youtube} from "lucide-react";
import React from "react";

export default function Footer() {
{/* Footer */}
    return(
<footer className="bg-gray-900 text-white mt-auto">
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <h4 className="text-lg font-semibold mb-4">About Us</h4>
                <p className="text-gray-400">
                    CiviLink is your premier platform for connecting
                    construction professionals and clients.
                </p>
            </div>
            <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                    <li>
                        <a
                            href="/about"
                            className="text-gray-400 hover:text-white transition-colors duration-300"
                        >
                            About Us
                        </a>
                    </li>
                    <li>
                        <a
                            href="/service"
                            className="text-gray-400 hover:text-white transition-colors duration-300"
                        >
                            Services
                        </a>
                    </li>
                    <li>
                        <a
                            href="/contact"
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
                        href="http://www.youtube.com/@CiviLinkConstructionPlatform"
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
            <p>&copy; 2024 CiviLink. All rights reserved.</p>
        </div>
    </div>
</footer>);}