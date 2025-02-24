const API_BASE_URL = "http://localhost:7071/contractor";

// ✅ Fetch all contractors
export const fetchContractors = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/find-all`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Contractor API Response:", result);

        if (!result || !result.data || !Array.isArray(result.data.contractors)) {
            console.error("Unexpected response format", result);
            return [];
        }

        return result.data.contractors;
    } catch (error) {
        console.error("Error fetching contractors:", error);
        return [];
    }
};

// ✅ Fetch contractor by ID
export const fetchContractorById = async (id: string) => {
    try {
        const response = await fetch("http://localhost:7071/contractor/find-by-id", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Fetched Contractor by ID:", result); // ✅ Debugging log

        if (!result || !result.data || !result.data.contractor) {
            console.warn("Contractor data is missing in response:", result);
            return null;
        }

        return result.data.contractor; // ✅ Ensure correct data structure
    } catch (error) {
        console.error("Error fetching contractor by ID:", error);
        return null; // ✅ Return null to prevent app crashes
    }
};

