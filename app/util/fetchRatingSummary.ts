import axios from "axios";

export interface RatingSummary {
    meanRating: number;
    Ones: number;
    Twos: number;
    Threes: number;
    Fours: number;
    Fives: number;
}

export const fetchRatingSummary = async (contractorId: number): Promise<RatingSummary> => {
    const token = localStorage.getItem("token"); // Adjust according to your auth setup
    const response = await axios.post(
        "http://35.193.219.136:4040/api/blablabla/get-rating-summery",
        { id: contractorId },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
    return response.data.data;
};
