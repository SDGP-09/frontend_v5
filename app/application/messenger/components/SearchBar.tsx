'use client';

import React, {useState} from 'react';
import { Search, Plus } from 'lucide-react';
import SearchProfilesModal from './SearchProfilesModal';
import {Socket} from "socket.io-client";

interface SearchBarProps{
    socket: Socket | null
}

export default function SearchBar({socket}: SearchBarProps) {




    const [showModal, setShowModal] = useState(false);

    // 2) Function to open the modal
    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSelectProfile = (profile: { id: number; name: string }) => {
        console.log('Selected profile:', profile);

        //Make sure to call the HTTP call to create the conversation ("Handle the exceptions given from the backend")
        //Make sure that this function will be async

        if (!socket) return;
        socket.emit("GetSortedConversations");


        setShowModal(false);
    };

    return (
        <div className="p-4 border-b flex items-center space-x-2 flex-none">
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                    type="text"
                    placeholder="Search Conversation"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
            </div>
            <button className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
                    onClick={handleOpenModal}
            >
                <Plus className="h-5 w-5" />
            </button>

            {showModal && (
                <SearchProfilesModal
                    onClose={handleCloseModal}
                    onSelectProfile={handleSelectProfile}
                />
            )}
        </div>
    );
}