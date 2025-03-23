
"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
    id: string;
    category: string;
    image: string;
    link: string;
    featured?: boolean;
}

interface ProjectsSectionProps {
    projectsRef: React.RefObject<HTMLDivElement | null>;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projectsRef }) => {
    const [activeCategory, setActiveCategory] = useState("all");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isInView, setIsInView] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    // Use actual high-quality online architecture images
    const projects: Project[] = [
        {
            id: 'p1',
            category: 'residential',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            link: '/projects/azure-sky-residence',
            featured: true,
        },

        {
            id: 'p2',
            category: 'commercial',
            image: 'https://res.cloudinary.com/ddcbr53w0/image/upload/v1742647992/3d-electric-car-building_23-2148972401_sormws.avif',
            link: '/projects/obsidian-tower',
        },
        {
            id: 'p3',
            category: 'renovation',
            image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            link: '/projects/heritage-lofts',
        },
        {
            id: 'p4',
            category: 'residential',
            image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            link: '/projects/oceanic-pavilion',
            featured: true,
        },
        {
            id: 'p5',
            category: 'commercial',
            image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            link: '/projects/promenade-complex',
        },
        {
            id: 'p6',
            category: 'renovation',
            image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            link: '/projects/palm-springs-oasis',
        },
        {
            id: 'p7',
            category: 'renovation',
            image: 'https://res.cloudinary.com/ddcbr53w0/image/upload/v1742648128/istockphoto-1448386210-612x612_aliqge.jpg',
            link: '/projects/palm-springs-oasis',
        },
        {
            id: 'p8',
            category: 'commercial',
            image: 'https://res.cloudinary.com/ddcbr53w0/image/upload/v1742649223/istockphoto-578830714-612x612_kxbmlb.jpg',
            link: '/projects/palm-springs-oasis',
        },

    ];

    // Set up intersection observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                }
            },
            { threshold: 0.1 }
        );

        if (projectsRef.current) {
            observer.observe(projectsRef.current);
        }

        return () => {
            if (projectsRef.current) {
                observer.unobserve(projectsRef.current);
            }
        };
    }, [projectsRef]);

    // Get unique categories for filter tabs
    const categories = ["all", ...Array.from(new Set(projects.map((project) => project.category)))];

    // Filter projects based on active category
    const filteredProjects =
        activeCategory === "all"
            ? projects
            : projects.filter((project) => project.category === activeCategory);

    // Open project modal
    const openProjectModal = (project: Project) => {
        setSelectedProject(project);
        document.body.style.overflow = "hidden";
    };

    // Close project modal
    const closeProjectModal = () => {
        setSelectedProject(null);
        document.body.style.overflow = "auto";
    };

    // Handle click outside modal to close
    const handleOutsideClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            closeProjectModal();
        }
    };

    // Animation variants
    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
                duration: 0.8,
            },
        },
    };

    const headerVariants = {
        hidden: { y: -30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        },
    };

    const tabsVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.2,
            },
        },
    };

    const projectVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 15,
            },
        },
        hover: {
            y: -10,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
    };

    const imageVariants = {
        hover: {
            scale: 1.05,
            transition: { duration: 0.5 },
        },
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
            transition: {
                type: "spring",
                stiffness: 400,
            },
        },
        tap: {
            scale: 0.95,
        },
    };

    const modalVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 25,
            },
        },
        exit: {
            opacity: 0,
            y: 30,
            transition: { duration: 0.2 },
        },
    };

    return (
        <motion.section
            ref={projectsRef}
            className="py-24 bg-gradient-to-b from-cyan-50 to-white relative"
            id="projects"
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            {/* Decorative Background Element */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-full opacity-40"></div>
                <div className="absolute top-1/3 -left-20 w-72 h-72 bg-gradient-to-br from-green-100 to-blue-100 rounded-full opacity-30"></div>
                <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-full opacity-20"></div>
                <motion.div
                    className="absolute top-1/4 right-1/4 w-20 h-20 bg-gradient-to-r from-green-300 to-blue-300 rounded-full mix-blend-multiply"
                    animate={{
                        y: [0, 30, 0],
                        opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-gradient-to-r from-green-300 to-blue-300 rounded-full mix-blend-multiply"
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="max-w-3xl mx-auto text-center mb-16"
                    variants={headerVariants}
                >
                    <motion.span
                        className="inline-block px-4 py-1.5 bg-gradient-to-r from-green-500/20 to-blue-500/20 text-teal-700 font-medium rounded-full text-sm mb-4"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(20, 184, 166, 0.2)" }}
                    >
                        Our Portfolio
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Inspiring{" "}
                        <motion.span
                            className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500"
                            animate={{
                                backgroundPosition: ["0% center", "100% center", "0% center"],
                            }}
                            transition={{ duration: 5, repeat: Infinity }}
                            style={{ backgroundSize: "200% auto" }}
                        >
                            Spaces
                        </motion.span>{" "}
                        We&apos;ve Created
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore our showcase of exceptional architecture and design that
                        transforms visions into reality, each project reflecting our
                        commitment to innovation and excellence.
                    </p>
                </motion.div>

                {/* Category Filter - Modern Tabs */}
                <motion.div
                    className="flex flex-wrap justify-center mb-16"
                    variants={tabsVariants}
                >
                    <motion.div
                        className="inline-flex flex-wrap justify-center gap-2 bg-white shadow-lg p-2 rounded-xl border border-gray-100"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 15,
                            delay: 0.3,
                        }}
                    >
                        {categories.map((category) => (
                            <motion.button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-3 rounded-lg font-medium transition-all 
                  ${
                                    activeCategory === category
                                        ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md"
                                        : "text-gray-700 hover:bg-gray-100"
                                }`}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
                                }}
                                whileTap={{ scale: 0.95 }}
                                aria-pressed={activeCategory === category}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </motion.button>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Projects Grid with Animation */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                // REMOVED: no md:col-span-2 / lg:col-span-2
                                className="" // ensures uniform card size
                                variants={projectVariants}
                                whileHover="hover"
                                custom={index}
                                layoutId={`project-card-${project.id}`}
                            >
                                <motion.div
                                    className="h-full rounded-xl overflow-hidden bg-white shadow-xl cursor-pointer transform transition-all border border-gray-100"
                                    onClick={() => openProjectModal(project)}
                                    whileHover={{
                                        boxShadow:
                                            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                        y: -10,
                                        borderColor: "#0EA5E9",
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    {/* Project Image Container */}
                                    <div className="relative overflow-hidden aspect-[16/10]">
                                        <motion.img
                                            src={project.image}
                                            className="w-full h-full object-cover"
                                            variants={imageVariants}
                                        />

                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                        {/* Category Badge */}
                                        <motion.div
                                            className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-gray-800 font-medium text-sm shadow-lg"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {project.category.charAt(0).toUpperCase() +
                                                project.category.slice(1)}
                                        </motion.div>

                                        {/* Featured Badge */}
                                        {project.featured && (
                                            <motion.div
                                                className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full text-white font-medium text-sm shadow-lg"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                Featured
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Project Info */}
                                    <div className="p-6">
                                        <motion.h3
                                            className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-1"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                        ></motion.h3>

                                        <motion.div
                                            className="flex items-center gap-2 text-gray-500 text-sm mb-3"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.1 }}
                                        ></motion.div>

                                        <motion.p
                                            className="text-gray-600 line-clamp-2 mb-4"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                        ></motion.p>

                                        <motion.div
                                            className="inline-flex items-center font-medium text-teal-600 hover:text-blue-600 transition-colors"
                                            whileHover={{ x: 5 }}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                        >
                                            Get in Touch
                                            <svg
                                                className="w-4 h-4 ml-2"
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
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* View All Projects Button */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <motion.a
                        href="https://project-civilink.netlify.app/"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium rounded-xl shadow-lg hover:from-green-600 hover:to-blue-600 transition-colors"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0px 15px 25px rgba(0,0,0,0.1)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.5 }}
                    >
                        <span>Explore Our Full Portfolio</span>
                        <motion.svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: "loop",
                                ease: "easeInOut",
                                delay: 1,
                            }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            ></path>
                        </motion.svg>
                    </motion.a>

                    <p className="mt-4 text-gray-500">
                        Discover more of our award-winning designs
                    </p>
                </motion.div>
            </div>

            {/* Project Modal with Framer Motion */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleOutsideClick}
                    >
                        <motion.div
                            ref={modalRef}
                            className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl overflow-y-auto"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            layoutId={`project-card-${selectedProject.id}`}
                        >
                            {/* Modal Header with Image */}
                            <div className="relative">
                                <motion.div
                                    className="aspect-video w-full overflow-hidden"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <motion.img
                                        src={selectedProject.image}
                                        className="w-full h-full object-cover"
                                        initial={{ scale: 1.2 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                    />
                                </motion.div>

                                {/* Close Button */}
                                <motion.button
                                    onClick={closeProjectModal}
                                    className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm p-2 rounded-full text-white hover:bg-black hover:text-blue-300 transition-colors"
                                    aria-label="Close modal"
                                    whileHover={{ rotate: 180, scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        ></path>
                                    </svg>
                                </motion.button>

                                {/* Project Title Overlay */}
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <div className="flex items-center gap-2 text-white/90 text-sm mb-2">
                                        <motion.span
                                            className="px-2.5 py-1 bg-gradient-to-r from-green-500 to-blue-500 backdrop-blur-sm rounded-full text-white font-medium"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: 0.4 }}
                                        >
                                            {selectedProject.category.charAt(0).toUpperCase() +
                                                selectedProject.category.slice(1)}
                                        </motion.span>
                                    </div>
                                    <motion.h3
                                        className="text-3xl font-bold text-white"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                    ></motion.h3>
                                </motion.div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <motion.div
                                        className="bg-gradient-to-r from-green-50 to-cyan-50 p-5 rounded-xl border border-green-100"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    ></motion.div>

                                    <motion.div
                                        className="bg-gradient-to-r from-green-50 to-cyan-50 p-5 rounded-xl border border-green-100"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                    ></motion.div>

                                    <motion.div
                                        className="bg-gradient-to-r from-green-50 to-cyan-50 p-5 rounded-xl border border-green-100"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                        whileHover={{
                                            y: -5,
                                            boxShadow: "0px 8px 15px rgba(0,0,0,0.05)",
                                        }}
                                    ></motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
};

export default ProjectsSection;
