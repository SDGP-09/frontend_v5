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
    description?: string;
    startDate: string;
    estimatedCompletionDate: string;
    status?: string;
}

export interface BackendCompanyData {
    name: string;
    location: string;
    profileImage?: string;  // Note the backend field name
    profilePicture?: string;
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
    occupiedStartDate: string;
    occupiedEndDate: string;
}

export function calculateOccupiedDates(projects: BackendProject[]): {
    occupiedStartDate: string;
    occupiedEndDate: string;
} {
    if (!projects || projects.length === 0) {
        return {
            occupiedStartDate: "",
            occupiedEndDate: ""
        };
    }

    // Filter out projects without valid dates
    const validProjects = projects.filter(project =>
        project.startDate && project.estimatedCompletionDate
    );

    if (validProjects.length === 0) {
        return {
            occupiedStartDate: "",
            occupiedEndDate: ""
        };
    }

    // Find earliest start date and latest end date
    const startDates = validProjects.map(project => new Date(project.startDate));
    const endDates = validProjects.map(project => new Date(project.estimatedCompletionDate));

    const earliestStart = new Date(Math.min(...startDates.map(date => date.getTime())));
    const latestEnd = new Date(Math.max(...endDates.map(date => date.getTime())));

    // Format dates to ISO string (YYYY-MM-DD)
    return {
        occupiedStartDate: earliestStart.toISOString().split('T')[0],
        occupiedEndDate: latestEnd.toISOString().split('T')[0]
    };
}

export function convertBackendToFrontEnd(backendData: BackendCompanyData): {
    occupiedEndDate: string;
    occupiedStartDate: string;
    ongoingProjects: { image: string; id: number; title: string }[];
    ratings: { [p: number]: number };
    hotDeals: { image: string; description: string; id: number; title: string }[];
    name: string;
    location: string;
    profileImage: string;
    isApproved: boolean;
    completedProjects: { image: string; id: number; title: string }[]
} {
    const { occupiedStartDate, occupiedEndDate } = calculateOccupiedDates(backendData.ongoingProjects);


    return {
        name: backendData.name,
        location: backendData.location,
        profileImage: backendData.profileImage || backendData.profilePicture || "",
        isApproved: backendData.isApproved,
        ratings: backendData.ratings,
        occupiedStartDate: backendData.occupiedStartDate,
        occupiedEndDate: backendData.occupiedEndDate,
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

export function isDateRangeOverlapping(
    start1: string,
    end1: string,
    start2: string,
    end2: string
): boolean {
    const s1 = new Date(start1);
    const e1 = new Date(end1);
    const s2 = new Date(start2);
    const e2 = new Date(end2);

    return s1 <= e2 && s2 <= e1;
}

export function isDateOccupied(
    date: string,
    occupiedStartDate: string,
    occupiedEndDate: string
): boolean {
    if (!occupiedStartDate || !occupiedEndDate) return false;

    const checkDate = new Date(date);
    const startDate = new Date(occupiedStartDate);
    const endDate = new Date(occupiedEndDate);

    return checkDate >= startDate && checkDate <= endDate;
}