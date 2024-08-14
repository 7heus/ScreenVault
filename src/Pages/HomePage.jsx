import logo from "../assets/screenvault-logo.png";
import { Link } from "react-router-dom";
import "./HomePage.css";

//Components
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function HomePage() {
  return (
    <div className="">
      <audio
        src="src\assets\ElevenLabs_2024-08-13T09_10_24_Harrison Gale – The Velvet Voice_ deep, resonant, powerful, smooth, rich, storytelling, narrator_pvc_s50_sb75_t2.mp3"
        autoPlay
      />
      <Link to="/catalog">
        <img src={logo} alt="ScreenVault Logo" className="logo" />
      </Link>
      <h2 className="welcome">
        Welcome to the internet's most valuable entertaiment vault!
      </h2>
    </div>
  );
}
