import "./AboutUs.css";
import GitHubImg from "../assets/GitHub.png";

export default function AboutUs() {
  return (
    <div className="AboutPage">
      <h1 className="">About Us</h1>
      <div className="Info">
        <div className="">
          <img
            src="https://ca.slack-edge.com/T01BAR6KJP4-U07866FMMUP-gc4092cfc557-512"
            alt="Carlos Carvalho Profile Pic"
            className="CarlosPic"
          />
          <h2 className="">Carlos Carvalho</h2>
          <p className=""></p>
          <a href="https://github.com/CarlosCwebdev"><img className="GitHubImg" src={GitHubImg} alt="GitHubProfile"/></a>
        </div>
        <div className="">
          <img
            src="https://ca.slack-edge.com/T01BAR6KJP4-U078E4D0LNS-3a5d983ff9d6-192"
            alt="David Profile Pic"
            className="DavidPic"
          />
          <h2 className="">David Mitreiro</h2>
          <p className=""></p>
          <a href="https://github.com/davemitreiro/"><img className="GitHubImg" src={GitHubImg} alt="GitHubProfile"/></a>
        </div>
        <div className="">
          <img
            src="https://ca.slack-edge.com/T01BAR6KJP4-U078P7JPCSY-a9155ad40165-512"
            alt="Matheus Almeida Profile Pic"
            className="MateusPic"
          />
          <h2 className="">Matheus Almeida</h2>
          <p className=""></p>
          <a href="https://github.com/7heus"><img className="GitHubImg" src={GitHubImg} alt="GitHubProfile"/></a>
        </div>
      </div>
      <div className="">
        <h2 className="aboutProject">Information about the project</h2>
        <p className=""></p>
      </div>
    </div>
  );
}
