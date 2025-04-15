import "./Header.css";
import Logo from "../../assets/headerLogo.svg";
import Avatar from "../../assets/headerAvatar.svg";
import Clothes from "../../assets/addClothes.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData, isFahrenheit, onToggleTemp }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        WTWR
      </Link>

      <Link to="/profile" className="header__profile">
        <img src={Avatar} alt="avatar" className="header__avatar" />
        <span className="header__username">John Doe</span>
      </Link>
    </header>
  );
}

export default Header;
