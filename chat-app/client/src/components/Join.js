import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Join = ({ setRoom }) => {
  const [name, setName] = useState("");
  const [room, setRoomName] = useState("");
  const navigate = useNavigate();

  const joinRoom = () => {
    if (name !== "" && room !== "") {
      setRoom(room);
      navigate("/chat");
    }
  };

  return (
    <div>
      <h1>Join Chat</h1>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Room"
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button onClick={joinRoom}>Join</button>
    </div>
  );
};

export default Join;
