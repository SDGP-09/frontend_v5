"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    ChevronRight,
    MessageCircle,
    LogOut,
    Building,
    Compass,
    HardHat,
    Layers,
    FileText,
    ClipboardCheck,
    Briefcase
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MainConsole() {
    const router = useRouter();
    const [hoverProject, setHoverProject] = useState(false);
    const [hoverTender, setHoverTender] = useState(false);
    const [hoverSupport, setHoverSupport] = useState(false);

    const handleLogout = () => {
        console.log("Logging out...");
        // For example: router.push("/login");
    };

    return (
        <div className="w-full h-screen flex flex-col bg-gradient-to-br from-blue-50 to-slate-100 p-4">
            {/* Header with Logo and Logout */}
            <div className="w-full flex justify-between items-center mb-2">
                <motion.div
                    className="flex-shrink-0 flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <Link href="/" className="flex items-center">
                        <div className="relative flex items-center">
                            <div className="w-8 h-8 bg-black transform rotate-45"></div>
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 transform -translate-x-4 rotate-45"></div>
                        </div>
                        <div className="ml-3">
                            <div className="text-lg font-bold text-slate-800">CIVILINK</div>
                            <div className="text-xs tracking-wider text-slate-600">
                                CONNECTING CONTRACTORS AND CLIENTS
                            </div>
                        </div>
                    </Link>
                </motion.div>

                <div className="flex items-center space-x-3">
                    <motion.button
                        onClick={handleLogout}
                        className="px-3 py-2 bg-slate-200 text-slate-700 rounded-md font-medium hover:bg-slate-300 transition-colors shadow-md flex items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <LogOut className="h-4 w-4 mr-1" />
                        Logout
                    </motion.button>
                </div>
            </div>

            {/* Header section */}
            <motion.div
                className="w-full py-4 flex flex-col justify-center items-center text-center space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-5xl font-bold text-slate-800 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">
                    Sri Lanka&apos;s Premier Construction Platform
                </h1>
                <p className="text-lg font-medium text-slate-600 max-w-3xl">
                    Streamline your construction projects with our comprehensive management solution
                </p>
            </motion.div>

            {/* Cards container */}
            <div className="flex justify-center mt-4 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                    {/* Project Management Card */}
                    <motion.div
                        className={`relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md transition-all duration-300 ${
                            hoverProject ? "shadow-2xl transform scale-105" : ""
                        }`}
                        onMouseEnter={() => setHoverProject(true)}
                        onMouseLeave={() => setHoverProject(false)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <button
                            onClick={() => router.push("/application/main-console/project")}
                            className="w-full h-full p-5 flex flex-col items-center text-center group"
                        >
                            {/* Project Management Icon Animation */}
                            <motion.div
                                className="relative h-32 w-32 flex items-center justify-center mb-4"
                            >
                                {/* Background elements */}
                                <motion.div
                                    className="absolute top-0 left-0 w-16 h-16 bg-blue-100 rounded-full opacity-60"
                                    animate={{
                                        x: [0, 8, 0],
                                        y: [0, -8, 0]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                                <motion.div
                                    className="absolute bottom-0 right-0 w-20 h-20 bg-blue-200 rounded-full opacity-60"
                                    animate={{
                                        x: [0, -10, 0],
                                        y: [0, 10, 0]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                                <motion.div
                                    className="absolute bottom-4 left-4 w-14 h-14 bg-indigo-100 rounded-full opacity-70"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />

                                {/* Main Icon Group */}
                                <motion.div
                                    className="relative z-10 flex items-center justify-center"
                                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    {/* Building Icon */}
                                    <motion.div
                                        className="absolute"
                                        initial={{ opacity: 1 }}
                                        animate={{
                                            opacity: [1, 0.2, 1],
                                            scale: [1, 0.8, 1]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            repeatType: "reverse"
                                        }}
                                    >
                                        <Building className="h-16 w-16 text-blue-700" />
                                    </motion.div>

                                    {/* Layers Icon */}
                                    <motion.div
                                        className="absolute"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: [0, 1, 0],
                                            scale: [0.8, 1.1, 0.8],
                                            rotate: [0, 15, 0]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            repeatType: "reverse"
                                        }}
                                    >
                                        <Layers className="h-14 w-14 text-blue-500" />
                                    </motion.div>

                                    {/* Compass/Architect Icon */}
                                    <motion.div
                                        className="absolute"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: [0, 1, 0],
                                            scale: [0.7, 1, 0.7],
                                            rotate: [0, -10, 0]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 1.3,
                                            repeatType: "reverse"
                                        }}
                                    >
                                        <Compass className="h-16 w-16 text-indigo-600" />
                                    </motion.div>

                                    {/* Hard Hat Icon */}
                                    <motion.div
                                        className="absolute"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: [0, 1, 0],
                                            y: [5, -5, 5],
                                            scale: [0.8, 1.1, 0.8]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 2.5,
                                            repeatType: "reverse"
                                        }}
                                    >
                                        <HardHat className="h-14 w-14 text-blue-600" />
                                    </motion.div>
                                </motion.div>
                            </motion.div>

                            <h2 className="text-2xl font-bold text-slate-800 mb-2 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r from-blue-600 to-blue-800 transition-colors duration-300">
                                Project Management
                            </h2>
                            <p className="text-slate-600 mb-4 text-sm group-hover:text-blue-600 transition-colors duration-300">
                                Create, monitor, and deliver construction projects efficiently with comprehensive tracking tools
                            </p>
                            <div
                                className={`mt-auto flex items-center text-blue-600 font-medium transition-all duration-300 ${
                                    hoverProject ? "text-blue-700" : ""
                                }`}
                            >
                                <span>Manage projects</span>
                                <ChevronRight
                                    className={`h-4 w-4 ml-1 transition-transform duration-300 ${
                                        hoverProject ? "transform translate-x-1" : ""
                                    }`}
                                />
                            </div>
                        </button>
                    </motion.div>

                    {/* Tender Management Card */}
                    <motion.div
                        className={`relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md transition-all duration-300 ${
                            hoverTender ? "shadow-2xl transform scale-105" : ""
                        }`}
                        onMouseEnter={() => setHoverTender(true)}
                        onMouseLeave={() => setHoverTender(false)}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <button
                            onClick={() => router.push("/application/main-console/tender-management")}
                            className="w-full h-full p-5 flex flex-col items-center text-center group"
                        >
                            {/* Tender Management Icon Animation */}
                            <motion.div
                                className="relative h-32 w-32 flex items-center justify-center mb-4"
                            >
                                {/* Background elements */}
                                <motion.div
                                    className="absolute top-2 right-2 w-16 h-16 bg-green-100 rounded-full opacity-60"
                                    animate={{
                                        x: [0, -8, 0],
                                        y: [0, 8, 0]
                                    }}
                                    transition={{
                                        duration: 3.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                                <motion.div
                                    className="absolute bottom-2 left-2 w-20 h-20 bg-green-200 rounded-full opacity-60"
                                    animate={{
                                        x: [0, 10, 0],
                                        y: [0, -10, 0]
                                    }}
                                    transition={{
                                        duration: 4.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                                <motion.div
                                    className="absolute bottom-0 right-4 w-14 h-14 bg-emerald-100 rounded-full opacity-70"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />

                                {/* Main Icon Group */}
                                <motion.div
                                    className="relative z-10 flex items-center justify-center"
                                    animate={{ rotate: [0, -5, 0, 5, 0] }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    {/* FileText Icon */}
                                    <motion.div
                                        className="absolute"
                                        initial={{ opacity: 1 }}
                                        animate={{
                                            opacity: [1, 0.2, 1],
                                            scale: [1, 0.8, 1]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            repeatType: "reverse"
                                        }}
                                    >
                                        <FileText className="h-16 w-16 text-green-700" />
                                    </motion.div>

                                    {/* ClipboardCheck Icon */}
                                    <motion.div
                                        className="absolute"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: [0, 1, 0],
                                            scale: [0.8, 1.1, 0.8],
                                            rotate: [0, -15, 0]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            repeatType: "reverse"
                                        }}
                                    >
                                        <ClipboardCheck className="h-14 w-14 text-green-500" />
                                    </motion.div>

                                    {/* Briefcase Icon */}
                                    <motion.div
                                        className="absolute"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: [0, 1, 0],
                                            scale: [0.7, 1, 0.7],
                                            rotate: [0, 10, 0]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 1.3,
                                            repeatType: "reverse"
                                        }}
                                    >
                                        <Briefcase className="h-16 w-16 text-emerald-600" />
                                    </motion.div>

                                    {/* Another instance of ClipboardCheck with different animation */}
                                    <motion.div
                                        className="absolute"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: [0, 1, 0],
                                            y: [5, -5, 5],
                                            scale: [0.8, 1.1, 0.8]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 2.5,
                                            repeatType: "reverse"
                                        }}
                                    >
                                        <ClipboardCheck className="h-14 w-14 text-green-600" />
                                    </motion.div>
                                </motion.div>
                            </motion.div>

                            <h2 className="text-2xl font-bold text-slate-800 mb-2 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r from-green-600 to-green-800 transition-colors duration-300">
                                Tender Management
                            </h2>
                            <p className="text-slate-600 mb-4 text-sm group-hover:text-green-600 transition-colors duration-300">
                                Streamline your bidding process with automated tender creation, submission, and evaluation tools
                            </p>
                            <div
                                className={`mt-auto flex items-center text-green-600 font-medium transition-all duration-300 ${
                                    hoverTender ? "text-green-700" : ""
                                }`}
                            >
                                <span>Manage Tenders</span>
                                <ChevronRight
                                    className={`h-4 w-4 ml-1 transition-transform duration-300 ${
                                        hoverTender ? "transform translate-x-1" : ""
                                    }`}
                                />
                            </div>
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Support Banner */}
            <motion.div
                className={`mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-5 flex flex-col md:flex-row justify-between items-center shadow-lg ${
                    hoverSupport ? "shadow-xl" : ""
                }`}
                onMouseEnter={() => setHoverSupport(true)}
                onMouseLeave={() => setHoverSupport(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="text-sm md:text-base font-medium text-center md:text-left">
                    Need assistance with your construction management?
                </div>
                <motion.button
                    onClick={() => router.push("/messenger")}

                    className="mt-3 md:mt-0 px-4 py-2 bg-white text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-colors shadow-md flex items-center text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Contact Support
                </motion.button>
            </motion.div>
        </div>
    );
}