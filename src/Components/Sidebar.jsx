import "./Sidebar.css";
import { useEffect } from "react";

export default function Sidebar({ boolean }) {
  return (
    <div className="sidebar" style={{ right: boolean ? "85%" : "100%" }}>
      <p>About Us</p>
    </div>
  );
}
