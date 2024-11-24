import axios from "axios";

export const computeRisk = async (data) => {
    try {
        const response = await axios.post("http://localhost:5000/compute-risk", data);
        return response.data;
    } catch (error) {
        console.error("Error computing risk score:", error);
        return null;
    }
};
