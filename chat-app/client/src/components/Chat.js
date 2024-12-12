import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

const Chat = ({ room }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("join_room", room);

    socket.on("receive_message", (data) => {
      setMessages((list) => [...list, data]);
    });
  }, [room]);

  const sendMessage = () => {
    const messageData = { room, content: message };
    socket.emit("send_message", messageData);
    setMessages((list) => [...list, messageData]);
    setMessage("");
  };

  return (
    <div>
      <h1>Chat Room: {room}</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg.content}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;

