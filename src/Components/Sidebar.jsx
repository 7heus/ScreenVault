import "./Sidebar.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ boolean }) {
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
    <div className="sidebar" style={{ right: boolean ? "85%" : "100%" }}>
      {items.map((x, index) => (
        <Link key={index} to={x.to} className="links">
          <p>{x.name}</p>
        </Link>
      ))}
    </div>
  );
}
