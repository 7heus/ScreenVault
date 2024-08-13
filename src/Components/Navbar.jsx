import menuIcon from "../assets/menu-icon.png";
import "./Navbar.css";
import textLogo from "../assets/screenvault-text.png";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Navbar({ callback }) {
  const [query, setQuery] = useState("");

  const nav = useNavigate();

  const updateQuery = (e) => setQuery(e.target.value);
  const sender = (e) => {
    if (e.key === "Enter") {
      nav(`/search?q=${query.replace(" ", "_")}`, { replace: true });
      setQuery("");
    }
  };

  const alt = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("sidebarActive");
  };

  return (
    <nav className="Navbar">
      <img
        src={menuIcon}
        alt="menu-icon"
        className="menuIcon"
        onClick={callback}
      />
      <input
        type="search"
        value={query}
        onChange={updateQuery}
        onKeyDown={sender}
        placeholder="Search"
      />
      <Link to="/">
        <img src={textLogo} alt="logo-text" className="textLogo" />
      </Link>
    </nav>
  );
}
