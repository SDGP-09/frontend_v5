export interface Ad{
    id: number;
    title: string;
    description: string;
    field: string;
    images: string[];
    fullDescription: string;
    prices: Partial<Record<PriceInterval, number>>;
}


export type PriceInterval = "hour" | "day" | "week" | "month" | "year";