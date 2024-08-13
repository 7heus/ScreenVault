import textLogo from "../assets/screenvault-text.png";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="Footer">
      <a
        className="GitHubRepo"
        href="https://github.com/7heus/ScreenVault"
        img={""}
        src={textLogo}
        alt="text-logo"
      >GitHub</a>
    </footer>
  );
}
