import axios from 'axios';

export const geoApi = axios.create({
    baseURL: "https://json.geoapi.pt",
    headers: {
        "Content-Type": "application/json"
    },
});

export const muralisApi = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-type": "application/json"
    }
});