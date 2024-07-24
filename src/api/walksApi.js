import axios from "axios";

const walksApi = axios.create({
    baseURL: "https://walk-the-line-backend.onrender.com/api/walks",
});

export const getWalks = async () => {
    try {
        const { data } = await walksApi.get('/');
        return data.walks;
    } catch (error) {
        console.log(error);
    }
};

export const uploadWalk = async (walkToUpload) => {
    try {
        const { data } = await walksApi.post('/', walkToUpload);
        return data;
    } catch (error) {
        console.log(error);
    }
};