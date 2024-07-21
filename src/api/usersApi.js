import axios from "axios";

const usersApi = axios.create({
    baseURL: "https://walk-the-line-backend.onrender.com/api/users",
});

export const getUsernames = async () => {
    try {
        const { data } = await usersApi.get('/');
        return data.users;
    } catch (error) {
        console.log(error);
    }
}