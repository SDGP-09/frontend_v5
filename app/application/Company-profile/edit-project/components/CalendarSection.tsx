// "use client";
// import React from "react";
//
// /**
//  * CalendarSectionProps
//  *
//  * @param selectedDates - Array of numbers indicating the selected days.
//  * @param toggleDateSelection - Function to toggle a day’s selection.
//  */
// interface CalendarSectionProps {
//     selectedDates: number[];
//     toggleDateSelection: (day: number) => void;
// }
//
// /**
//  * CalendarSection Component
//  *
//  * Renders a calendar with weekday labels and day buttons. Selected dates are highlighted.
//  */
// export default function CalendarSection({
//                                             selectedDates,
//                                             toggleDateSelection,
//                                         }: CalendarSectionProps) {
//     // Create an array of days from 1 to 28.
//     const days = Array.from({ length: 28 }, (_, i) => i + 1);
//     // Weekday labels
//     const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
//
//     return (
//         <div className="bg-white rounded-xl shadow-sm p-6">
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold">Availability</h2>
//                 <div className="flex items-center gap-2">
//                     <div className="flex items-center gap-1">
//                         <div className="w-3 h-3 bg-red-100 rounded"></div>
//                         <span className="text-sm text-gray-600">Unavailable</span>
//                     </div>
//                 </div>
//             </div>
//             <div className="inline-block">
//                 <div className="grid grid-cols-7 gap-1 text-sm">
//                     {/* Render weekday headers */}
//                     {weekDays.map((day) => (
//                         <div
//                             key={day}
//                             className="w-8 h-8 flex items-center justify-center text-gray-500 font-medium"
//                         >
//                             {day}
//                         </div>
//                     ))}
//                     {/* Render day buttons */}
//                     {days.map((day) => (
//                         <button
//                             key={day}
//                             onClick={() => toggleDateSelection(day)}
//                             className={`w-8 h-8 text-sm rounded flex items-center justify-center transition-colors ${
//                                 selectedDates.includes(day)
//                                     ? "bg-red-100 text-red-600"
//                                     : "hover:bg-gray-100"
//                             }`}
//                         >
//                             {day}
//                         </button>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }
"use client";
import React from "react";

interface CalendarSectionProps {
    selectedDates: number[];
    toggleDateSelection: (day: number) => void;
}

export default function CalendarSection({
                                            selectedDates,
                                            toggleDateSelection,
                                        }: CalendarSectionProps) {
    const days = Array.from({ length: 28 }, (_, i) => i + 1);
    const weekDays = ["S", "M", "T", "W", "Th", "F", "S"]; // "Th" for Thursday

    const renderWeekHeaders = () =>
        weekDays.map((day, index) => (
            <div
                key={`${day}-${index}`} // Unique key
                className="w-8 h-8 flex items-center justify-center text-gray-500 font-medium"
            >
                {day}
            </div>
        ));

    const renderDayButtons = () =>
        days.map((day) => (
            <button
                key={day}
                onClick={() => toggleDateSelection(day)}
                aria-label={`Select day ${day}`}
                className={`w-8 h-8 text-sm rounded flex items-center justify-center transition-colors ${
                    selectedDates.includes(day)
                        ? "bg-red-100 text-red-600"
                        : "hover:bg-gray-100"
                }`}
            >
                {day}
            </button>
        ));

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Availability</h2>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-red-100 rounded"></div>
                        <span className="text-sm text-gray-600">Unavailable</span>
                    </div>
                </div>
            </div>
            <div className="inline-block">
                <div className="grid grid-cols-7 gap-1 text-sm">
                    {renderWeekHeaders()}
                    {renderDayButtons()}
                </div>
            </div>
        </div>
    );
}
