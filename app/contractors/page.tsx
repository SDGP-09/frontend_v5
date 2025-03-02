"use client";

import { useState, useEffect } from "react";
import ContractorCard from "@/app/components/ContractorCard"; // Import ContractorCard component

// Define Contractor Type
interface Contractor {
    id: string;
    name: string;
    contact: string;
}

// Backend API URL
const API_URL = "http://localhost:7071/api/v1/contractor/find-all";

// Fetch contractor data from backend
const fetchContractors = async (): Promise<Contractor[]> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const result = await response.json();
        if (!result || !result.data || !Array.isArray(result.data.contractors)) {
            console.error("Unexpected response format", result);
            return [];
        }

        return result.data.contractors;
    } catch (error) {
        console.error("Error fetching contractors:", error);
        return [];
    }
};

export default function ContractorsPage() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [contractors, setContractors] = useState<Contractor[]>([]);
    const [filteredContractors, setFilteredContractors] = useState<Contractor[]>([]);

    // Fetch data on page load
    useEffect(() => {
        fetchContractors().then(setContractors);
    }, []);

    // Update filtered list when search term changes
    useEffect(() => {
        setFilteredContractors(
            contractors.filter(contractor =>
                contractor.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, contractors]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-6">
                {/* Header with Search Bar in One Row */}
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
