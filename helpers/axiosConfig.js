import axios from "axios";

const instance = axios.create({
    baseURL: 'https://smartrealtors.app/api',
});

export default instance;