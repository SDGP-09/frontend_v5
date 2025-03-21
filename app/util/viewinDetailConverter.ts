import { BackendMainTask } from "../types/viewInDetails";
import { TimelineItem } from "@/app/view-in-details/components/ProjectTimeline";

export interface Project {
    id: string;
    name: string;
    description: string;
    startDate: string;
    estimatedCompletion: string;
    images: string[];
    timeline: TimelineItem[];
}

export function convertMainTaskToProject(backendData: BackendMainTask): Project {
    return {
        id: backendData.id.toString(),
        name: backendData.taskName,
        description: backendData.description,
        startDate: backendData.startDate,
        estimatedCompletion: backendData.endDate,
        images: backendData.images.map(img => img.imageUrl),
        timeline: backendData.subtasks.map(sub => ({
            date: sub.startDate,                    
            title: sub.taskName,
            description: sub.description,
            status: sub.status.toLowerCase() as "completed" | "in-progress" | "upcoming",
        })),
    };
}