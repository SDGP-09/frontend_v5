"use client";

import { useState, useEffect } from "react";
import ContractorCard from "./ContractorCard";
import {
    fetchContractors,
    fetchContractorById,
    searchContractorsByName,
    Contractor,
    ContractorCardResponseDTO
} from "./contractorService";

export default function ContractorsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [contractors, setContractors] = useState<Contractor[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [size, setSize] = useState(8);

    // Fetch contractors on page load and when page changes
    useEffect(() => {
        setLoading(true);
        if (searchTerm.trim() === "") {
            fetchContractors(page, size)
                .then((response) => {
                    setContractors(response.content);
                    setTotalPages(response.totalPages);
                })
                .finally(() => setLoading(false));
        } else {
            searchContractorsByName(searchTerm)
                .then((response) => {
                    setContractors(response.content);
                    setTotalPages(response.totalPages);
                })
                .finally(() => setLoading(false));
        }
    }, [page, size, searchTerm]);

    // Handle search submission
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(0); // Reset to first page when searching
    };

    // Handle page navigation
    const goToNextPage = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    const goToPrevPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Title and Search Bar */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Find a Contractor
                </h1>
                <form onSubmit={handleSearch} className="relative max-w-sm">
                    <input
                        type="text"
                        placeholder="Search contractor by name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 pl-10 border rounded shadow-sm text-gray-800 focus:outline-none"
                    />
                    <button type="submit" className="absolute top-0 right-0 p-3">
                        <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </button>
                </form>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <>
                    {/* Contractor Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {contractors.length > 0 ? (
                            contractors.map((contractor) => (
                                <ContractorCard key={contractor.id} contractor={contractor} />
                            ))
                        ) : (
                            <div className="col-span-4 text-center py-10">
                                <p className="text-gray-700 text-lg">No contractors found</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-8 space-x-4">
                            <button
                                onClick={goToPrevPage}
                                disabled={page === 0}
                                className={`px-4 py-2 rounded ${
                                    page === 0
                                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        : "bg-blue-500 text-white hover:bg-blue-600"
                                }`}
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2 text-gray-700">
                                Page {page + 1} of {totalPages}
                            </span>
                            <button
                                onClick={goToNextPage}
                                disabled={page === totalPages - 1}
                                className={`px-4 py-2 rounded ${
                                    page === totalPages - 1
                                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        : "bg-blue-500 text-white hover:bg-blue-600"
                                }`}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
