import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calculator from "./businessTools/Calculator/Calculator";
import Navbar from "./components/Navbar";

const Home = () => (
  <div style={{ padding: "40px", textAlign: "center" }}>
    <h2>Welcome to Business Tools Suite</h2>
    <p>Select a tool from the menu to get started.</p>
  </div>
);

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/calculator" element={<Calculator />} />
    </Routes>
  </Router>
);

export default App;
