"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface StatItem {
    icon: React.ReactNode;
    value: number;
    suffix: string;
    label: string;
    description?: string;
}

interface CounterProps {
    target: number;
    duration: number;
    suffix?: string;
}

const Counter: React.FC<CounterProps> = ({ target, duration, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const nodeRef = React.useRef<HTMLSpanElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                }
            },
            { threshold: 0.1 }
        );
        const currentNode = nodeRef.current;
        if (currentNode) {
            observer.observe(currentNode);
        }
        return () => {
            if (currentNode) {
                observer.unobserve(currentNode);
            }
        };
    }, []);

    useEffect(() => {
        if (!isInView) return;
        let startTime: number | null = null;
        let animationFrameId: number;
        const updateCount = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) {
                animationFrameId = requestAnimationFrame(updateCount);
            }
        };
        animationFrameId = requestAnimationFrame(updateCount);
        return () => cancelAnimationFrame(animationFrameId);
    }, [target, duration, isInView]);

    return <span ref={nodeRef}>{count}{suffix}</span>;
};

const StatsSection: React.FC = () => {
    // Use a mounted flag so that dynamic elements are only rendered on the client.
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const { scrollYProgress } = useScroll();
    const yParallax = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

    // Replace this stats array with your actual data if needed.
    const stats: StatItem[] = [
        // Example stat (uncomment and replace with your own data if needed)
        // {
        //   icon: (
        //     <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        //       <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        //     </svg>
        //   ),
        //   value: 350,
        //   suffix: "+",
        //   label: "PROJECTS",
        //   description: "Successful construction projects delivered on time"
        // },
    ];

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Gradient waveform effect for background
    const waveVariants = {
        animate: {
            y: [0, -10, 0],
            transition: {
                y: {
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut"
                }
            }
        }
    };

    return (
        <section className="py-24 relative overflow-hidden bg-white">
            {/* Render decorative animated elements only on the client */}
            {mounted && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Gradient waves */}
                    <motion.div
                        initial={false}
                        className="absolute -top-1/2 left-0 right-0 w-full h-full bg-gradient-to-b from-cyan-50 to-transparent opacity-70"
                        variants={waveVariants}
                        animate="animate"
                    />
                    {/* Abstract shape 1 */}
                    <motion.div
                        initial={false}
                        className="absolute top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-green-300 to-blue-400 opacity-40 blur-3xl"
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        style={{ y: yParallax }}
                    />
                    {/* Abstract shape 2 */}
                    <motion.div
                        initial={false}
                        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-tr from-gray-800 to-gray-900 opacity-10 blur-2xl"
                        animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {/* Grid pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="h-full w-full bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-4 relative z-10">
                {/* Modern Header Section */}
                <div className="mb-20 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        {/* Accent Bar */}
                        <motion.div
                            className="w-20 h-2 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-5 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: 80 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        />

                        <span className="inline-block px-4 py-1 bg-cyan-50 text-teal-700 rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
              Our Impact
            </span>

                        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              <span className="relative inline-block">
                <span className="relative z-10">WHY </span>
                <motion.div
                    className="absolute -bottom-2 left-0 h-3 bg-cyan-100 w-full -z-10"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>{' '}
                            <span className="text-teal-500">CIVILINK</span>{' '}
                            <span className="text-gray-800">IS SPECIAL?</span>
                        </h2>

                        <motion.p
                            className="text-gray-600 text-lg max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            We connect you with top construction professionals, simplify project management, and provide genuine, transparent feedback every step of the way.
                        </motion.p>
                    </motion.div>
                </div>

                {/* Modern Glass-like Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="group relative"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onHoverStart={() => setHoveredIndex(index)}
                            onHoverEnd={() => setHoveredIndex(null)}
                        >
                            {/* Animated background on hover */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-100"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: hoveredIndex === index ? [0, 0.9, 0] : 0 }}
                                transition={{ duration: 1.5, repeat: hoveredIndex === index ? Infinity : 0 }}
                            />

                            {/* Glass-like card */}
                            <div className="relative p-0.5 rounded-3xl overflow-hidden bg-gradient-to-br from-green-400 to-blue-500 shadow-xl shadow-blue-100">
                                <div className="relative bg-white rounded-3xl h-full p-8 backdrop-blur-sm">
                                    <div className="flex items-start mb-6">
                                        <motion.div
                                            className="flex-shrink-0 p-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl mr-6 overflow-hidden shadow-lg"
                                            whileHover={{ scale: 1.1, boxShadow: "0 15px 30px rgba(14, 165, 233, 0.3)" }}
                                        >
                                            {stat.icon}
                                        </motion.div>

                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900 tracking-wide mb-1">{stat.label}</h4>
                                            <div className="text-5xl font-black text-gray-800 flex items-baseline">
                                                <Counter target={stat.value} duration={2000} suffix={stat.suffix} />
                                            </div>
                                            <motion.div
                                                className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-500 mt-2"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: 48 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.3, duration: 0.5 }}
                                            />
                                        </div>
                                    </div>

                                    <p className="text-gray-600">{stat.description}</p>

                                    {/* Modern decorative element */}
                                    <motion.div
                                        className="absolute bottom-4 right-6"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4, duration: 0.6 }}
                                    >
                                        <motion.div
                                            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-cyan-100 group-hover:border-teal-400 transition-colors duration-300"
                                            whileHover={{ scale: 1.2, rotate: 90 }}
                                        >
                                            <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                            </svg>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Featured Stat with 3D Effect */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="relative mb-20"
                    style={{ scale }}
                >
                    <div className="max-w-4xl mx-auto">
                        {/* 3D Layered Effect */}
                        <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-3xl transform rotate-2 opacity-20"></div>
                        <div className="absolute -bottom-4 -left-4 w-full h-full bg-gray-900 rounded-3xl transform -rotate-2 opacity-10"></div>

                        <div className="relative bg-gradient-to-br from-white to-cyan-50 rounded-3xl p-10 border border-cyan-100 shadow-2xl overflow-hidden">
                            <div className="flex flex-col md:flex-row md:items-center">
                                <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
                                    <motion.h3
                                        className="text-3xl font-bold text-gray-900 mb-4"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.6 }}
                                    >
                                        Building Excellence, <span className="text-teal-500">Delivering Trust</span>
                                    </motion.h3>

                                    <motion.p
                                        className="text-gray-600 mb-6"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.7 }}
                                    >
                                        Our commitment to quality and innovation has made us the industry leader. Experience the difference of working with a team that values excellence in every detail.
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.8 }}
                                    >
                                        <motion.a
                                            href="/service"
                                            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors group relative overflow-hidden"
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                      <span className="relative z-10 flex items-center">
                        View More
                        <svg
                            className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </span>
                                        </motion.a>
                                    </motion.div>
                                </div>

                                <div className="md:w-1/3 relative">
                                    {/* Additional content can be placed here */}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Modern Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    className="relative"
                >
                    <div className="max-w-3xl mx-auto">
                        <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-10 overflow-hidden">
                            <motion.div
                                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-teal-500 to-blue-500"
                                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                style={{ backgroundSize: '200% 100%' }}
                            />

                            <div className="relative z-10 flex flex-col md:flex-row items-center">
                                <div className="flex-1 text-center md:text-left mb-6 md:mb-0">
                                    <h4 className="text-2xl font-bold text-white mb-2">Ready to build something amazing?</h4>
                                    <p className="text-gray-300">We&apos;re here to turn your vision into reality.</p>
                                </div>
                                <div>
                                    <motion.a
                                        href="/company"
                                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:from-green-600 hover:to-blue-600 transition-colors relative overflow-hidden group"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <motion.span
                                            className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                                            initial={{ x: '-100%' }}
                                            whileHover={{ x: '100%' }}
                                            transition={{ duration: 0.5 }}
                                        />
                                        <span className="relative z-10 flex items-center">
                      Get Started
                      <svg
                          className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </span>
                                    </motion.a>
                                </div>
                            </div>
                            <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-blue-400 rounded-full opacity-10 blur-xl"></div>
                            <div className="absolute -top-12 -left-12 w-40 h-40 bg-green-400 rounded-full opacity-10 blur-xl"></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default StatsSection;
