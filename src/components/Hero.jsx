import { Link } from "react-router-dom";
import "../styles/hero.css";

const Hero = () => {
  return (
    <div className="hero">
      <h1>Connecting People Across Faiths & Interests</h1>
      <p>Connecting people of all faiths through events and community support.</p>
      <Link to="/events">
        <button className="button hero-btn">Explore Events</button>
      </Link>
    </div>
  );
};

export default Hero;
