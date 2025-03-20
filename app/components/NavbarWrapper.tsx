'use client';

import React, { useState, useEffect } from 'react';
import NavBar from '@/app/components/NavBar';

const NavBarWrapper: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    // Navigation items for your site
    const navItems: string[] = [
        'HOME',
        'SERVICES',
        // 'PROJECTS',
        'ABOUT',
        'CONTACT'
    ];

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

    return (
        <NavBar
            isScrolled={isScrolled}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            navItems={navItems}
        />
    );
};

export default NavBarWrapper;