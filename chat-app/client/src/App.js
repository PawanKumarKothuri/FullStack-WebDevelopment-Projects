import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from "./components/Join";
import Chat from "./components/Chat";

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

export default App;
