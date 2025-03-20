"use client";


import React, { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";



const GanttChart = () => {
    const ganttContainer = useRef<HTMLDivElement>(null);
    const ganttInstance = useRef<any>(null);
    const router = useRouter();
    const pathname = usePathname();


    useEffect(() => {
        const loadGantt = async () => {
            const { default: Gantt } = await import("frappe-gantt");



            if (ganttContainer.current) {
                ganttContainer.current.innerHTML = "";
                const tasks = [
                    {
                        id: "Task 1",
                        name: "Redesign website",
                        start: "2025-03-20",
                        end: "2025-03-25",
                        progress: 20,
                        dependencies: "",
                    },
                    {
                        id: "Task 2",
                        name: "Write blog post",
                        start: "2025-03-22",
                        end: "2025-03-24",
                        progress: 50,
                        dependencies: "Task 1",
                    },
                    {
                        id: "Task 3",
                        name: "Write blog post",
                        start: "2025-03-22",
                        end: "2025-03-24",
                        progress: 50,
                        dependencies: "",
                    },
                    {
                        id: "Task 4",
                        name: "Redesign website",
                        start: "2025-03-20",
                        end: "2025-03-25",
                        progress: 20,
                        dependencies: "",
                    },
                    {
                        id: "Task 5",
                        name: "Redesign website",
                        start: "2025-03-20",
                        end: "2025-03-25",
                        progress: 20,
                        dependencies: "",
                    },
                    {
                        id: "Task 6",
                        name: "Write blog post",
                        start: "2025-03-22",
                        end: "2025-03-24",
                        progress: 50,
                        dependencies: "Task 1",
                    },
                    {
                        id: "Task 7",
                        name: "Write blog post",
                        start: "2025-03-22",
                        end: "2025-03-24",
                        progress: 50,
                        dependencies: "",
                    },
                    {
                        id: "Task 8",
                        name: "Redesign website",
                        start: "2025-03-20",
                        end: "2025-03-25",
                        progress: 20,
                        dependencies: "",
                    },
                    {
                        id: "Task 1",
                        name: "Redesign website",
                        start: "2025-03-20",
                        end: "2025-03-25",
                        progress: 20,
                        dependencies: "",
                    },
                    {
                        id: "Task 2",
                        name: "Write blog post",
                        start: "2025-03-22",
                        end: "2025-03-24",
                        progress: 50,
                        dependencies: "Task 1",
                    },
                    {
                        id: "Task 3",
                        name: "Write blog post",
                        start: "2025-03-22",
                        end: "2025-03-24",
                        progress: 50,
                        dependencies: "",
                    },
                    {
                        id: "Task 4",
                        name: "Redesign website",
                        start: "2025-03-20",
                        end: "2025-03-25",
                        progress: 20,
                        dependencies: "",
                    },

                ];

                ganttInstance.current = new (Gantt as any)(ganttContainer.current, tasks, {
                    view_mode: "Day",
                    language: "en",
                    on_click: (task: any) => {
                        console.log("Task Clicked:", task);
                        router.push('/task'); // Navigate to task view
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
    }, [pathname]);

    return (
        <div className="w-full h-3/4 overflow-auto p- bg-gray-100">
            <div ref={ganttContainer} className="w-full h-full  bg-white shadow-lg rounded-lg" />
        </div>
    );
};

export default GanttChart;