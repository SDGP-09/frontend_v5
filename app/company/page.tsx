"use client";

import { useState, useEffect } from "react";
import ContractorCard from "@/app/company/ContractorCard"; // Import ContractorCard component
import { fetchContractors, fetchContractorById } from "@/app/company/contractorService"; // Import API service

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
    const [loading, setLoading] = useState<boolean>(false);

    // Fetch all contractors on page load
    useEffect(() => {
        fetchContractors().then(setContractors);
    }, []);

    // Handle search logic: by Name or by ID
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredContractors(contractors);
        } else if (!isNaN(Number(searchTerm))) {
            // If input is a number, search by ID
            setLoading(true);
            fetchContractorById(searchTerm)
                .then((result) => {
                    if (result) {
                        setFilteredContractors([result]); // Show only the found contractor
                    } else {
                        setFilteredContractors([]);
                    }
                })
                .finally(() => setLoading(false));
        } else {
            // Search by Name
            setFilteredContractors(
                contractors.filter(contractor =>
                    contractor.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, contractors]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-6">
                {/* Header with Search Bar in One Row */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold text-black">Find a Contractor</h1>
                    <input
                        type="text"
                        placeholder="Search by Name or ID"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-1/3 p-3 border rounded shadow-md text-black"
                    />
                </div>

                {/* Contractor Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <p className="text-black">Searching...</p>
                    ) : filteredContractors.length > 0 ? (
                        filteredContractors.map(contractor => (
                            <ContractorCard key={contractor.id} contractor={contractor} />
                        ))
                    ) : (
                        <p className="text-black">No contractors found</p>
                    )}
                </div>
            </div>
        </div>
    );
}
