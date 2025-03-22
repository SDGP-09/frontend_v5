"use client";
import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <div>
                        <div className="flex items-center mb-6">
                            <div className="flex items-center">
                                <div className="w-6 h-6 bg-gray-800 transform rotate-45"></div>
                                <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 transform -translate-x-3 rotate-45"></div>
                            </div>
                            <div className="ml-2">
                                <div className="text-lg font-bold text-gradient bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                                    CIVILINK
                                </div>
                                <div className="text-xs font-medium text-gray-400">
                                    CONNECTING CONTRACTORS AND CLIENTS
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-400 mb-6">
                            We are a global network of experts working with clients, communities and
                            colleagues to develop innovative solutions.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://www.facebook.com/share/1BNmU8dVrW/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 hover:text-white transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M22 0h-20v24h11.2v-9.6h-3.2v-3.2h3.2v-2.4c0-3.36 2.04-5.2 5.04-5.2 1.44 0 2.68.12 3.04.16v3.52h-2.08c-1.64 0-1.96.78-1.96 1.92v2h3.92l-.512 3.2h-3.408v9.6h6.72v-24z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.instagram.com/_civi_link_/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 hover:text-white transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M7.75 2h8.5C19.55 2 22 4.45 22 7.75v8.5c0 3.3-2.45 5.75-5.75 5.75h-8.5C4.45 22 2 19.55 2 16.25v-8.5C2 4.45 4.45 2 7.75 2zm0 2C5.68 4 4 5.68 4 7.75v8.5C4 18.32 5.68 20 7.75 20h8.5c2.07 0 3.75-1.68 3.75-3.75v-8.5C20 5.68 18.32 4 16.25 4h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm4.5-.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/civilink-construction-platform-23ab41352/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 hover:text-white transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.youtube.com/@CiviLinkConstructionPlatform"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 hover:text-white transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M19.615 3.184C18.833 2.909 12 2.909 12 2.909s-6.833 0-7.615.275C2.915 3.455 2.478 3.973 2.316 4.583 2.147 5.219 2.147 7.219 2.147 7.219s0 2 0 2.636v1.526c0 .636 0 2.636 0 2.636s0 2-.147 2.656c-.162.61-.6 1.128-1.184 1.403C5.167 21.091 12 21.091 12 21.091s6.833 0 7.615-.275c.583-.275 1.02-.792 1.184-1.403.147-.656.147-2.656.147-2.656s0-2 0-2.636V9.855c0-.636 0-2.636 0-2.636s0-2-.147-2.656c-.162-.61-.6-1.128-1.184-1.403zM10.545 15.568V8.432L16.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-6">Contact Info</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-start space-x-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-teal-500 mt-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                <a
                                    href="mailto:civilinkconstructionplatform@gmail.com"
                                    className="hover:text-white transition-colors"
                                >
                                    civilinkconstructionplatform@gmail.com
                                </a>
                            </li>
                            <li className="flex items-start space-x-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-teal-500 mt-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                                <span>0707046967</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-blue-600 mt-1"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M22.675 0h-21.35C.597 0 0 .598 0 1.333v21.334C0 23.402.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.41c0-3.1 1.893-4.788 4.66-4.788 1.325 0 2.464.099 2.796.143v3.24l-1.918.001c-1.505 0-1.797.716-1.797 1.764v2.313h3.587l-.467 3.622h-3.12V24h6.116c.728 0 1.325-.598 1.325-1.333V1.333C24 .598 23.403 0 22.675 0z" />
                                </svg>
                                <a
                                    href="https://www.facebook.com/share/1BNmU8dVrW/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                >
                                    Facebook
                                </a>
                            </li>
                            <li className="flex items-start space-x-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-pink-500 mt-1"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.338 3.608 1.313.975.975 1.251 2.242 1.313 3.608.058 1.266.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.338 2.633-1.313 3.608-.975.975-2.242 1.251-3.608 1.313-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.338-3.608-1.313-.975-.975-1.251-2.242-1.313-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.338-2.633 1.313-3.608C4.52 2.5 5.787 2.224 7.153 2.163 8.419 2.105 8.799 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.775.13 4.602.44 3.637 1.405 2.672 2.37 2.362 3.543 2.304 4.82.246 5.089 0 8.741 0 12s.014 6.332.072 7.608c.058 1.277.368 2.45 1.333 3.415.965.965 2.138 1.275 3.415 1.333C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.058 2.45-.368 3.415-1.333.965-.965 1.275-2.138 1.333-3.415.058-1.277.072-1.686.072-4.948s-.014-3.668-.072-4.948c-.058-1.277-.368-2.45-1.333-3.415-.965-.965-2.138-1.275-3.415-1.333C15.668.014 15.259 0 12 0z" />
                                    <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zM18.406 4.594a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
                                </svg>
                                <a
                                    href="https://www.instagram.com/_civi_link_/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                >
                                    Instagram
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li>
                                <a href="/about" className="inline-block hover:text-teal-400 transition-colors">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/service" className="inline-block hover:text-teal-400 transition-colors">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="inline-block hover:text-teal-400 transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-6">Newsletter</h3>
                        <p className="text-gray-400 mb-4">
                            Subscribe to our newsletter to receive the latest news and updates.
                        </p>
                        <form className="mb-4">
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Your Email Address"
                                    className="w-full py-3 px-4 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                />
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-4 hover:from-green-600 hover:to-blue-600 transition-colors"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm mb-4 md:mb-0">
                            &copy; 2025 CiviLink. All Rights Reserved.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 text-sm hover:text-teal-400 transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-400 text-sm hover:text-teal-400 transition-colors">
                                Terms of Service
                            </a>
                            <a href="#" className="text-gray-400 text-sm hover:text-teal-400 transition-colors">
                                Sitemap
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
