"use client"
import GanttChart from "@/app/application/main-console/project/component/Gantt-Chart";
import {useRouter} from "next/navigation";
import { CalendarClock, PlusCircle, Clock, BarChart4 } from "lucide-react";
import { useState } from "react";

export default function Project(){
    const router = useRouter();
    const [activeView, setActiveView] = useState("Day");

    const viewOptions = [
        { id: "Day", label: "Daily View", icon: <Clock className="w-4 h-4 mr-1" /> },
        { id: "Week", label: "Weekly View", icon: <BarChart4 className="w-4 h-4 mr-1" /> },
        { id: "Month", label: "Monthly View", icon: <CalendarClock className="w-4 h-4 mr-1" /> },
    ];

    return (
        <div className="w-full h-full flex flex-col">
            {/* Header */}
            <div className="w-full py-5 px-6 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50 shadow-sm">
                <div className="w-full h-full flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="rounded-full bg-gradient-to-br from-green-400 to-blue-500 p-2 mr-3 shadow-md">
                            <CalendarClock className="h-7 w-7 text-white"/>
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-600 text-transparent bg-clip-text">
                            Project Timeline
                        </h1>
                    </div>
                    <div>
                        <button
                            className="py-2 px-5 rounded-full cursor-pointer bg-gradient-to-r from-green-500 to-blue-600 text-white font-medium flex items-center shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
                            onClick={() => router.push("/application/main-console/project/addtask")}
                        >
                            <PlusCircle className="w-5 h-5 mr-2"/>
                            <span>Create New Task</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Gantt Chart Section */}
            <div className="flex-1 p-6">
                <div className="rounded-xl shadow-sm border border-gray-100 p-5 h-full">
                    <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Task Timeline Overview</h2>
                            <p className="text-sm text-gray-500">Visualize your project schedule and track progress</p>
                        </div>

                        {/* View selector tabs */}
                        <div className="flex mt-3 md:mt-0 bg-gray-100 p-1 rounded-full shadow-inner">
                            {viewOptions.map(option => (
                                <button
                                    key={option.id}
                                    onClick={() => setActiveView(option.id)}
                                    className={`py-1.5 px-4 rounded-full text-sm flex items-center font-medium transition-all duration-200 ${
                                        activeView === option.id
                                            ? "bg-white text-gray-800 shadow-sm border border-gray-100 transform scale-105"
                                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                    }`}
                                >
                                    {option.icon}
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-[calc(100%-80px)]">
                        <GanttChart viewMode={activeView}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
