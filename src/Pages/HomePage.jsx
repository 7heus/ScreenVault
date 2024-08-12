import logo from "..assets/screenvault-logo.png";

export default function HomePage() {
  return (
    <div>
      <Link to="/Catalog">
        <img src={logo} alt="ScreenVault Logo" />
      </Link>
      <h3>Welcome the internet's most valuable entertaiment vault!</h3>
    </div>
  );
}
