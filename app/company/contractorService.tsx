// contractorService.tsx

export interface Contractor {
    id: string;
    name: string;
    profilePicture?: string;
    rating?: number;
    projects?: number;
}

export interface PageBasedRequestDTO {
    page: number;
    size: number;
}

export interface NameBasedRequestDTO {
    name: string;
}

export interface ContractorCardResponseDTO {
    content: Contractor[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

// Backend API base URL - adjust this to match your actual backend URL
const API_BASE_URL = 'http://35.193.219.136:4040'; // Replace with your actual backend URL

// Fetch contractors by page
export async function fetchContractors(page: number = 0, size: number = 10): Promise<ContractorCardResponseDTO> {
    try {
        const response = await fetch(`${API_BASE_URL}/get-contractor-cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                page,
                size
            } as PageBasedRequestDTO),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch contractors: ${response.status}`);
        }

        const data = await response.json();
        return data.data as ContractorCardResponseDTO;
    } catch (error) {
        console.error("Error fetching contractors:", error);
        // Return empty response on error
        return {
            content: [],
            totalPages: 0,
            totalElements: 0,
            size: size,
            number: page
        };
    }
}

// Search contractors by name
export async function searchContractorsByName(name: string): Promise<ContractorCardResponseDTO> {
    try {
        const response = await fetch(`${API_BASE_URL}/search-contractor-by-name`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name
            } as NameBasedRequestDTO),
        });

        if (!response.ok) {
            throw new Error(`Failed to search contractors: ${response.status}`);
        }

        const data = await response.json();
        return data.data as ContractorCardResponseDTO;
    } catch (error) {
        console.error("Error searching contractors:", error);
        // Return empty response on error
        return {
            content: [],
            totalPages: 0,
            totalElements: 0,
            size: 10,
            number: 0
        };
    }
}

// Get contractor by ID - This is a placeholder. Modify when a proper endpoint exists
export async function fetchContractorById(id: string): Promise<Contractor | null> {
    try {
        // Search by name, as we don't have a direct ID endpoint
        const response = await searchContractorsByName(id);

        // Try to find an exact ID match in the returned data
        const contractor = response.content.find(c => c.id === id);
        return contractor || null;
    } catch (error) {
        console.error("Error fetching contractor by ID:", error);
        return null;
    }
}
