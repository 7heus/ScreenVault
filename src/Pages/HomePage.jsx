import logo from "../assets/screenvault-logo.png";
import { Link } from "react-router-dom";
import "./HomePage.css";

//Components
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Link to="/catalog">
        <img src={logo} alt="ScreenVault Logo" />
      </Link>
      <h3>Welcome the internet's most valuable entertaiment vault!</h3>
      <Footer />
    </div>
  );
}
