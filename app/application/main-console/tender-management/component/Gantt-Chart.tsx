"use client";

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

interface Tender{
    id:string;
    name:string;
    openDate:string;
    closeDate:string;
    progress:string;
    dependencies:string;
    description:string;

}

// Define GanttTask interface which is what the Frappe Gantt library expects
interface GanttTask {
    id: string;
    name: string;
    open: string;
    close: string;
    progress: number;
    dependencies: string;
    description: string;
}

// Define the Gantt instance interface
interface GanttInstance {
    refresh(tenders: GanttTask[]): void;
    change_view_mode(mode: string): void;
    clear(): void;
}

// Define constructor type for Frappe Gantt
type GanttConstructor = {
    new (
        container: HTMLElement,
        tenders: GanttTask[],
        options: {
            view_mode: string;
            language: string;
            on_click: (tender: GanttTask) => void;
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

    const [tenders, setTenders] = useState<GanttTask[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    // const fetchTenders = async () => {
    //     try {
    //         setIsLoading(true);
    //         setError(null);
    //         const response = await axios.get("http://localhost:7075/api/tasks");
    //
    //         const formattedTenders: GanttTask[]  = response.data.map((tender: Tender) => ({
    //             id: tender.id,
    //             name: tender.name,
    //             start: tender.openDate,
    //             end: tender.closeDate,
    //             progress: Number(tender.progress) || 0,
    //             dependencies: tender.dependencies || "",
    //             description: tender.description || "No description available",
    //         }));
    //
    //         setTenders(formattedTenders);
    //         console.log("Tenders fetched and formatted:", formattedTenders);
    //     } catch (error) {
    //         console.error("Error fetching tenders:", error);
    //         setError("Failed to load tenders. Please try again later.");
    //     }finally {
    //         setIsLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchTenders(); // Load once on mount
    // }, []);


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
                        tenders,
                        {
                            view_mode:viewMode ,
                            language: "en",
                            on_click: (tender: GanttTask) => {
                                console.log("Task Clicked:", tender);
                                router.push(`/application/main-console/tender-management/tender?id=${tender.id}&name=${tender.name}&start=${tender.open}&end=${tender.close}&progress=${tender.progress}&dependencies=${tender.dependencies}&description=${tender.description}`);
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
    }, [pathname,tenders, router,viewMode]);


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
                        //onClick={fetchTenders}
                        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (tenders.length === 0 && !isLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-gray-500">
                    <p>No tenders found. Create your first tender to get started.</p>
                    <button
                        onClick={() => router.push("/application/main-console/tender-management/addtender")}
                        className="mt-3 px-4 py-2 bg-green-500 text-white rounded-full text-sm hover:bg-green-600"
                    >
                        Create Tender
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