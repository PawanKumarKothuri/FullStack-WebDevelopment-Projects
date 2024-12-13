import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from "./components/Join";
import Chat from "./components/Chat";

import { io } from "socket.io-client";

const socket = io("https://text-app-4cdh.onrender.com", {
  withCredentials: true, // Required for CORS with credentials
});

export default socket;


const App = () => {
  const [room, setRoom] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Join setRoom={setRoom} />} />
        <Route path="/chat" element={<Chat room={room} />} />
      </Routes>
    </Router>
  );
};

// export default App;
