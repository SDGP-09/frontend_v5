export interface Task {
    id: string;
    projectId: string;
    name: string;
    status?: 'New' | 'In Progress' | 'Completed';
    startDate: Date;
    endDate: Date;
    description?: string;
}

export interface Project {
    id: string;
    name: string;
    status: 'New' | 'In Progress' | 'Completed';
    startDate: Date;
    endDate: Date;
    description: string;
    //contractor: string;
    tasks: Task[];
    expanded: boolean;
}
export interface ProjectFormData extends Omit<Project, 'tasks' | 'expanded'> {
    status: 'New' | 'In Progress' | 'Completed'; // Ensures strict typing
}






