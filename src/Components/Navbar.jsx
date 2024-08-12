import menuIcon from "../assets/menu-icon.png";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import textLogo from "../assets/screenvault-text.png";

export default function Navbar() {
  return (
    <nav className="Navbar">
      <img src={menuIcon} alt="menu-icon" className="menuIcon" />
      <h3 className="searchIcon">🔍</h3>
      <img src={textLogo} alt="logo-text" className="textLogo" />
    </nav>
  );
}
