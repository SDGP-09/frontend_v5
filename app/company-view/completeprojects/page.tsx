"use client"
import React, { useState, useEffect} from "react";
import ProjectList from "./components/ProjectList";
import SearchBar from "./components/Searchbar";
import {Projects} from "@/app/types/projects";

const projectsData: Projects[] = [
    {
        id: '1',
        title: 'Urban Renewal District',
        description: 'Revitalization of downtown area with mixed-use developments, pedestrian-friendly streets, and green spaces, completed under budget.',
        status: 'Completed',
        visibility: 'Visible',
        privacy: 'Public',
        imageUrl: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        duration: '18 months',
        completedDate: 'March 15, 2024'
    },
    {
        id: '2',
        title: 'Riverside Park Renovation',
        description: 'Complete overhaul of the riverside park including new recreational facilities, landscaping, and flood protection measures.',
        status: 'Completed',
        visibility: 'Visible',
        privacy: 'Public',
        imageUrl: 'https://images.unsplash.com/photo-1584967918940-a7d51b064268?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        duration: '12 months',
        completedDate: 'January 10, 2024'
    },
    {
        id: '3',
        title: 'Sustainable Housing Complex',
        description: 'Award-winning eco-friendly residential complex featuring solar power, rainwater harvesting, and energy-efficient design.',
        status: 'Completed',
        visibility: 'Visible',
        privacy: 'Public',
        imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80',
        duration: '24 months',
        completedDate: 'November 5, 2023'
    },
    {
        id: '4',
        title: 'Community Healthcare Center',
        description: 'Modern healthcare facility serving underrepresented communities with state-of-the-art medical equipment and telehealth capabilities.',
        status: 'Completed',
        visibility: 'Hidden',
        privacy: 'Public',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1453&q=80',
        duration: '14 months',
        completedDate: 'October 20, 2023'
    },
    {
        id: '5',
        title: 'Historic Theater Restoration',
        description: 'Careful restoration of a 1920s theater, preserving historical elements while upgrading technical systems and accessibility.',
        status: 'Completed',
        visibility: 'Visible',
        privacy: 'Public',
        imageUrl: 'https://images.unsplash.com/photo-1503095396549-807759245b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
        duration: '30 months',
        completedDate: 'August 3, 2023'
    },
    {
        id: '6',
        title: 'Smart City Infrastructure',
        description: 'Implementation of IoT sensors, smart traffic management, and digital public services across the metropolitan area.',
        status: 'Completed',
        visibility: 'Visible',
        privacy: 'Public',
        imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
        duration: '36 months',
        completedDate: 'June 15, 2023'
    }
];

function App() {
    // Projects data
    const [projects] = useState<Projects[]>(projectsData);

    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All Projects");

    // Filter projects based on search and category
    const filteredProjects = projects.filter((project) => {
        // Search filter
        const matchesSearch =
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase());

        // Category filter (using privacy as category for this example)
        const matchesCategory =
            categoryFilter === "All Projects" ||
            (categoryFilter === "Public" && project.privacy === "Public") ||
            (categoryFilter === "Private" && project.privacy === "Private");

        return matchesSearch && matchesCategory && project.visibility === "Visible";
    });

    // Filter options
    const categoryOptions = ["All Projects", "Public", "Private"];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            {/*<CustomerHeader />*/}

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Completed Projects
                    </h1>

                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="md:w-full">
                        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    </div>
                </div>

                {/* Projects List */}
                <ProjectList projects={filteredProjects} />
            </div>
        </div>
    );
}

export default App;
