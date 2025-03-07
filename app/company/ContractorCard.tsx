"use client";

import Image from "next/image";

interface Contractor {
    id?: string;
    name?: string;
    contact?: string;
}

export default function ContractorCard({ contractor }: { contractor: Contractor }) {
    console.log("Rendering ContractorCard with data:", contractor); // ✅ Debugging log

    if (!contractor || !contractor.name) {
        return (
            <div className="bg-white border rounded-lg shadow-lg overflow-hidden p-6">
                <p className="text-red-500">Contractor data not available</p>
            </div>
        );
    }

    return (
        <div className="bg-white border rounded-lg shadow-lg overflow-hidden">
            {/* Placeholder for contractor image */}
            <Image src="/placeholder.jpg" alt={contractor.name} width={300} height={200} className=" object-cover" />
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-1 text-black">{contractor.name}</h2>
                <p className="text-gray-600">ID: <span className="font-bold">{contractor.id}</span></p>  {/* ✅ Show ID */}
                <p className="text-gray-600">{contractor.contact}</p>
                <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Connect
                </button>
            </div>
        </div>
    );
}
