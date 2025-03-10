export interface Projects {
    id: string;
    title: string;
    description: string;
    status: 'Completed';
    visibility: 'Visible' | 'Hidden';
    privacy: 'Public' | 'Private';
    imageUrl: string;
    progress: number;
    members: number;
    duration: string;
    completedDate: string;
}