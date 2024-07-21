import axios from "axios";

const usersApi = axios.create({
    baseURL: "https://walk-the-line-backend.onrender.com/api/walks",
});

export const getWalks = async () => {
    try {
        const { data } = await usersApi.get('/');
        return data.walks;
    } catch (error) {
        console.log(error);
    }
}