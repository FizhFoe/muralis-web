import axios from 'axios';

const API_BASE_URL = "http://localhost:5000/api";

export const geoApi = axios.create({
    baseURL: "https://json.geoapi.pt",
    headers: {
        "Content-Type": "application/json"
    },
});

export const muralisApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-type": "application/json"
    }
});

// exporta para usar com imagens/uploads
export const SERVER_URL = API_BASE_URL.replace('/api', '');