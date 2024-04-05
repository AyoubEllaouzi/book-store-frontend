import axios from "axios";
export const APIProvider = axios.create({
    baseURL: `http://localhost:8083/`
});