// "use client";
// import React, { useState, useEffect } from "react";
// import { useLoading } from "@/app/context/LoadingContext";
//
// import {
//     Users,
//     Hammer,
//     FileSpreadsheet,
// } from "lucide-react";
//
// const images = [
//     "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2070",
//     "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2071",
//     "https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?auto=format&fit=crop&q=80&w=2071",
//     "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=2070",
//     "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2070",
// ];
//
// export default function Home() {
//     const { setLoading } = useLoading();
//     const [currentImage, setCurrentImage] = useState(0);
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//
//     useEffect(() => {
//         setLoading(true);
//         setTimeout(() => setLoading(false), 2000); // Simulate loading delay
//         const timer = setInterval(() => {
//             setCurrentImage((prev) => (prev + 1) % images.length);
//         }, 5000);
//         return () => clearInterval(timer);
//     }, [setLoading]);
//
//     const goToImage = (index: number) => {
//         setCurrentImage(index);
//     };
//
//     return (
//         <div className="min-h-screen flex flex-col">
//
//             {/* Image Carousel */}
//             <div className="relative h-[35vh] overflow-visible">
//                 {images.map((img, index) => (
//                     <div
//                         key={index}
//                         className={`absolute w-full h-full transition-opacity duration-1000 ${
//                             currentImage === index ? "opacity-100" : "opacity-0"
//                         }`}
//                     >
//                         <img
//                             src={img}
//                             alt={`Construction site ${index + 1}`}
//                             className="w-full h-full object-cover"
//                         />
//                         <div className="absolute inset-0 bg-black bg-opacity-40"></div>
//                         <div className="absolute inset-0 flex items-center justify-center">
//                             <h1 className="text-white text-4xl md:text-5xl font-bold text-center px-4">
//                                 Building Tomorrow&apos;s Projects Today
//                             </h1>
//                         </div>
//                     </div>
//                 ))}
//                 {/* Carousel Dots */}
//                 <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
//                     {images.map((_, index) => (
//                         <button
//                             key={index}
//                             onClick={() => goToImage(index)}
//                             className={`transition-all duration-300 rounded-full ${
//                                 currentImage === index
//                                     ? "w-8 bg-white"
//                                     : "w-2 bg-white/60 hover:bg-white/80"
//                             } h-2`}
//                             aria-label={`Go to image ${index + 1}`}
//                         />
//                     ))}
//                 </div>
//             </div>
//
//             {/* Options Section */}
//             <div className="py-16 px-4 bg-gray-50">
//                 <div className="max-w-7xl mx-auto">
//                     <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
//                         Choose Your Path
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                         <div className="group bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
//                             <div className="text-center">
//                                 <Hammer className="w-12 h-12 mx-auto text-green-500 mb-4 transition-transform duration-300 group-hover:scale-110" />
//                                 <h3 className="text-xl font-semibold mb-4 transition-colors duration-300 group-hover:text-green-500">
//                                     Find a Contractor
//                                 </h3>
//                                 <p className="text-gray-600 mb-6">
//                                     Connect with qualified contractors for your construction needs
//                                 </p>
//                                 <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-md hover:from-green-500 hover:to-blue-600 transition-all duration-300 shadow-sm hover:shadow-md">
//                                     Search Contractors
//                                 </button>
//                             </div>
//                         </div>
//
//                         <div className="group bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
//                             <div className="text-center">
//                                 <Users className="w-12 h-12 mx-auto text-blue-500 mb-4 transition-transform duration-300 group-hover:scale-110" />
//                                 <h3 className="text-xl font-semibold mb-4 transition-colors duration-300 group-hover:text-blue-500">
//                                     Find a Consultant
//                                 </h3>
//                                 <p className="text-gray-600 mb-6">
//                                     Get expert advice from experienced construction consultants
//                                 </p>
//                                 <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-md hover:from-green-500 hover:to-blue-600 transition-all duration-300 shadow-sm hover:shadow-md">
//                                     Search Consultants
//                                 </button>
//                             </div>
//                         </div>
//
//                         <div className="group bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
//                             <div className="text-center">
//                                 <FileSpreadsheet className="w-12 h-12 mx-auto text-green-500 mb-4 transition-transform duration-300 group-hover:scale-110" />
//                                 <h3 className="text-xl font-semibold mb-4 transition-colors duration-300 group-hover:text-green-500">
//                                     Create a Project
//                                 </h3>
//                                 <p className="text-gray-600 mb-6">
//                                     Start your construction project and find the right team
//                                 </p>
//                                 <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-md hover:from-green-500 hover:to-blue-600 transition-all duration-300 shadow-sm hover:shadow-md">
//                                     Start Project
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import HeroSection from './components/landingpage/HeroSection';
import StatsSection from './components/landingpage/StatSection';
import ServicesSection from './components/landingpage/ServiceSection';
import ProjectsSection from './components/landingpage/ProjectSection';
import AboutSection from './components/landingpage/AboutSection';
import NavBarWrapper from './components/NavbarWrapper';
import Footer from './components/Footer';

