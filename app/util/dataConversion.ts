export interface BackendHotDeal {
    id: number;
    title: string;
    description: string;
    image: string;
}

export interface BackendProject {
    id: number;
    title: string;
    image: string;
}

export interface BackendCompanyData {
    name: string;
    location: string;
    profileImage: string; // Note the backend field name
    isApproved: boolean;
    ratings: { [key: number]: number };
    hotDeals: BackendHotDeal[];
    ongoingProjects: BackendProject[];
    completedProjects: BackendProject[];
    occupiedStartDate: string;
    occupiedEndDate: string;
}

// Define a type for your company data
export interface CompanyData {
    name: string;
    location: string;
    profileImage: string;
    isApproved: boolean;
    ratings: { [key: number]: number };
    occupiedDates: string[];
    hotDeals: {
        id: number;
        title: string;
        description: string;
        image: string;
    }[];
    ongoingProjects: {
        id: number;
        title: string;
        image: string;
    }[];
    completedProjects: {
        id: number;
        title: string;
        image: string;
    }[];
}

export function convertBackendToFrontEnd(backendData: BackendCompanyData): CompanyData {

    return {
        name: backendData.name,
        location: backendData.location,
        profileImage: backendData.profileImage,
        isApproved: backendData.isApproved,
        ratings: backendData.ratings,
        occupiedDates: calculateOccupiedDates(backendData.occupiedStartDate, backendData.occupiedEndDate),
        hotDeals: backendData.hotDeals.map((deal) => ({
            id: deal.id,
            title: deal.title,
            description: deal.description,
            image: deal.image,
        })),
        ongoingProjects: backendData.ongoingProjects.map((project) => ({
            id: project.id,
            title: project.title,
            image: project.image,
        })),
        completedProjects: backendData.completedProjects.map((project) => ({
            id: project.id,
            title: project.title,
            image: project.image,
        })),
    };
}

export function calculateOccupiedDates(startDateStr: string, endDateStr: string): string[] {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    const dates: string[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}