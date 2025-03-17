"use client";
import React from "react";

interface AvailabilityCalendarProps {
    occupiedDates: string[];
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ occupiedDates }) => {
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <div className="grid grid-cols-7 gap-1 p-4 bg-white rounded-lg shadow-sm">
            {/*{["S", "M", "T", "W", "T", "F", "S"].map((day) => (*/}
            {/*    <div key={day} className="text-center text-sm font-semibold text-gray-600">*/}
            {/*        {day}*/}
            {/*    </div>*/}
            {/*))}*/}
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                <div key={`${day}-${index}`} className="text-center text-sm font-semibold text-gray-600">
                    {day}
                </div>
            ))}

            {days.map((day) => {
                // In the sample, occupied dates are hardcoded for March 2024.
                const dayStr = day.toString().padStart(2, "0");
                const dateStr = `2024-03-${dayStr}`;
                const isOccupied = occupiedDates.includes(dateStr);
                return (
                    <div
                        key={day}
                        className={`text-center p-1 text-sm rounded ${
                            isOccupied ? "bg-red-100 text-red-600" : "text-gray-700"
                        }`}
                    >
                        {day}
                    </div>
                );
            })}
        </div>
    );
};

export default AvailabilityCalendar;

