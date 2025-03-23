"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AboutSectionProps {
    aboutRef: React.RefObject<HTMLDivElement | null>;
}

const AboutSection: React.FC<AboutSectionProps> = ({ aboutRef }) => {
    // Only render dynamic parts on the client to prevent hydration mismatches.
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    // These hooks depend on client scroll and will produce different values
    // between server and client. We only use them if mounted.
    const { scrollYProgress } = useScroll();
    const yParallax = useTransform(scrollYProgress, [0, 1], [0, 300]);

    // Animation variants
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const fadeInUp = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 50, damping: 12 }
        }
    };

    // Company values data
    const values = [
        {
            icon: "🏗️",
            title: "Empowering Construction Connections",
            description:
                "We are dedicated to transforming the construction industry by connecting contractors, clients, and consultants through a seamless digital platform, ensuring efficient collaboration and project success."
        },
        {
            icon: "🌱",
            title: "Sustainable Growth in Construction",
            description:
                "Our platform encourages environmentally responsible practices by promoting contractors and consultants who prioritize sustainable construction methods."
        },
        {
            icon: "🤝",
            title: "Bridging Partnerships for Success",
            description:
                "We foster strong connections among industry professionals by promoting trust, transparency, and streamlined communication to ensure successful project outcomes.."
        }
    ];

    return (
        <section
            className="py-24 bg-gray-900 relative overflow-hidden"
            ref={aboutRef}
            id="about"
        >
            {/* Render decorative elements only on client */}
            {mounted && (
                <>
                    <motion.div
                        initial={false}
                        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-green-500/5 to-blue-500/5 blur-3xl"
                        animate={{ x: [10, -10, 10], y: [0, 15, 0] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        initial={false}
                        className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gradient-to-br from-green-500/5 to-blue-500/5 blur-3xl"
                        animate={{ x: [-20, 20, -20], y: [15, 0, 15] }}
                        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(20,184,166,0.05),transparent_70%)]"></div>
                </>
            )}

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column - Company Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="mb-2">
                            <motion.span
                                className="text-teal-400 font-medium text-sm tracking-widest uppercase"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                            >
                                Who We Are
                            </motion.span>
                        </div>

                        <motion.h2
                            className="text-4xl md:text-5xl font-bold text-white mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                        >
                            Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Excellence</span>
                        </motion.h2>

                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 100 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="h-1 bg-gradient-to-r from-green-400 to-blue-500 mb-8"
                        ></motion.div>

                        <motion.p
                            className="text-gray-300 mb-8 text-lg leading-relaxed"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.5 }}
                        >
                            We redefine excellence by seamlessly connecting the construction industry&apos;s key players. Our digital platform empowers contractors, consultants, and clients to collaborate with confidence, ensuring that every project reflects our unwavering commitment to quality, sustainability, and innovation. We are more than a network &ndash; we are a catalyst for building a future where every construction project embodies the highest standards of craftsmanship and trust.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.7 }}
                            className="flex flex-wrap gap-4"
                        >
                            {/* Optionally, add buttons or links here */}
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Mission Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Decorative elements */}
                        <motion.div
                            className="absolute -top-8 -left-8 w-20 h-20 border-t-4 border-l-4 border-teal-500 z-10"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        ></motion.div>

                        <motion.div
                            className="absolute -bottom-8 -right-8 w-20 h-20 border-b-4 border-r-4 border-blue-500 z-10"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                        ></motion.div>

                        <motion.div
                            className="bg-gray-800 rounded-lg overflow-hidden relative z-0 shadow-[0_0_30px_rgba(20,184,166,0.15)]"
                            whileHover={{ boxShadow: "0 0 40px rgba(20, 184, 166, 0.25)" }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="bg-gradient-to-r from-green-500 to-blue-500 py-5 px-8">
                                <h3 className="text-xl font-bold text-white">OUR COMPANY MISSION</h3>
                            </div>

                            <div className="p-8">
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.3 }}
                                    variants={staggerContainer}
                                    className="space-y-8"
                                >
                                    {values.map((value, index) => (
                                        <motion.div
                                            key={index}
                                            variants={fadeInUp}
                                            className="flex items-start space-x-5"
                                            whileHover={{ x: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 flex items-center justify-center text-2xl">
                                                <motion.div
                                                    whileHover={{ rotate: 360, scale: 1.2 }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    {value.icon}
                                                </motion.div>
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-white mb-2">{value.title}</h4>
                                                <p className="text-gray-400">{value.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                <motion.div
                                    className="mt-8 pt-6 border-t border-gray-700"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 1 }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="h-px w-10 bg-gradient-to-r from-green-400 to-blue-500"></div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 mt-4">
                                        {/* Optionally, add additional stats here */}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
