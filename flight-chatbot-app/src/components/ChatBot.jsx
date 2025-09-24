//Todo 1: Implement functionality to update state demoFlights2
// Todo 2: implement useState to switch useEffect
// Todo 3: Implement useEffect for fetching all available flights 

import React, { useEffect, useState } from "react";
import { fetchFlights } from "../service/flightService";

// --- ChatBot Component ---
function ChatBot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! How can I help you with your flight today?",
    },
    { sender: "user", text: "Can you show me my flights?" },
    { sender: "bot", text: "Sure! Please provide your email address." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    // For demo: bot just echoes the input
    setMessages([
      ...newMessages,
      { sender: "bot", text: `You said: ${input}` },
    ]);

    setInput("");
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-primary text-white">ChatBot</div>
      <div className="card-body" style={{ height: "300px", overflowY: "auto" }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${
              msg.sender === "user" ? "text-end" : "text-start"
            }`}
          >
            <span
              className={`badge ${
                msg.sender === "user" ? "bg-secondary" : "bg-info text-dark"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="card-footer d-flex">
        <input
          type="text"
          className="form-control me-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

// --- Flights Component ---
function Flights({ flights }) {
  return (
    <div className="card shadow-sm">
      <div className="card-header bg-success text-white">Available Flights</div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Flight-ID</th>
              <th>Flight Number</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Status</th>
              <th>Destination</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {flights?.map((flight) => (
              <tr key={flight.id}>
                <td>{flight.id}</td>
                <td>{flight.flightNumber}</td>
                <td>{new Date(flight.departureTime).toLocaleString()}</td>
                <td>{new Date(flight.arrivalTime).toLocaleString()}</td>
                <td>{flight.status}</td>
                <td>{flight.destination}</td>
                <td>${flight.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- App Component ---
export default function App() {

   const [demoFlights2, setDemoflights2] = useState([]);

   const [fetchAvailableFlights, setFetchAvailableFlights] = useState(false);
   
   useEffect(() => {
    const fetchAllAvailableFlights = async () => {
     // Fetch flights from backend when component mounts
     try {
     const data = await fetchFlights.getAllAvailableFlights();
     console.log("Fetched flights in ChatBot.jsx: ", data);
     setDemoflights2(data);
     } catch (error) {
      console.log("Error fetching flights in ChatBot.jsx: ", error);
     }
    };
    fetchAllAvailableFlights();
   }, [fetchAvailableFlights]);

  const demoFlights = [
    {
      id: 1,
      flightNumber: "SK123",
      departureTime: "2025-09-24T11:18:14.941Z",
      arrivalTime: "2025-09-24T13:45:00.000Z",
      status: "On Time",
      destination: "New York",
      price: 199.99,
    },
    {
      id: 2,
      flightNumber: "LH456",
      departureTime: "2025-09-25T08:00:00.000Z",
      arrivalTime: "2025-09-25T12:30:00.000Z",
      status: "Delayed",
      destination: "Berlin",
      price: 149.5,
    },
    {
      id: 3,
      flightNumber: "DY789",
      departureTime: "2025-09-26T06:15:00.000Z",
      arrivalTime: "2025-09-26T09:00:00.000Z",
      status: "Cancelled",
      destination: "Stockholm",
      price: 89.99,
    },
  ];

  return (
    <div className="container py-4">
      <h1 className="mb-4">Flight Management Portal</h1>
      <div className="row">
        <div className="col-md-6">
          <ChatBot />
        </div>
        <div className="col-md-6">
          <Flights flights={demoFlights2} />
        </div>
      </div>
    </div>
  );
}
