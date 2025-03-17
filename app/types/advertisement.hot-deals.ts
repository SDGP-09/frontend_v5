export interface Ad{
    id: number;
    ownerId: number;
    title: string;
    description: string;
    field: string;
    images: string[];
    fullDescription: string;
    prices: Partial<Record<PriceInterval, number>>;
    visibility: boolean;
}


export type PriceInterval = "hour" | "day" | "week" | "month" | "year";