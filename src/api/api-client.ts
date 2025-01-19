import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://api.thecatapi.com/v1",
    headers: {
        "x-api-key": import.meta.env.VITE_API_KEY,
    },
});

export default apiClient;
