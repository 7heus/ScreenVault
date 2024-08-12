import menuIcon from "../assets/menu-icon.png";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import textLogo from "../assets/screenvault-text.png";
import { useState } from "react";

export default function Navbar() {
  const [query, setQuery] = useState("");

  const updateQuery = (e) => setQuery(e.target.value);

  return (
    <nav className="Navbar">
      <img src={menuIcon} alt="menu-icon" className="menuIcon" />
      <h3 className="searchIcon">🔍</h3>
      <input type="search" value={query} onChange={updateQuery} />
      <img src={textLogo} alt="logo-text" className="textLogo" />
    </nav>
  );
}
