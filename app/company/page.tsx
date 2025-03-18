"use client";

import { useState, useEffect } from "react";
import ContractorCard from "./ContractorCard"; // Adjust the path as needed
import {fetchContractors, fetchContractorById, Contractor,} from "./contractorService"; // Adjust the path as needed

export default function ContractorsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [contractors, setContractors] = useState<Contractor[]>([]);
    const [filteredContractors, setFilteredContractors] = useState<Contractor[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch all contractors (dummy data) on page load
    useEffect(() => {
        (async () => {
            const all = await fetchContractors();
            setContractors(all);
            setFilteredContractors(all);
        })();
    }, []);

    // Handle search logic: by name or by ID
    useEffect(() => {
        if (searchTerm.trim() === "") {
            // If search is empty, show all
            setFilteredContractors(contractors);
        } else if (!isNaN(Number(searchTerm))) {
            // If input is numeric, search by ID
            setLoading(true);
            fetchContractorById(searchTerm)
                .then((result) => {
                    setFilteredContractors(result ? [result] : []);
                })
                .finally(() => setLoading(false));
        } else {
            // Otherwise, filter by contractor name (case-insensitive)
            setFilteredContractors(
                contractors.filter((contractor) =>
                    contractor.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, contractors]);

    return (
            <div className="container mx-auto px-4 py-8">
                {/* Title and Search Bar */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Find a Contractor
                    </h1>
                    <div className="relative max-w-sm">
                        <input
                            type="text"
                            placeholder="Search contractor"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-3 pl-10 border rounded shadow-sm text-gray-800 focus:outline-none"
                        />
                        <svg
                            className="w-5 h-5 text-gray-400 absolute top-3 left-3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </div>
                </div>

                {/* Contractor Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loading ? (
                        <p className="text-gray-700">Searching...</p>
                    ) : filteredContractors.length > 0 ? (
                        filteredContractors.map((contractor) => (
                            <ContractorCard key={contractor.id} contractor={contractor} />
                        ))
                    ) : (
                        <p className="text-gray-700">No contractors found</p>
                    )}
                </div>
            </div>

    );
}
