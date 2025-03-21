"use client";

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

interface Task {
     id:String;
     name:String;
     startDate:String;
     endDate:String;
     progress:String;
     dependencies:String;
     description:String;

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
            setTasks(response.data);
            console.log("Tasks fetched:", response.data);
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
    }, [tasks]);

    return (
        <div className="w-full h-[400px] overflow-auto  bg-gray-100">
            <div ref={ganttContainer} className="w-full h-full  bg-white shadow-lg rounded-lg" />
            
        </div>
    );
};

export default GanttChart;