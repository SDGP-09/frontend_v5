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

// Define GanttTask interface which is what the Frappe Gantt library expects
interface GanttTask {
    id: string;
    name: string;
    start: string;
    end: string;
    progress: number;
    dependencies: string;
    description: string;
}

// Define the Gantt instance interface
interface GanttInstance {
    refresh(tasks: GanttTask[]): void;
    change_view_mode(mode: string): void;
    clear(): void;
}

// Define constructor type for Frappe Gantt
type GanttConstructor = {
    new (
        container: HTMLElement,
        tasks: GanttTask[],
        options: {
            view_mode: string;
            language: string;
            on_click: (task: GanttTask) => void;
        }
    ): GanttInstance;
};



const GanttChart = () => {
    const ganttContainer = useRef<HTMLDivElement>(null);
    const ganttInstance = useRef<GanttInstance | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    const [tasks, setTasks] = useState<GanttTask[]>([]);
    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:7075/api/tasks");
    
            const formattedTasks: GanttTask[]  = response.data.map((task: Task) => ({
                id: task.id,
                name: task.name,
                start: task.startDate,
                end: task.endDate,
                progress: Number(task.progress) || 0,
                dependencies: task.dependencies || "",
                description: task.description || "No description available",
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
            try {
                // Import Frappe Gantt with proper typing
                const GanttModule = await import("frappe-gantt");

                if (ganttContainer.current) {
                    ganttContainer.current.innerHTML = "";

                    // Cast the Gantt constructor to the expected type
                    const Gantt = GanttModule.default as unknown as GanttConstructor;

                    ganttInstance.current = new Gantt(
                        ganttContainer.current,
                        tasks,
                        {
                            view_mode: "Day",
                            language: "en",
                            on_click: (task: GanttTask) => {
                                console.log("Task Clicked:", task);
                                router.push(`/application/main-console/project/task?id=${task.id}&name=${task.name}&start=${task.start}&end=${task.end}&progress=${task.progress}&dependencies=${task.dependencies}&description=${task.description}`);
                            },
                        }
                    );
                }
            } catch (error) {
                console.error("Error loading Gantt chart:", error);
            }
        };
        loadGantt();
        return () => {
            if (ganttInstance.current && ganttContainer.current) {
                ganttContainer.current.innerHTML = ""; // Ensure element exists before modifying
            }
        };
    }, [pathname,tasks, router]);

    return (
        <div className="w-full h-[400px] overflow-auto  bg-gray-100">
            <div ref={ganttContainer} className="w-full h-full  bg-white shadow-lg rounded-lg" />
            
        </div>
    );
};

export default GanttChart;