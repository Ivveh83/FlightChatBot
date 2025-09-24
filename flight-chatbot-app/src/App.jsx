import { useState } from "react";
import "./App.css";
import ChatBot from "./components/ChatBot";
import Flights from "./components/Flights";

function App() {
  const [fetchAvailableFlights, setFetchAvailableFlights] = useState(false);

  return (
    <div className="container py-4">
      <h1 className="mb-4">Flight Management Portal</h1>
      <div className="row">
        <div className="col-md-6">
          <ChatBot setFetchAvailableFlights={setFetchAvailableFlights} />
        </div>
        <div className="col-md-6">
          <Flights fetchAvailableFlights={fetchAvailableFlights} />
        </div>
      </div>
    </div>
  );
}

export default App;
