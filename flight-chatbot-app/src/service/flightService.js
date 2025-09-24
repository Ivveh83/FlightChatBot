//Todo 1: implement functionality to fetch all available flights from backend
//Todo 1: implement functionality to comunicate with AI in the backend

import axios from "axios";

const API_URL = "http://localhost:8080/api/flights";

export const fetchFlights = {
    getAllAvailableFlights: async () => {
        try {
            const response = await axios.get(`${API_URL}/available`);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log("Error fetching All Available Flights: ", error);
        }
    },
}