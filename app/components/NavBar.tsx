"use client";

import "../globals.css";
import { Building2, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import Login from "@/app/components/Login";

export default function NavBar() {
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();
    const pathname = usePathname(); // Get current route

    const protectedPaths = ["/application","/common"]; // Define protected routes

    // Function to check for token
    const checkToken = () => {
        const savedToken = Cookies.get("token");
        setToken(savedToken || null);
    };

    useEffect(() => {
        checkToken(); // Check token on mount

        // If user is on a protected route and no token is found, prevent navigation
        if (protectedPaths.some(path => pathname.startsWith(path)) && !Cookies.get("token")) {
            setShowLogin(true); // Show login modal
            router.push("/"); // Redirect to home or a login page
        }
    }, [pathname]); // Re-run when route changes

    // Logout function
    const handleLogout = () => {
        Cookies.remove("token");
        setToken(null);
        router.push("/");
    };

    return (
        <>
            {showLogin && <Login onClose={() => setShowLogin(false)} onLoginSuccess={checkToken} />}

            <nav className="bg-white shadow-md px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <Building2 className="h-8 w-8 text-green-500" />
                        <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                            CiviLink
                        </span>
                    </div>
                    <div className="space-x-4">
                        {token ? (
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => router.push("/profile")}
                                    className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2"
                                >
                                    <User className="h-5 w-5" />
                                    <span>Profile</span>
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-red-600 hover:text-red-700 font-medium transition-all duration-200 flex items-center space-x-2"
                                >
                                    <LogOut className="h-5 w-5" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={() => setShowLogin(true)}
                                    className="px-4 py-2 text-green-600 hover:text-green-700 font-medium transition-all duration-200"
                                >
                                    Login
                                </button>
                                <button className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300">
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
