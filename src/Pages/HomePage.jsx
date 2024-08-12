import logo from "../assets/screenvault-logo.png";
import { Link } from "react-router-dom";
import "./HomePage.css";

//Components
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function HomePage() {
  return (
    <div className="">
      <Navbar />
      <Link to="/catalog">
        <img src={logo} alt="ScreenVault Logo" className="logo" />
      </Link>
      <h2 className="welcome">
        Welcome to the internet's most valuable entertaiment vault!
      </h2>
      <Footer />
    </div>
  );
}
