import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './App.css';

// Socket.io server URL (production or development)
const SOCKET_SERVER_URL = "https://text-app-4cdh.onrender.com"; // Replace with your server URL

// Initialize socket connection
const socket = io(SOCKET_SERVER_URL, {
  withCredentials: true, // Ensure that cookies are sent for auth
  transports: ['websocket'], // Use WebSocket for faster communication
});

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(""); // Store username if needed

  // Handle incoming messages from the server
  useEffect(() => {
    // Listen for 'chat message' events from the server
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.off("chat message");
    };
  }, []);

  // Send message to the server
  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit("chat message", message); // Send message to server
      setMessage(""); // Clear the input field
    }
  };

  return (
    <div className="App">
      <h1>Real-Time Chat</h1>
      
      <div className="chat-box">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              {msg}
            </div>
          ))}
        </div>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
