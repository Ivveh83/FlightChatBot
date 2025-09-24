import axios from "axios";

const API_URL = "http://localhost:/api/flights";

export const fetchFlights = {
    getAllAvailableFlights: async () => {
        try {
            const response = await axios.get(`${API_URL}/available`)
        }