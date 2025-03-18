// contractorService.tsx

export interface Contractor {
    id: string;
    name: string;
    profilePicture?: string;
    rating?: number;
    projects?: number;
}

// Dummy data to mimic backend response
const DUMMY_CONTRACTORS: Contractor[] = [
    {
        id: "1",
        name: "BuildMaster Pro",
        profilePicture: "/placeholder.jpg",
        rating: 4.8,
        projects: 127,
    },
    {
        id: "2",
        name: "Urban Developers",
        profilePicture: "/placeholder.jpg",
        rating: 4.7,
        projects: 90,
    },
    {
        id: "3",
        name: "Skyline Constructions",
        profilePicture: "/placeholder.jpg",
        rating: 4.9,
        projects: 165,
    },
    {
        id: "4",
        name: "GreenBuild Solutions",
        profilePicture: "/placeholder.jpg",
        rating: 4.5,
        projects: 70,
    },
];

// Simulate an async function returning all contractors
export async function fetchContractors(): Promise<Contractor[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(DUMMY_CONTRACTORS);
        }, 200);
    });
}

// Simulate an async function returning a contractor by ID
export async function fetchContractorById(id: string): Promise<Contractor | null> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const contractor = DUMMY_CONTRACTORS.find((c) => c.id === id) || null;
            resolve(contractor);
        }, 200);
    });
}
