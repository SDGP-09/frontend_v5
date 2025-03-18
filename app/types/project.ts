export interface Task {
    id: string;
    projectId: string;
    name: string;
    status?: 'New' | 'In Progress' | 'Completed';
    startDate: Date;
    endDate: Date;
    description?: string;

}

export interface ProjectImage {
    id: string;
    url: string;

}

export interface Project {
    id: string;
    name: string;
    status: 'New' | 'In Progress' | 'Completed';
    startDate: Date;
    endDate: Date;
    description: string;
    tasks: Task[];
    expanded: boolean;
    contractorId: number;
    images?: ProjectImage[];
}






