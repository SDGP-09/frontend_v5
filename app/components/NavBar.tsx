
'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
 import {  User, LogOut } from 'lucide-react';
import Cookies from 'js-cookie';
 import { useRouter, usePathname } from 'next/navigation';
import Login from '../login/Login';



interface NavbarProps {
    isScrolled: boolean;
    isMenuOpen: boolean;
    setIsMenuOpen: (isOpen: boolean) => void;
    navItems: string[];
}

const protectedPaths = ['/application', '/common'];

const Navbar: React.FC<NavbarProps> = ({
                                           isScrolled,
                                           isMenuOpen,
                                           setIsMenuOpen,
                                           navItems,
                                       }) => {
    // Login/Logout functionality
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    const checkToken = () => {
        const savedToken = Cookies.get('token');
        setToken(savedToken || null);
    };

    useEffect(() => {
        checkToken();

        // If user is on a protected route and no token is found, show login modal and redirect
        if (protectedPaths.some((path) => pathname.startsWith(path)) && !Cookies.get('token')) {
            setShowLogin(true);
            router.push('/');
        }
    }, [pathname]);

    const handleLogout = () => {
        Cookies.remove('token');
        setToken(null);
        router.push('/');
    };

    // For animated navigation items
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Map nav item text to a target href.
    const getHref = (item: string): string => {
        const lower = item.toLowerCase();
        if (lower.includes('service')) return '/service';
        if (lower.includes('about')) return '/about';
        if (lower.includes('contact')) return '/contact';
        if (lower.includes('home')) return '/';
        return '#';
    };

    return (
        <>
            {showLogin && <Login onClose={() => setShowLogin(false)} onLoginSuccess={checkToken} />}

            <motion.header
                className={`w-full fixed top-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? 'bg-gray-900 text-white'
                        : 'backdrop-blur-md bg-black/40 shadow-lg'
                }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/*/!* Logo *!/*/}
                        {/*<motion.div*/}
                        {/*    className="flex-shrink-0 flex items-center"*/}
                        {/*    initial={{ opacity: 0 }}*/}
                        {/*    animate={{ opacity: 1 }}*/}
                        {/*    transition={{ duration: 0.8 }}*/}
                        {/*>*/}
                        {/*    <Link href="/" legacyBehavior>*/}
                        {/*        <a className="flex items-center">*/}
                        {/*            <div className="relative flex items-center">*/}
                        {/*                <Building2 className="h-8 w-8 text-green-500" />*/}
                        {/*            </div>*/}
                        {/*            <div className="ml-4">*/}
                        {/*                <div className="text-xl font-bold text-white">CIVILINK</div>*/}
                        {/*                <div className="text-xs tracking-wider text-white/80">*/}
                        {/*                    CONNECTING CONTRACTORS AND CLIENTS*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </a>*/}
                        {/*    </Link>*/}
                        {/*</motion.div>*/}
                        {/* Logo */}
                        <motion.div
                            className="flex-shrink-0 flex items-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Link href="/" className="flex items-center">
                                <div className="relative flex items-center">
                                    <div className="w-10 h-10 bg-black transform rotate-45"></div>
                                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 transform -translate-x-5 rotate-45"></div>
                                </div>
                                <div className="ml-4">
                                    <div className="text-xl font-bold text-white">CIVILINK</div>
                                    <div className="text-xs tracking-wider text-white/80">CONNECTING CONTRACTORS AND CLIENTS</div>
                                </div>
                            </Link>
                        </motion.div>
                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex lg:items-center lg:space-x-6">
                            <nav className="flex space-x-8 mr-8">
                                {navItems.map((item, index) => {
                                    const href = getHref(item);
                                    return (
                                        <div
                                            className="relative"
                                            key={index}
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                        >
                                            <Link href={href} legacyBehavior>
                                                <a className="block">
                                                    <motion.span
                                                        className={`px-2 py-1 text-sm font-medium relative ${
                                                            index === 0
                                                                ? 'text-white'
                                                                : 'text-white/90 hover:text-white'
                                                        }`}
                                                        whileHover={{ y: -2 }}
                                                        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                                                    >
                                                        {item}
                                                        {hoveredIndex === index && (
                                                            <motion.div
                                                                className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-green-500 to-blue-500"
                                                                layoutId="navIndicator"
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                            />
                                                        )}
                                                    </motion.span>
                                                </a>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </nav>

                            {/* Login / Profile / Logout Buttons */}
                            <div className="space-x-4">
                                {token ? (
                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={() => router.push('/profile')}
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

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden">
                            <motion.button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-white"
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isMenuOpen ? (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="lg:hidden backdrop-blur-lg bg-black/70"
                        >
                            <div className="px-4 pt-4 pb-6 space-y-2">
                                {navItems.map((item, index) => {
                                    const href = getHref(item);
                                    return (
                                        <Link href={href} legacyBehavior key={index}>
                                            <a className="block">
                                                <motion.span
                                                    className={`${
                                                        index === 0
                                                            ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 text-white'
                                                            : 'text-white/90 hover:bg-white/10'
                                                    } block px-4 py-3 rounded-md text-base transition-colors`}
                                                    whileHover={{ x: 4 }}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                >
                                                    {item}
                                                </motion.span>
                                            </a>
                                        </Link>
                                    );
                                })}

                                <div className="pt-4">
                                    {token ? (
                                        <div className="flex flex-col space-y-2">
                                            <button
                                                onClick={() => router.push('/profile')}
                                                className="block w-full px-4 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-center text-base font-medium rounded-md text-white hover:from-green-500 hover:to-blue-600 transition-colors"
                                            >
                                                Profile
                                            </button>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full px-4 py-3 text-red-600 text-center text-base font-medium rounded-md hover:text-red-700 transition-colors"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => setShowLogin(true)}
                                                className="block w-full px-4 py-3 text-green-600 text-center text-base font-medium rounded-md hover:text-green-700 transition-colors"
                                            >
                                                Login
                                            </button>
                                            <button className="block w-full px-4 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-center text-base font-medium rounded-md text-white hover:from-green-500 hover:to-blue-600 transition-colors">
                                                Sign Up
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>
        </>
    );
};

export default Navbar;
