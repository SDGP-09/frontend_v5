"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from 'framer-motion';

interface HeroSlide {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    ctaText: string;
    stats?: {
        value: string;
        label: string;
    }[];
    tags?: string[];
}

interface HeroSectionProps {
    heroRef: React.RefObject<HTMLDivElement| null>;
}

// Parallax effect hook
const useParallax = (value: MotionValue<number>, distance: number) => {
    return useTransform(value, [0, 1], [-distance, distance]);
};

const HeroSection: React.FC<HeroSectionProps> = ({ heroRef }) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [direction, setDirection] = useState<number>(0);
    const [activeView, setActiveView] = useState<'horizontal' | 'vertical'>('horizontal');

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const y = useParallax(scrollYProgress, 300);

    // Horizontal slides data
    const horizontalSlides: HeroSlide[] = [
        {
            id: 1,
            title: "Connecting Construction Professionals",
            subtitle: "Streamlining Collaboration",
            description: "CiviLink bridges the gap between contractors and clients, creating a seamless ecosystem for successful project delivery.",
            image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
            ctaText: "",

        },
        {
            id: 2,
            title: "Build Better, Together",
            subtitle: "Project Management Simplified",
            description: "Our innovative platform enables company based authentication, project management, real-time collaboration and inter-platform messaging.",
            image: "https://res.cloudinary.com/ddcbr53w0/image/upload/v1742633254/landscape-with-plane-flying-sky_23-2149553591_lixd8b.jpg",
            ctaText: "",

        },
        {
            id: 3,
            title: "Construction Excellence",
            subtitle: "Your Vision, Our Expertise",
            description: "Find the perfect partners for your construction projects with our intelligent matching algorithm and verified professional network.",
            image: "https://res.cloudinary.com/ddcbr53w0/image/upload/v1742633254/construction-works-frankfurt-downtown-germany_1268-20907_gcslcr.avif",
            ctaText: "",

        }
    ];

    // Vertical slides data
    const verticalSlides: HeroSlide[] = [
        {
            id: 1,
            title: "For General Contractors",
            subtitle: "Streamline Your Projects",
            description: "Access a network of qualified subcontractors, manage projects efficiently, and reduce administrative overhead.Find new opportunities, showcase your expertise, and build lasting relationships with top contractors.",
            image: "https://res.cloudinary.com/ddcbr53w0/image/upload/v1740421412/civil-engineer-construction-worker-manager-holding-digital-tablet-blueprints-talking-planing-about-construction-site-cooperation-teamwork-concept_jw7skb.jpg",
            ctaText: "",

        },
        {
            id: 2,
            title: "For Clients",
            subtitle: "Boost your success with top-tier contractors.",
            description: "Accelerate your success by exploring fresh opportunities, highlighting your unique strengths, and forging enduring partnerships with leading contractors.",
            image: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
            ctaText: "",

        },
        {
            id: 3,
            title: "For Consultants",
            subtitle: "Streamline Your Projects",
            description: "Access a network of top construction professionals, manage client engagements efficiently, and simplify administrative tasks. Discover new opportunities, showcase your specialized expertise, and build lasting partnerships with industry leaders.",
            image: "https://res.cloudinary.com/ddcbr53w0/image/upload/v1740422118/smiling-entrepreneurs-discussing-business-document-folder_xeqsjk.jpg",

            ctaText: "",

        }
    ];

    // Ref for vertical slider
    const verticalSliderRef = useRef<HTMLDivElement>(null);
    const [verticalSlide, setVerticalSlide] = useState<number>(0);

    // Auto slide for horizontal slider
    useEffect(() => {
        if (activeView === 'horizontal') {
            const interval = setInterval(() => {
                nextSlide();
            }, 7000);

            return () => clearInterval(interval);
        }
    }, [currentSlide, activeView]);

    // Handle vertical scroll
    useEffect(() => {
        if (activeView === 'vertical' && verticalSliderRef.current) {
            const handleWheel = (e: WheelEvent) => {
                e.preventDefault();
                if (e.deltaY > 0) {
                    // Scroll down
                    setVerticalSlide(prev => Math.min(prev + 1, verticalSlides.length - 1));
                } else {
                    // Scroll up
                    setVerticalSlide(prev => Math.max(prev - 1, 0));
                }
            };

            const element = verticalSliderRef.current;
            element.addEventListener('wheel', handleWheel, { passive: false });

            return () => {
                element.removeEventListener('wheel', handleWheel);
            };
        }
    }, [activeView, verticalSlides.length]);

    // Slides transition variants for horizontal slider
    const horizontalVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 0.98
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1]
            }
        },
        exit: (direction: number) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 0.98,
            transition: {
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1]
            }
        })
    };

    // Vertical slide variants
    const verticalVariants = {
        enter: (direction: number) => ({
            y: direction > 0 ? '40%' : '-40%',
            opacity: 0,
            transition: {
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1]
            }
        }),
        center: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1]
            }
        },
        exit: (direction: number) => ({
            y: direction < 0 ? '40%' : '-40%',
            opacity: 0,
            transition: {
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1]
            }
        })
    };

    // Content animation variants with staggered children
    const contentVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
        }
    };

    // Stats animation variants
    const statsVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.8
            }
        }
    };

    const statItemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20
            }
        }
    };

    // Tags animation variants
    const tagsVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 1
            }
        }
    };

    const tagItemVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        }
    };

    // Next slide handler for horizontal slider
    const nextSlide = () => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % horizontalSlides.length);
    };

    // Previous slide handler for horizontal slider
    const prevSlide = () => {
        setDirection(-1);
        setCurrentSlide((prev) => (prev === 0 ? horizontalSlides.length - 1 : prev - 1));
    };

    // Navigation dots for horizontal slider
    const handleDotClick = (index: number) => {
        setDirection(index > currentSlide ? 1 : -1);
        setCurrentSlide(index);
    };

    // Toggle between horizontal and vertical views
    const toggleView = () => {
        setActiveView(activeView === 'horizontal' ? 'vertical' : 'horizontal');
    };

    return (
        <section
            className="relative h-screen overflow-hidden"
            ref={heroRef}
            style={{ background: "linear-gradient(90deg, #22c55e 0%, #0ea5e9 100%)" }}
        >
            {activeView === 'horizontal' ? (
                /* Horizontal Slider */
                <div className="relative w-full h-full">
                    <div className="absolute inset-0 overflow-hidden">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={currentSlide}
                                custom={direction}
                                variants={horizontalVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="absolute inset-0 w-full h-full"
                            >
                                {/* Background Image */}
                                <motion.div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url(${horizontalSlides[currentSlide].image})`,
                                        filter: 'brightness(0.3)'
                                    }}
                                    initial={{ scale: 1.1, filter: 'brightness(0.25)' }}
                                    animate={{ scale: 1, filter: 'brightness(0.3)' }}
                                    transition={{ duration: 8, ease: "easeOut" }}
                                ></motion.div>

                                {/* Gradient Overlay - Using CiviLink's green-to-blue gradient */}
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500/80 via-teal-500/70 to-blue-500/80 mix-blend-overlay"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                                {/* Geometric Accents */}
                                <div className="absolute inset-0 pointer-events-none">
                                    {/* Top right geometric accent */}
                                    <div className="absolute top-0 right-0 w-96 h-96 -mt-24 -mr-24 opacity-10">
                                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="#FFFFFF" d="M45.3,-51.2C58.9,-43.4,70.3,-29.2,76.2,-12.1C82.2,5,82.8,25,73.6,37.4C64.4,49.8,45.4,54.5,28.8,57.9C12.2,61.3,-2,63.4,-18.7,61.1C-35.3,58.8,-54.5,52,-65.2,38.7C-75.9,25.3,-78.1,5.4,-73.3,-11.5C-68.6,-28.5,-56.8,-42.6,-43,-50.5C-29.1,-58.4,-13.2,-60.2,1.3,-61.7C15.8,-63.2,31.6,-59,45.3,-51.2Z" transform="translate(100 100)" />
                                        </svg>
                                    </div>

                                    {/* Bottom left geometric accent */}
                                    <div className="absolute bottom-0 left-0 w-96 h-96 -mb-24 -ml-24 opacity-10">
                                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="#FFFFFF" d="M47.7,-57.2C63,-47.3,77.5,-33.4,81.6,-16.8C85.7,-0.2,79.3,19.2,68.1,33.8C56.9,48.5,40.8,58.4,23.4,65.7C6,72.9,-12.8,77.5,-30.3,73.2C-47.9,69,-64.2,55.9,-73.5,38.9C-82.8,21.8,-85.1,0.8,-79.5,-17.1C-73.9,-35.1,-60.3,-49.9,-44.8,-59.8C-29.3,-69.7,-11.9,-74.8,2.9,-78.3C17.7,-81.9,32.5,-67.1,47.7,-57.2Z" transform="translate(100 100)" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>






                    {/* Content Container */}
                    <div className="container mx-auto px-4 h-full relative z-10">
                        <div className="flex h-full items-center pt-16">
                            <div className="w-full md:w-2/3 lg:w-1/2 mt-10">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`content-${currentSlide}`}
                                        variants={contentVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        className="space-y-7"
                                    >
                                        {/* Slide Subtitle */}
                                        <motion.span
                                            variants={itemVariants}
                                            className="inline-block mb-2 px-4 py-1 bg-white/90 backdrop-blur-md text-blue-700 text-sm font-bold tracking-wider rounded-md"
                                        >
                                            {horizontalSlides[currentSlide].subtitle}
                                        </motion.span>

                                        {/* Slide Title */}
                                        <motion.h1
                                            variants={itemVariants}
                                            className="text-5xl md:text-6xl font-bold text-white leading-tight"
                                        >
                                            {horizontalSlides[currentSlide].title.split(' ').map((word, i) => (
                                                <span key={i} className="inline-block mr-3">
                          {word}
                        </span>
                                            ))}
                                        </motion.h1>

                                        {/* Slide Description */}
                                        <motion.p
                                            variants={itemVariants}
                                            className="text-xl text-gray-100 leading-relaxed max-w-xl"
                                        >
                                            {horizontalSlides[currentSlide].description}
                                        </motion.p>


                                        <motion.div
                                            variants={itemVariants}
                                            className="flex flex-wrap gap-4 mt-8"
                                        >
                                            <motion.a
                                                href="/company"
                                                className="inline-block px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-sm tracking-wider rounded-md shadow-lg shadow-blue-900/20 border border-white/10"
                                                whileHover={{
                                                    scale: 1.05,
                                                    boxShadow: "0 15px 30px -5px rgba(59, 130, 246, 0.5)",
                                                }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {/*{horizontalSlides[currentSlide].ctaText}*/}
                                                Search Contractors and Consultants

                                            </motion.a>
                                            <motion.a
                                                href="/"
                                                className="inline-block px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold text-sm tracking-wider rounded-md hover:bg-white/20 transition-all"
                                                whileHover={{
                                                    scale: 1.05,
                                                    borderColor: "rgba(255, 255, 255, 0.5)"
                                                }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Start Your Projects
                                            </motion.a>
                                        </motion.div>

                                        {/* Statistics */}
                                        {horizontalSlides[currentSlide].stats && (
                                            <motion.div
                                                variants={statsVariants}
                                                className="flex flex-wrap gap-12 mt-12"
                                            >
                                                {horizontalSlides[currentSlide].stats?.map((stat, i) => (
                                                    <motion.div
                                                        key={i}
                                                        variants={statItemVariants}
                                                        className="text-center"
                                                    >
                                                        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300">{stat.value}</div>
                                                        <div className="text-sm text-gray-200 mt-1 font-medium">{stat.label}</div>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        )}

                                        {/* Tags */}
                                        {horizontalSlides[currentSlide].tags && (
                                            <motion.div
                                                variants={tagsVariants}
                                                className="flex flex-wrap gap-2 mt-10"
                                            >
                                                {horizontalSlides[currentSlide].tags?.map((tag, i) => (
                                                    <motion.span
                                                        key={i}
                                                        variants={tagItemVariants}
                                                        className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/20"
                                                        whileHover={{
                                                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                                                            borderColor: "rgba(255, 255, 255, 0.3)"
                                                        }}
                                                    >
                                                        {tag}
                                                    </motion.span>
                                                ))}
                                            </motion.div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Slider Controls */}
                    <div className="absolute bottom-10 left-0 right-0 z-10">
                        <div className="container mx-auto px-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    {horizontalSlides.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleDotClick(index)}
                                            className={`h-2 rounded-full transition-all duration-300 ${
                                                currentSlide === index ? 'bg-white w-8' : 'bg-white/30 w-2'
                                            }`}
                                            aria-label={`Go to slide ${index + 1}`}
                                        />
                                    ))}
                                </div>
                                <div className="flex items-center space-x-4">
                                    <motion.button
                                        onClick={prevSlide}
                                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all"
                                        whileHover={{
                                            scale: 1.1,
                                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                                            borderColor: "rgba(255, 255, 255, 0.5)",
                                            color: "#0284c7",
                                            boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)"
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                        aria-label="Previous slide"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </motion.button>
                                    <motion.button
                                        onClick={nextSlide}
                                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all"
                                        whileHover={{
                                            scale: 1.1,
                                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                                            borderColor: "rgba(255, 255, 255, 0.5)",
                                            color: "#0284c7",
                                            boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)"
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                        aria-label="Next slide"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /* Vertical Slider */
                <div
                    className="relative w-full h-full overflow-hidden"
                    ref={verticalSliderRef}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-green-600 via-teal-600 to-blue-600"></div>

                    <div className="w-full h-full">
                        <div className="container mx-auto px-4 h-full">
                            {/* Vertical Slider Sections */}
                            <div className="flex flex-col h-full justify-center relative">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`vertical-${verticalSlide}`}
                                        variants={verticalVariants}
                                        custom={direction}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className="grid md:grid-cols-2 gap-12 items-center"
                                    >
                                        <div className="order-2 md:order-1">
                                            <motion.div
                                                variants={contentVariants}
                                                initial="hidden"
                                                animate="visible"
                                                className="space-y-6"
                                            >
                                                <motion.span
                                                    variants={itemVariants}
                                                    className="inline-block px-4 py-1 bg-white/90 backdrop-blur-md text-blue-700 text-sm font-bold tracking-wider rounded-md"
                                                >
                                                    {verticalSlides[verticalSlide].subtitle}
                                                </motion.span>

                                                <motion.h2
                                                    variants={itemVariants}
                                                    className="text-4xl md:text-5xl font-bold text-white"
                                                >
                                                    {verticalSlides[verticalSlide].title}
                                                </motion.h2>

                                                <motion.p
                                                    variants={itemVariants}
                                                    className="text-xl text-gray-100"
                                                >
                                                    {verticalSlides[verticalSlide].description}
                                                </motion.p>

                                                <motion.div
                                                    variants={itemVariants}
                                                    className="flex gap-4 mt-6"
                                                >
                                                    <motion.a
                                                        href="/about"
                                                        className="inline-block px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-sm tracking-wider rounded-md shadow-lg shadow-blue-900/20 border border-white/10"
                                                        whileHover={{
                                                            scale: 1.05,
                                                            boxShadow: "0 15px 30px -5px rgba(59, 130, 246, 0.5)",
                                                        }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        {verticalSlides[verticalSlide].ctaText}
                                                    </motion.a>
                                                </motion.div>

                                                {verticalSlides[verticalSlide].stats && (
                                                    <motion.div
                                                        variants={statsVariants}
                                                        className="flex space-x-12 mt-8"
                                                    >
                                                        {verticalSlides[verticalSlide].stats?.map((stat, i) => (
                                                            <motion.div
                                                                key={i}
                                                                variants={statItemVariants}
                                                            >
                                                                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300">{stat.value}</div>
                                                                <div className="text-sm text-gray-200 mt-1 font-medium">{stat.label}</div>
                                                            </motion.div>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                        </div>

                                        <div className="order-1 md:order-2 relative">
                                            <motion.div
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, delay: 0.2 }}
                                                className="relative rounded-lg overflow-hidden shadow-2xl"
                                                style={{
                                                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                                                    clipPath: "polygon(0 0, 100% 4%, 100% 96%, 0% 100%)"
                                                }}
                                            >
                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    transition={{ duration: 0.6 }}
                                                    className="aspect-w-4 aspect-h-3"
                                                >
                                                    <img
                                                        src={verticalSlides[verticalSlide].image}
                                                        alt={verticalSlides[verticalSlide].title}
                                                        className="object-cover w-full h-full"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10 mix-blend-overlay"></div>

                                                    {/* Image Accent Elements */}
                                                    <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-white/30 rounded-tl-3xl"></div>
                                                    <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-white/30 rounded-tr-3xl"></div>
                                                </motion.div>
                                            </motion.div>

                                            <motion.div
                                                className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 blur-3xl"
                                                animate={{
                                                    scale: [1, 1.2, 1],
                                                    opacity: [0.2, 0.3, 0.2]
                                                }}
                                                transition={{
                                                    duration: 4,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            />
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Vertical Navigation Dots */}
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-3">
                                    {verticalSlides.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setVerticalSlide(index)}
                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                verticalSlide === index ? 'bg-white' : 'bg-white/30'
                                            }`}
                                            aria-label={`Go to section ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle View Button */}
            <motion.button
                onClick={toggleView}
                className="absolute top-20 right-8 z-20 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white"
                whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
            >
                {activeView === 'horizontal' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                )}
            </motion.button>

            {/* Scroll Down Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden md:block"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
            >
                <motion.div
                    className="w-8 h-14 border-2 border-white/30 rounded-full flex items-center justify-center overflow-hidden backdrop-blur-sm"
                    whileHover={{ borderColor: 'rgba(255, 255, 255, 0.6)' }}
                >
                    <motion.div
                        className="w-1.5 h-3 bg-white rounded-full"
                        initial={{ opacity: 1, y: -20 }}
                        animate={{
                            opacity: [0.5, 1, 0.5],
                            y: [-20, 20, -20]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>
                <motion.p
                    className="text-white/60 text-xs font-medium text-center mt-2"
                    animate={{
                        opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut"
                    }}
                >
                    Scroll Down
                </motion.p>
            </motion.div>


        </section>
    );
};

export default HeroSection;