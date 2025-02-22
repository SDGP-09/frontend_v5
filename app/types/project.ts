export interface Task {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
}

export interface Project {
    id: string;
    name: string;
    status: 'New' | 'In Progress' | 'Completed';
    startDate: Date;
    endDate: Date;
    description: string;
    contractor: string;
    tasks: Task[];
    expanded: boolean;
}