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

interface GanttChartProps {
    viewMode?: string;
}

const GanttChart: React.FC<GanttChartProps> = ({ viewMode = "Day" }) => {
    const ganttContainer = useRef<HTMLDivElement>(null);
    const ganttInstance = useRef<GanttInstance | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    const [tasks, setTasks] = useState<GanttTask[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const fetchTasks = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.get("http://35.193.219.136:4040/api/v1/users/login",);
    
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
            setError("Failed to load tasks. Please try again later.");
        }finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks(); // Load once on mount
    }, []);


    // Update chart when view mode changes
    useEffect(() => {
        if (ganttInstance.current) {
            ganttInstance.current.change_view_mode(viewMode);
        }
    }, [viewMode]);


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
                            view_mode:viewMode ,
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
    }, [pathname,tasks, router,viewMode]);


    if (isLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-red-500">
                    <p>{error}</p>
                    <button
                        onClick={fetchTasks}
                        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (tasks.length === 0 && !isLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-gray-500 mt-52">
                    <p>No Tasks found. Create your first task to get started.</p>
                    <button
                        onClick={() => router.push("/application/main-console/project/addtask")}
                        className="mt-3 px-4 py-2 bg-green-500 text-white rounded-full text-sm hover:bg-green-600"
                    >
                        Create Task
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full overflow-auto">
            <div ref={ganttContainer} className="w-full h-full" />
        </div>
    );
};

export default GanttChart;