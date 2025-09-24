import { useEffect, useState } from "react";
import { flightAssistance } from "../service/flightService";

function Flights({ fetchAvailableFlights }) {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchAllAvailableFlights = async () => {
      try {
        const data = await flightAssistance.getAllAvailableFlights();
        console.log("Fetched flights in ChatBot.jsx: ", data);
        setFlights(data);
      } catch (error) {
        console.log("Error fetching flights in ChatBot.jsx: ", error);
      }
    };
    fetchAllAvailableFlights();
  }, [fetchAvailableFlights]);

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
export default Flights;
