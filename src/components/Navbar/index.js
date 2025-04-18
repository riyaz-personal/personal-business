import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav style={{ background: "#222", padding: "10px 20px" }}>
    <Link to="/" style={{ color: "#fff", marginRight: "20px" }}>Home</Link>
    <Link to="/calculator" style={{ color: "#fff" }}>Calculator</Link>
  </nav>
);

export default Navbar;
