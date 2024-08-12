import menuIcon from "../assets/menu-icon.png";
import "./Navbar.css";
import textLogo from "../assets/screenvault-text.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const nav = useNavigate();

  const updateQuery = (e) => setQuery(e.target.value);
  const sender = (e) => {
    if (e.key === "Enter") {
      nav(`/search?q=${query.replace(" ", "_")}`);
      location.reload();
    }
  };

  return (
    <nav className="Navbar">
      <img src={menuIcon} alt="menu-icon" className="menuIcon" />
      <input
        type="search"
        value={query}
        onChange={updateQuery}
        onKeyDown={sender}
      />
      <Link to="/">
        <img src={textLogo} alt="logo-text" className="textLogo" />
      </Link>
    </nav>
  );
}
