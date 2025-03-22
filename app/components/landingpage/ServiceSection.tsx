"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

interface ServiceItem {
    title: string;
    description: string;
    image: string;
    icon: React.ReactNode;
    features?: string[];
    link: string;
}

interface ServicesProps {
    servicesRef: React.RefObject<HTMLDivElement | null>;
}

// MagneticButton no longer returns an anchor (<a>).
// Instead, it just returns a <motion.div> to avoid double anchor nesting.
const MagneticButton: React.FC<{
    children: React.ReactNode;
    className?: string;
}> = ({ children, className = "" }) => {
    const buttonRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!buttonRef.current) return;
        const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - (left + width / 2);
        const y = e.clientY - (top + height / 2);
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.div
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: x * 0.3, y: y * 0.3 }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={className}
        >
            {/* We ONLY render children (e.g., a single <Link> or <motion.a>) */}
            <motion.div
                animate={{ x: x * 0.4, y: y * 0.4 }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

const ParallaxImage = ({ src, speed = 0.5 }: { src: string; speed?: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [0, 100 * speed]);

    return (
        <motion.div ref={ref} style={{ y }} className="absolute inset-0 w-full h-full">
            <img src={src} alt="" className="w-full h-full object-cover" />
        </motion.div>
    );
};

const ServiceTab: React.FC<{
    title: string;
    isActive: boolean;
    onClick: () => void;
    index: number;
}> = ({ title, isActive, onClick, index }) => {
    return (
        <motion.button
            onClick={onClick}
            className={`relative px-6 py-3 rounded-full text-sm font-bold transition-colors ${
                isActive
                    ? "text-white bg-gradient-to-r from-green-500 to-blue-500"
                    : "text-gray-400 hover:text-white"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
        >
            {title}
            {isActive && (
                <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-full -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
        </motion.button>
    );
};

const ServicesSection: React.FC<ServicesProps> = ({ servicesRef }) => {
    const [activeServiceIndex, setActiveServiceIndex] = useState(0);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: servicesRef,
        offset: ["start end", "end start"],
    });
    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 300]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!sectionRef.current) return;
        const { left, top } = sectionRef.current.getBoundingClientRect();
        setCursorPosition({ x: e.clientX - left, y: e.clientY - top });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        },
    };

    // Mock services data
    const services: ServiceItem[] = [
        {
            title: "COMPANY BASED AUTHENTICATION",
            description:
                "Secure your project data with our robust company-based authentication system",
            image:
                "https://res.cloudinary.com/ddcbr53w0/image/upload/v1742411680/standard-quality-control-concept-m_23-2150041844_fonlge.avif",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
            ),
            features: [
                "Secure Access control",
                "User Role Management",
                "Permission Settings",
                "Data Privacy Compliance",
            ],
            link: "/service",
        },
        {
            title: "INTER PLATFORM MESSAGING",
            description:
                "Keep your team connected with real-time messaging across all platforms.",
            image:
                "https://res.cloudinary.com/ddcbr53w0/image/upload/v1742412624/representations-user-experience-interface-design_23-2150038906_voyjwd.jpg",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                >
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
                    <path d="M18 14h-8"></path>
                    <path d="M15 18h-5"></path>
                    <path d="M10 6h8v4h-8V6Z"></path>
                </svg>
            ),
            features: [
                "Real-Time messaging and communication",
                "Instant Updates",
                "File Sharing and Read Receipts",
            ],
            link: "/service",
        },
        {
            title: "CONSTRUCTION EXCELLENCE",
            description:
                "Building with precision and expertise, ensuring quality craftsmanship in every project we undertake.",
            image:
                "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                >
                    <rect x="2" y="6" width="20" height="8" rx="1"></rect>
                    <path d="M17 14v7"></path>
                    <path d="M7 14v7"></path>
                    <path d="M17 3v3"></path>
                    <path d="M7 3v3"></path>
                    <path d="M10 14v3"></path>
                    <path d="M14 14v3"></path>
                    <path d="M10 17h4"></path>
                </svg>
            ),
            features: [
                "Continuous improvement features to uphold high construction standards",
                "company-based authentication",
                "Project Management",
                "Inter-platform messaging",
                "Tender-management",
            ],
            link: "/services",
        },
        {
            title: "TENDER MANAGEMENT",
            description:
                "Simplify your tender process with our advanced management system.",
            image:
                "https://res.cloudinary.com/ddcbr53w0/image/upload/v1742413160/close-up-financial-report_1098-2701_ixesrp.jpg",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                >
                    <path d="M18 8a6 6 0 0 0-9.33-5"></path>
                    <path d="m10.67 5.8-2.2-2.2"></path>
                    <path d="m10.67 5.8 2.2-2.2"></path>
                    <path d="M6 12a6 6 0 0 0 9.33 5"></path>
                    <path d="m13.33 18.2 2.2 2.2"></path>
                    <path d="m13.33 18.2-2.2 2.2"></path>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                </svg>
            ),
            features: ["Tender Publication", "Real-Time updates", "Enhanced Transparency"],
            link: "/services",
        },
        {
            title: "PROJECT MANAGEMENT",
            description:
                "Comprehensive planning and management services to ensure your project proceeds smoothly from concept to completion.",
            image:
                "https://res.cloudinary.com/ddcbr53w0/image/upload/v1742412933/business-woman-talking-about-financial-project-taking-notes-discussing-start-up-ideas-using-laptop-diverse-employees-gathered-co-working-working-process-busy-company-teamwork-help-concept_482257-13564_csy7we.avif",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                >
                    <path d="M21 7v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12"></path>
                    <path d="M16 2v4h4"></path>
                    <path d="M16 2l4 4"></path>
                    <path d="m9 14.25.293-.294a1 1 0 0 1 1.414 0l.293.294a1 1 0 0 0 1.414 0l4.586-4.586"></path>
                    <path d="M3 14h3"></path>
                    <path d="M3 18h7"></path>
                </svg>
            ),
            features: [
                "Efficient Planning",
                "Real-Time Progress Tracking",
                "Resource Allocation",
                "Deadline Management",
                "Seamless Collaboration",
            ],
            link: "/services",
        },
    ];

    // Glow Dots
    const glowDots = Array.from({ length: 50 }).map((_, i) => {
        const size = Math.random() * 6 + 2;
        const delay = Math.random() * 2;
        const duration = Math.random() * 3 + 2;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.1;
        return { size, delay, duration, top, left, opacity };
    });

    return (
        <section
            ref={servicesRef}
            className="py-24 relative overflow-hidden bg-gray-900"
            onMouseMove={handleMouseMove}
        >
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Dark base */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />

                {/* Glow Dots */}
                {glowDots.map((dot, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-gradient-to-r from-green-400 to-blue-500 bg-opacity-40 blur-md"
                        style={{
                            width: `${dot.size}px`,
                            height: `${dot.size}px`,
                            top: `${dot.top}%`,
                            left: `${dot.left}%`,
                            opacity: dot.opacity,
                        }}
                        animate={{
                            opacity: [dot.opacity, dot.opacity * 2, dot.opacity],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: dot.duration,
                            repeat: Infinity,
                            delay: dot.delay,
                            ease: "easeInOut",
                        }}
                    />
                ))}

                {/* Noise Overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-40" />

                {/* Accent Lines */}
                <motion.div
                    className="absolute top-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-30"
                    style={{ y: backgroundY }}
                />
                <motion.div
                    className="absolute bottom-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"
                    style={{ y: useTransform(backgroundY, (value) => -value) }}
                />

                {/* Mouse-follow glow */}
                <motion.div
                    className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-green-500 to-blue-500 opacity-5 blur-3xl pointer-events-none"
                    animate={{
                        x: cursorPosition.x - 192,
                        y: cursorPosition.y - 192,
                    }}
                    transition={{
                        type: "spring",
                        damping: 30,
                        stiffness: 50,
                        mass: 0.5,
                    }}
                />
            </div>

            <div ref={sectionRef} className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="max-w-4xl mx-auto mb-16 text-center relative">
                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-8"
                    >
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 120 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mb-6"
                        />
                        <span className="inline-block px-4 py-1 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
              Our Services
            </span>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="relative inline-block mr-3">
                Exceptional
                <motion.span
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                Solutions
              </span>
                        </h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            className="text-xl text-gray-300 max-w-3xl mx-auto"
                        >
                            Discover our comprehensive range of services
                            designed to bring your vision to life with precision and excellence.
                        </motion.p>
                    </motion.div>

                    {/* Service Navigation Tabs */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-3 mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <AnimatePresence>
                            {services.map((service, index) => (
                                <ServiceTab
                                    key={service.title}
                                    title={service.title}
                                    isActive={activeServiceIndex === index}
                                    onClick={() => setActiveServiceIndex(index)}
                                    index={index}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Featured Service Display */}
                <div className="relative mb-20">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeServiceIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ type: "spring", stiffness: 100, damping: 15 }}
                            className="relative"
                        >
                            <div className="flex flex-col lg:flex-row gap-12">
                                {/* Left: Service Image */}
                                <motion.div
                                    className="lg:w-1/2 relative h-96 lg:h-auto overflow-hidden rounded-3xl"
                                    initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
                                    animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                                    transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
                                >
                                    <ParallaxImage
                                        src={services[activeServiceIndex].image}
                                        speed={0.3}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-70" />
                                    <motion.div
                                        className="absolute top-6 right-6 p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl shadow-lg"
                                        initial={{ scale: 0, rotate: -20 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 200,
                                            damping: 20,
                                            delay: 0.6,
                                        }}
                                    >
                                        <div className="text-white">
                                            {services[activeServiceIndex].icon}
                                        </div>
                                    </motion.div>
                                </motion.div>

                                {/* Right: Service Details */}
                                <motion.div
                                    className="lg:w-1/2"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <motion.h3
                                        variants={itemVariants}
                                        className="text-3xl font-bold text-white mb-6"
                                    >
                                        {services[activeServiceIndex].title}
                                        <motion.div
                                            className="w-16 h-1 bg-gradient-to-r from-green-400 to-blue-500 mt-4"
                                            initial={{ width: 0 }}
                                            animate={{ width: 64 }}
                                            transition={{ delay: 0.4, duration: 0.6 }}
                                        />
                                    </motion.h3>
                                    <motion.p
                                        variants={itemVariants}
                                        className="text-gray-300 text-lg mb-8"
                                    >
                                        {services[activeServiceIndex].description}
                                    </motion.p>

                                    {/* Features */}
                                    <motion.div variants={itemVariants} className="mb-10">
                                        <h4 className="text-cyan-400 font-semibold mb-4">
                                            KEY FEATURES
                                        </h4>
                                        <ul className="space-y-3">
                                            {services[activeServiceIndex].features?.map(
                                                (feature, idx) => (
                                                    <motion.li
                                                        key={idx}
                                                        className="flex items-start text-gray-300"
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
                                                    >
                                                        <motion.div
                                                            className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-blue-500 bg-opacity-20 flex items-center justify-center mt-1 mr-3 flex-shrink-0"
                                                            animate={{
                                                                scale: [1, 1.2, 1],
                                                                backgroundColor: [
                                                                    "rgba(16, 185, 129, 0.2)",
                                                                    "rgba(59, 130, 246, 0.4)",
                                                                    "rgba(16, 185, 129, 0.2)",
                                                                ],
                                                            }}
                                                            transition={{
                                                                duration: 3,
                                                                repeat: Infinity,
                                                                delay: idx * 1.2,
                                                            }}
                                                        >
                                                            <span className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></span>
                                                        </motion.div>
                                                        <span>{feature}</span>
                                                    </motion.li>
                                                )
                                            )}
                                        </ul>
                                    </motion.div>

                                    {/* CTA Button - single anchor, no nesting */}
                                    <motion.div variants={itemVariants}>
                                        <MagneticButton className="inline-block">
                                            {/*
                          We use a single <Link> OR <motion.a>
                          so there's NO nested anchors.
                      */}
                                            <Link href={services[activeServiceIndex].link}>
                                                <div className="relative px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 overflow-hidden group cursor-pointer">
                                                    {/* Hover Shine */}
                                                    <motion.div
                                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30"
                                                        initial={{ x: "-100%" }}
                                                        whileHover={{ x: "100%" }}
                                                        transition={{ duration: 0.6 }}
                                                    />
                                                    <span className="relative z-10 flex items-center">
                            Explore {services[activeServiceIndex].title}
                                                        <svg
                                                            className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                              <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                              ></path>
                            </svg>
                          </span>
                                                </div>
                                            </Link>
                                        </MagneticButton>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Service Cards Preview */}
                <div className="relative">
                    <motion.div
                        className="flex flex-nowrap overflow-x-auto pb-8 md:pb-12 hide-scrollbar gap-6 -mx-4 px-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {services
                            .filter((_, i) => i !== activeServiceIndex)
                            .slice(0, 4)
                            .map((service, index) => (
                                <motion.div
                                    key={service.title}
                                    className="w-80 flex-shrink-0 cursor-pointer"
                                    whileHover={{ y: -10 }}
                                    onClick={() =>
                                        setActiveServiceIndex(
                                            services.findIndex((s) => s.title === service.title)
                                        )
                                    }
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                >
                                    <div className="relative rounded-2xl overflow-hidden bg-gray-800 h-44 group">
                                        <div className="absolute inset-0 w-full h-full">
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-0 group-hover:opacity-30 transition-opacity" />
                                        <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-sm font-bold text-white max-w-[80%]">
                                                    {service.title}
                                                </h3>
                                                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                                                    <div className="text-white scale-75">
                                                        {service.icon}
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <motion.div
                                                    className="h-px w-0 bg-gradient-to-r from-green-400 to-blue-500 mb-3 group-hover:w-16 transition-all duration-300"
                                                />
                                                <p className="text-gray-300 text-sm line-clamp-2">
                                                    {service.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                    </motion.div>

                    {/* Example "Scroll for more" CTA */}
                    <Link href="/service">
                        <motion.div
                            className="hidden md:flex absolute -bottom-2 right-4 text-cyan-400 items-center space-x-2 text-sm cursor-pointer"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.6 }}
                        >
                            <span>Scroll for more</span>
                            <motion.div
                                animate={{ x: [0, 10, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    ></path>
                                </svg>
                            </motion.div>
                        </motion.div>
                    </Link>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    className="mt-24 relative"
                >
                    <div className="max-w-4xl mx-auto">
                        <div className="absolute -top-8 -left-8 w-40 h-40 border-2 border-green-500 border-opacity-20 rounded-3xl"></div>
                        <div className="absolute -bottom-8 -right-8 w-40 h-40 border-2 border-blue-500 border-opacity-20 rounded-3xl"></div>

                        <div className="relative p-10 rounded-3xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl"></div>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-teal-400/10 to-blue-500/5 rounded-3xl opacity-80"
                                animate={{
                                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                style={{ backgroundSize: "200% 100%" }}
                            />

                            <div className="relative z-10 flex flex-col lg:flex-row items-center text-center lg:text-left">
                                <div className="lg:w-3/4 mb-8 lg:mb-0 lg:pr-12">
                                    <motion.h3
                                        className="text-3xl font-bold text-white mb-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        Ready to Transform Your{" "}
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                      Vision
                    </span>{" "}
                                        into Reality?
                                    </motion.h3>
                                    <motion.p
                                        className="text-gray-300"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2, duration: 0.6 }}
                                    >
                                        Connect with our expert team today and discover how our services can help you achieve exceptional results.
                                    </motion.p>
                                </div>

                                <div className="lg:w-1/4">
                                    {/* Single anchor inside MagneticButton */}
                                    <MagneticButton>
                                        <Link href="/about">
                                            <div className="relative px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-xl shadow-xl overflow-hidden group cursor-pointer">
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30"
                                                    initial={{ x: "-100%" }}
                                                    whileHover={{ x: "100%" }}
                                                    transition={{ duration: 0.6 }}
                                                />
                                                <span className="relative z-10 flex items-center">
                          Get Started
                          <motion.svg
                              className="ml-2 w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                          >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </motion.svg>
                        </span>
                                            </div>
                                        </Link>
                                    </MagneticButton>
                                </div>
                            </div>

                            <motion.div
                                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur-3xl opacity-10"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesSection;
