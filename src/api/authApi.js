import axios from "axios";

const authApi = axios.create({
    baseURL: "https://walk-the-line-backend.onrender.com/api",
});

export const logIn = async (credentials) => {
    try {
        const { data } = await authApi.post("/users/signin", credentials);
        return { success: true, user: data.user };
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                return { success: false, message: "Invalid credentials" };
            }
            return {
                success: false,
                message: `Server error: ${error.response.status}`,
            };
        } else if (error.request) {
            return {
                success: false,
                message: "No response received from the server",
            };
        } else {
            return { success: false, message: `Error: ${error.message}` };
        }
    }
};

export const signUp = async (formData) => {
    try {
        const { data } = await authApi.post("/users/signup", formData);
        return { success: true, user: data.user };
    } catch (error) {
        if (error.response) {
            return {
                success: false,
                message: `Server error: ${error.response.message}`,
            };
        } else if (error.request) {
            return {
                success: false,
                message: "No response received from the server",
            };
        } else {
            return { success: false, message: `Error: ${error.message}` };
        }
    }
}
