"use client";
import React from 'react';
import { Eye, Filter } from 'lucide-react';

interface FilterDropdownProps {
    value: string;
    onChange: (value: string) => void;
    options: string[];
    icon: 'eye' | 'filter';
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ value, onChange, options, icon }) => {
    return (
        <div className="relative">
            <select
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((option) => (
                    <option key={option}>{option}</option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                {icon === 'eye' ? (
                    <Eye className="h-5 w-5 text-gray-400" />
                ) : (
                    <Filter className="h-5 w-5 text-gray-400" />
                )}
            </div>
        </div>
    );
};

export default FilterDropdown;