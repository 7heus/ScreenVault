import "./Sidebar.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ boolean }) {
  const [isVisible, setIsVisible] = useState(boolean);

  useEffect(() => {
    setIsVisible(boolean);
  }, [boolean]);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const items = [
    {
      name: "Home",
      to: "/",
    },

    {
      name: "Profile",
      to: "/profile",
    },
    {
      name: "Catalog",
      to: "/catalog",
    },
    {
      name: "Random",
      to: "/random",
    },

    {
      name: "About Us",
      to: "/about",
    },
  ];

  useEffect(() => {}, [boolean]);

  return (
    <div
      className="sidebar"
      style={{ right: isVisible ? "85%" : "99.9%" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {items.map((x, index) => (
        <Link key={index} to={x.to} className="links">
          <p>{x.name}</p>
        </Link>
      ))}
    </div>
  );
}
