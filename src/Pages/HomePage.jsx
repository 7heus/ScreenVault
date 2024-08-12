import logo from "../assets/screenvault-logo.png";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <Link to="/catalog">
        <img src={logo} alt="ScreenVault Logo" />
      </Link>
      <h3>Welcome the internet's most valuable entertaiment vault!</h3>
    </div>
  );
}
