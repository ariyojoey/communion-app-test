import { Link } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  return (
    <header>
      <nav className="container">
        <Link to="/" className="logo">Communion App</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
