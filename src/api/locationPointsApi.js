import axios from "axios";

const locationPointsApi = axios.create({
    baseURL: "https://walk-the-line-backend.onrender.com/api/walklocationpoints",
});

export const getWalkLocationPoints = async (walkId) => {
    try {
        const { data } = await locationPointsApi.get(`${walkId}`);
        return data.locationPoints;
    } catch (error) {
        console.log(error);
    }
};