"use client";

import { useState, useEffect } from "react";

// Define Contractor Type
interface Contractor {
    id: string;
    name: string;
    contact: string;
}

// Backend API URL (Change this if needed)
const API_URL = "http://localhost:7071/api/v1/contractor/find-all"; // Adjust to match backend

// Fetch contractor data from backend
const fetchContractors = async (): Promise<Contractor[]> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST", // Backend expects POST
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}), // Sending empty body as per backend requirement
        });

        const result = await response.json();
        return response.ok ? result.data.contractors : [];
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
                            <div key={contractor.id} className="p-6 bg-white border rounded shadow-md text-black">
                                <h2 className="text-xl font-semibold mb-1">{contractor.name}</h2>
                                <p className="text-gray-600">{contractor.contact}</p>
                                <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                                    Connect
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-black">No contractors found</p>
                    )}
                </div>
            </div>
        </div>
    );
}
