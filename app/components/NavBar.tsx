"use client";


import "../globals.css";
import { Building2 } from "lucide-react";
import { useState } from "react";
import Login from "@/app/components/Login";



export default function NavBar() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <>
            {showLogin?<Login onClose={() => setShowLogin(false) } /> : ""}


      <nav className="bg-white shadow-md px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Building2 className="h-8 w-8 text-green-500" />
                    <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                    CiviLink
                  </span>
                </div>
                <div className="space-x-4">
                    <button
                        onClick={() => setShowLogin(true)}
                        className="px-4 py-2 text-green-600 hover:text-green-700 font-medium transition-all duration-200"
                    >
                        Login
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300">
                        Sign Up
                    </button>
                </div>
            </div>
        </nav>

        </>

    );
}
