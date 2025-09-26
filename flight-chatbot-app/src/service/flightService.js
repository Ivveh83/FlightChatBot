//Todo 1: implement functionality to fetch all available flights from backend
//Todo 1: implement functionality to comunicate with AI in the backend

import axios from "axios";

const API_URL = "http://localhost:8080/api/flights";

export const flightAssistance = {
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
  fetchAIResponse: async (userMessage, conversationId, onChunk) => {
    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: userMessage,
        conversationId: conversationId,
      }),
    });

    if (!response.body) {
      throw new Error("ReadableStream not supported in this environment");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let partialMessage = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Dekoda chunk och lägg ihop
      const chunk = decoder.decode(value, { stream: true });
      partialMessage += chunk;

      // Skicka vidare till callback i UI
      onChunk(chunk, partialMessage);
    }
  },
};
