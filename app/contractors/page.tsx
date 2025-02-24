"use client";

import { useState, useEffect } from "react";
import ContractorCard from "@/app/components/ContractorCard";
import {fetchContractorById, fetchContractors} from "@/app/services/contractorService"; // ✅ Import API call

// Define Contractor Type
interface Contractor {
    id: string;
    name: string;
    contact: string;
}

export default function ContractorsPage() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [contractors, setContractors] = useState<Contractor[]>([]);
    const [filteredContractors, setFilteredContractors] = useState<Contractor[]>([]);
    const [isClient, setIsClient] = useState(false); // ✅ Ensures component only runs on client

    // ✅ Fix Hydration Issue: Use `useEffect` to ensure client-side rendering
    useEffect(() => {
        setIsClient(true);
        fetchContractors().then(setContractors);
    }, []);

    // ✅ Fetch data on page load
    useEffect(() => {
        fetchContractors().then(setContractors);
    }, []);

    // ✅ Update filtered list when search term changes
    useEffect(() => {
        setFilteredContractors(
            contractors.filter(contractor =>
                contractor.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, contractors]);

    // ✅ Fetch all contractors on page load
    useEffect(() => {
        fetchContractors().then(setContractors);
    }, []);

    // ✅ Handle search functionality
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredContractors(contractors);
            return;
        }

        // Search by ID instead of filtering locally
        fetchContractorById(searchTerm).then((contractor) => {
            if (contractor) {
                setFilteredContractors([contractor]); // Show only the matched contractor
            } else {
                setFilteredContractors([]); // No results found
            }
        });
    }, [searchTerm, contractors]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-6">
                {/* Header with Search Bar */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold text-black">Find a Contractor</h1>
                    <input
                        type="text"
                        placeholder="Search contractor"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-1/3 p-3 border rounded shadow-md text-black"
                    />
                </div>

                {/* Contractor Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredContractors.length > 0 ? (
                        filteredContractors.map((contractor, index) => (
                            <ContractorCard key={contractor.id || index} contractor={contractor} />
                        ))
                    ) : (
                        <p className="text-black">No contractors found</p>
                    )}
                </div>
            </div>
        </div>
    );
}
