export interface Projects {
    id: string;
    title: string;
    description: string;
    status: 'Completed';
    // visibility: 'Visible' | 'Hidden';
    visibility: boolean;
    imageUrl: string;
    // progress: number;
    // members: number;
    duration: string;
    completedDate: string;
}
// export interface Projects {
//     id: string;
//     title: string;
//     description: string;
//     status: "New" | "In Progress" | "Completed";
//     imageUrl: string;
//     duration: string;
//     completedDate: string;
//     // visibility: boolean; // true means visible; false means hidden
// }

export interface Completeprojects{
    id: string;
    title: string;
    description: string;
    status: "New" | "In Progress" | "Completed";
    imageUrl: string;
    duration: string;
    completedDate: string;
}
