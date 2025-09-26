//Todo 1: Implement functionality to update state demoFlights2
// Todo 2: implement useState to switch useEffect
// Todo 3: Implement useEffect for fetching all available flights

import { useState, useRef, useEffect } from "react";
import { flightAssistance } from "../service/flightService";
import "./ChatBot.css";

function ChatBot({ setFetchAvailableFlights }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! How can I help you with your flight today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState(
    Math.random().toString(36).substring(2, 15)
  );
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: input },
      { sender: "bot", text: "bot is typing..." },
    ]);

    try {
      flightAssistance.fetchAIResponse(
        input,
        conversationId,
        (chunk, fullText) => {
          console.log("Received chunk:", chunk);
          console.log("So far:", fullText);

          setMessages((prev) => [
            ...prev.slice(0, -1),
            { sender: "bot", text: fullText },
          ]);
        }
      );
    } catch (error) {
      console.log("Error in sendMessage: ", error);
      setMessages((prev) => [
        ...prev.slice(0, -1), // Ta bort "typing..."
        {
          sender: "bot",
          text: "Sorry, something went wrong. Please try again",
        },
      ]);
    }

    setInput("");
    setFetchAvailableFlights((prev) => !prev); // Trigger fetching available flights
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <span>ChatBot</span>
        <button
          className="btn btn-sm btn-light"
          onClick={() => {
            setConversationId(Math.random().toString(36).substring(2, 15));
            setMessages([
              {
                sender: "bot",
                text: "Hello! How can I help you with your flight today?",
              },
            ]);
          }}
        >
          New conversation
        </button>
      </div>

      <div className="card-body" style={{ height: "300px", overflowY: "auto" }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`d-flex mb-2 ${
              msg.sender === "user"
                ? "justify-content-end"
                : "justify-content-start"
            }`}
          >
            <div
              className={`chat-bubble ${
                msg.sender === "user" ? "user-bubble" : "bot-bubble"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
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
export default ChatBot;
