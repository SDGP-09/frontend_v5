export interface Task {
    id: string;
    name: string;
    status?: 'Pending' | 'In Progress' | 'Completed';
    startDate: Date;
    endDate: Date;
    description?: string;
}

export interface Project {
    id: string;
    name: string;
    status: 'Pending' | 'In Progress' | 'Completed';
    startDate: Date;
    endDate: Date;
    description: string;
    contractor: string;
    tasks: Task[];
    expanded: boolean;
}

