"use client";

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

interface Task {
     id:string;
     name:string;
     startDate:string;
     endDate:string;
     progress:string;
     dependencies:string;
     description:string;

}



const GanttChart = () => {
    const ganttContainer = useRef<HTMLDivElement>(null);
    const ganttInstance = useRef<any>(null);
    const router = useRouter();
    const pathname = usePathname();

    const [tasks, setTasks] = useState<Array<Task>>([]);
    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:7878/api/project");
    
            const formattedTasks = response.data.map((task: any) => ({
                id: task.id,
                name: task.name,
                start: task.startDate,  // Rename startDate -> start
                end: task.endDate,      // Rename endDate -> end
                progress: Number(task.progress) || 0, // Ensure progress is a number
                dependencies: task.dependencies || "", // Default to empty if undefined
                description: task.description || "No description available", // Prevent undefined values
            }));
    
            setTasks(formattedTasks);
            console.log("Tasks fetched and formatted:", formattedTasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        fetchTasks(); // Load once on mount
    }, []);


    useEffect(() => {

        const loadGantt = async () => {
            const { default: Gantt } = await import("frappe-gantt");



            if (ganttContainer.current) {
                ganttContainer.current.innerHTML = "";

                

                ganttInstance.current = new (Gantt as any)(ganttContainer.current, tasks, {
                    view_mode: "Day",
                    language: "en",
                    on_click: (task: any) => {
                        console.log("Task Clicked:", task);
                        router.push(`/application/main-console/project/task?id=${task.id}&name=${task.name}&start=${task.start}&end=${task.end}&progress=${task.progress}&dependencies=${task.dependencies}&description=${task.description}`);
                    },
                });
            }
        };

        loadGantt();
        return () => {
            if (ganttInstance.current && ganttContainer.current) {
                ganttContainer.current.innerHTML = ""; // Ensure element exists before modifying
            }
        };
    }, [pathname,tasks]);

    return (
        <div className="w-full h-[400px] overflow-auto  bg-gray-100">
            <div ref={ganttContainer} className="w-full h-full  bg-white shadow-lg rounded-lg" />
            
        </div>
    );
};

export default GanttChart;