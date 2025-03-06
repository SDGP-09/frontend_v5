'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import {imageToURL} from "@/app/helpers";
import Image from "next/image"


type RoleFilter = 'Consultant' | 'Contractor' | 'Both';

interface ProfileCardData {
    id: number;
    name: string;
    avatar: Blob;
}

interface SearchProfilesModalProps {
    onClose: () => void;
    onSelectProfile: (profile: ProfileCardData) => void;

}

export default function SearchProfilesModal({
                                                onClose,
                                                onSelectProfile,
                                            }: SearchProfilesModalProps) {


    const [searchTerm, setSearchTerm] = useState('');
    const [role, setRole] = useState<RoleFilter>('Both');


    const [profiles, setProfiles] = useState<ProfileCardData[]>([]);


    const handleSearch = async () => {
        console.log("Searching for:", searchTerm, "with role:", role);

        //API call to the user service here...
        const mockResults: ProfileCardData[] = [
            { id: 101, name: "Lisa - Consultant", avatar: new Blob(["https://via.placeholder.com/40"], {type: "image/png"}) },
            { id: 102, name: "Mark - Customer", avatar: new Blob(["https://via.placeholder.com/40"], {type: "image/png"}) },
            { id: 103, name: "Sandy - Both", avatar: new Blob(["https://via.placeholder.com/40"], {type: "image/png"}) },
        ];
        setProfiles(mockResults);
    };

    // 4) A function for when we click a profile card
    const handleProfileClick = (profile: ProfileCardData) => {

        onSelectProfile(profile);

        onClose();
    };

    return (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

            {/*
        6) The actual modal box
        Tailwind classes:
         - "relative": So we can position the X button inside
         - "max-w-3xl": limit the width
         - "w-full": let it shrink on mobile
      */}
            <div className="relative bg-white rounded shadow-lg max-w-3xl w-full mx-4 p-6">

                {/* 7) The X button (top-right corner) */}
                <button
                    className="absolute top-0.5 right-0.5 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    <X className="w-6 h-6" />
                </button>

                {/* 8) The row with search bar, dropdown, and search button */}
                <div className="flex flex-col sm:flex-row sm:space-x-2 mb-4">
                    {/* Search input */}
                    <input
                        type="text"
                        className="flex-1 px-3 py-2 mb-2 sm:mb-0 border rounded focus:ring focus:ring-green-200"
                        placeholder="Search for profiles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Dropdown */}
                    <select
                        className="px-3 py-2 mb-2 sm:mb-0 border rounded
             focus:ring focus:ring-green-200 focus:border-green-500
             text-gray-700 hover:cursor-pointer"
                        value={role}
                        onChange={(e) => setRole(e.target.value as RoleFilter)}
                    >
                        <option value="Both">Both</option>
                        <option value="Consultant">Consultant</option>
                        <option value="Contractor">Contractor</option>
                    </select>

                    {/* Search button */}
                    <button
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>

                {/*
          9) The list of found profiles
          Each row is clickable to select that profile
        */}
                <div className="space-y-2">
                    {profiles.map((profile) => (
                        <div
                            key={profile.id}
                            className="p-2 flex items-center border rounded hover:bg-gray-50 cursor-pointer"
                            onClick={() => handleProfileClick(profile)}
                        >
                            <Image
                                src={imageToURL(profile.avatar)}
                                alt={profile.name}
                                className="w-10 h-10 rounded-full object-cover mr-2"
                            />
                            <div>{profile.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
