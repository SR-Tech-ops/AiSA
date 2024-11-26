import axios from "axios";

export const computeRisk = async (data) => {
    try {
        const response = await axios.post("https://aisa-qfsr.onrender.com/compute-risk", data);
        return response.data;
    } catch (error) {
        console.error("Error computing risk score:", error);
        return null;
    }
};
