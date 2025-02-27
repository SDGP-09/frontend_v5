'use client';

import React from 'react';
import { Search, Plus } from 'lucide-react';

export default function SearchBar() {
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
            <button className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors">
                <Plus className="h-5 w-5" />
            </button>
        </div>
    );
}