// Define TypeScript interfaces
interface HeroSlide {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    ctaText: string;
}

interface ServiceItem {
    title: string;
    description: string;
    image: string;
    link: string;
}

interface ValueItem {
    title: string;
    description: string;
    icon: string;
}

interface ProjectItem {
    title: string;
    category: string;
    image: string;
    link: string;
}

const ConstructionLanding: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>('all');

    // Refs for scroll animations
    const heroRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);

    // Scroll animation hooks
    const { scrollYProgress } = useScroll();
    const yRange = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const pathLength = useSpring(yRange, { stiffness: 400, damping: 90 });

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = (): void => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Hero section slides data with high-quality construction images
    const heroSlides: HeroSlide[] = [
        {
            id: 1,
            title: "Architecture & Building",
            subtitle: "Construction and Building Company",
            image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
            ctaText: "OUR SERVICES"
        },
        {
            id: 2,
            title: "We Are TheBuilt Group",
            subtitle: "Delivering exceptional quality with innovation and integrity.",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
            ctaText: "GET IN TOUCH"
        },
        {
            id: 3,
            title: "Best House Renovation",
            subtitle: "Transform your space with our award-winning renovation services.",
            image: "https://images.unsplash.com/photo-1503387837-b154d5074bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
            ctaText: "OUR SERVICES"
        }
    ];

    // Auto slide transition
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [heroSlides.length]);

    // Navigation items
    const navItems: string[] = ['HOME', 'OUR SERVICES', 'PORTFOLIO', 'FEATURES', 'ABOUT US', 'NEWS', 'CONTACT US'];

    // Services data with enhanced descriptions
    const services: ServiceItem[] = [
        {
            title: "ARCHITECTURE DESIGN",
            description: "Innovative architectural solutions that combine aesthetics with functionality.",
            image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            link: "#"
        },
        {
            title: "HOUSE RENOVATION",
            description: "Breathe new life into your property with our expert renovation services.",
            image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            link: "#"
        },
        {
            title: "INTERIOR DESIGN",
            description: "Create inspiring spaces that reflect your vision and personality.",
            image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            link: "#"
        }
    ];

    // Projects data
    const projects: ProjectItem[] = [
        {
            title: "Modern Office Complex",
            category: "commercial",
            image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            link: "#"
        },
        {
            title: "Luxury Villa Renovation",
            category: "renovation",
            image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            link: "#"
        },
        {
            title: "Contemporary Apartment Building",
            category: "residential",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            link: "#"
        },
        {
            title: "Historic Building Restoration",
            category: "renovation",
            image: "https://images.unsplash.com/photo-1505843795480-5cfb3c03f6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            link: "#"
        }
    ];

    // Values data
    const values: ValueItem[] = [
        {
            title: "EFFECTIVE TEAMWORK",
            description: "Our collaborative approach brings together expertise from diverse fields to deliver exceptional results.",
            icon: "🏗️"
        },
        {
            title: "HONEST AND DEPENDABLE",
            description: "We remain true to the same principles on which our company was founded: integrity, quality, and client satisfaction.",
            icon: "🤝"
        },
        {
            title: "CREATIVE AND POWERFUL",
            description: "We combine innovative thinking with technical excellence to create solutions that stand the test of time.",
            icon: "💡"
        }
    ];

    // Enhanced animations with TypeScript types
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            transition: {
                duration: 0.8,
                ease: "easeIn"
            }
        })
    };

    // 3D hover effect for cards
    const cardHover = {
        rest: {
            scale: 1,
            rotateY: 0,
            boxShadow: "0px 10px 30px -15px rgba(0, 0, 0, 0.3)",
            transition: { duration: 0.4, ease: "easeOut" }
        },
        hover: {
            scale: 1.05,
            rotateY: 5,
            boxShadow: "0px 20px 40px -15px rgba(0, 0, 0, 0.4)",
            transition: { duration: 0.4, ease: "easeOut" }
        }
    };

    // Parallax effect for background
    const parallaxBg = {
        initial: { y: 0 },
        animate: {
            y: [-10, 10, -10],
            transition: {
                duration: 20,
                ease: "linear",
                repeat: Infinity
            }
        }
    };

    // Navigation dots for slider
    const handleDotClick = (index: number): void => {
        setCurrentSlide(index);
    };

    // Next slide handler
    const nextSlide = (): void => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    };

    // Previous slide handler
    const prevSlide = (): void => {
        setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
    };

    // Filter projects
    const filteredProjects = activeTab === 'all'
        ? projects
        : projects.filter(project => project.category === activeTab);

    // Animated counter for stats
    const Counter: React.FC<{ target: number, duration: number, suffix?: string }> = ({ target, duration, suffix = "" }) => {
        const nodeRef = useRef<HTMLDivElement>(null);
        const inView = useInView(nodeRef);
        const [count, setCount] = useState<number>(0);

        useEffect(() => {
            if (inView) {
                let startTime: number;
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
            }
        }, [inView, target, duration]);

        return <div ref={nodeRef}>{count}{suffix}</div>;
    };

    return (
        <div className="flex flex-col min-h-screen bg-white overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-5">
                <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E')"
                    }}
                    variants={parallaxBg}
                    initial="initial"
                    animate="animate"
                />
            </div>

            {/* Progress Indicator */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-blue-500 origin-left z-50"
                style={{ scaleX: pathLength }}
            />

            <NavBarWrapper />

            {/* Hero Section */}
            <HeroSection heroRef={heroRef}/>

            {/* End of Hero Section */}

            {/* Stats Section with Counter Animation */}
            <StatsSection/>

            {/* Services Section */}
            <ServicesSection servicesRef={servicesRef}/>

            {/* Projects Section with Filtering */}
            <ProjectsSection projectsRef={projectsRef}/>

            {/* About Section */}
            <AboutSection aboutRef={aboutRef}/>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-green-500 to-blue-500 relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white opacity-5 -mr-48 -mt-48"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white opacity-5 -ml-48 -mb-48"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="mb-6 md:mb-0"
                        >
                            <h2 className="text-3xl font-bold text-white">Ready to start your project?</h2>
                            <p className="text-white/80">Contact us today for a free consultation and quote.</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <a href="/company" className="inline-block px-8 py-4 bg-white text-blue-600 font-bold text-sm tracking-wide hover:bg-white/90 shadow-lg transition-all rounded-md">
                                GET IN TOUCH WITH US
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>


            <Footer/>

            {/* Back to Top Button */}
            <motion.a
                href="#"
                className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full shadow-lg flex items-center justify-center z-50"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: isScrolled ? 1 : 0, y: isScrolled ? 0 : 20}}
                whileHover={{scale: 1.1, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)"}}
                whileTap={{scale: 0.9}}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7"/>
                </svg>
            </motion.a>
        </div>
    );
};

export default ConstructionLanding;