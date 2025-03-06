"use client";

import React, { useState } from "react";

interface FilterDropdownProps {
    fields: string[];               // List of all fields (e.g. "all", "logistics", etc.)
    selectedField: string;          // Currently selected field
    onFieldSelect: (field: string) => void; // Function to call when user selects a new field
}

export default function FilterDropdown({
                                           fields,
                                           selectedField,
                                           onFieldSelect,
                                       }: FilterDropdownProps) {
    // Local state to keep track of whether the dropdown is open
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative mb-8">
            {/*
        The main button that shows the currently selected field
        and toggles the dropdown on click.
      */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-48 px-4 py-2 text-left bg-white rounded-lg shadow flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
            >
        <span className="capitalize">
          {selectedField === "all" ? "All Fields" : selectedField}
        </span>
                {/*
          A simple chevron or arrow to indicate dropdown.
          You can use any icon, e.g. `ChevronDown` from lucide-react.
        */}
                <span
                    className={`transform transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                >
          ▼
        </span>
            </button>

            {/*
        The actual dropdown content that appears below the main button.
      */}
            {isOpen && (
                <div className="absolute mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                    {fields.map((field) => (
                        <button
                            key={field}
                            onClick={() => {
                                onFieldSelect(field);
                                setIsOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left capitalize hover:bg-gray-50 transition-colors duration-200"
                        >
                            {field === "all" ? "All Fields" : field}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}