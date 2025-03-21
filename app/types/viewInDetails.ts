export interface BackendTimelineItem {
    endDate: string;
    taskname: string;
    details: string;
    status: "completed" | "in-progress" | "upcoming";
}

export interface BackendMainTask {
    id: number;
    taskName: string;
    status: string;
    startDate: string;
    endDate: string;
    description: string;
    visibility: boolean;
    images: { id: number; imageUrl: string }[];
    subtasks: {
        id: number;
        taskName: string;
        status: string;
        startDate: string;
        endDate: string;
        description: string;
    }[];
}

// app/types/ProjectTypes.ts

export interface TimelineItem {
    date: string;           // e.g., "2024-03-16"
    title: string;          // e.g., "Foundation"
    description: string;    // e.g., "foundation done"
    status: "completed" | "in-progress" | "upcoming";
}

export interface Project {
    id: string;             // "1", "2", etc.
    name: string;           // e.g., "Heavy Equipment Operator"
    description: string;    // short description, up to 120 chars
    fullDescription?: string; // optional extended description
    startDate: string;      // "2024-03-15"
    estimatedCompletion: string; // "2025-09-30"
    images: string[];       // array of image URLs
    timeline: TimelineItem[];
}

