import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "../../assets/headerLogo.svg";
import Clothes from "../../assets/addClothes.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  userCity,
  isLoggedIn,
  onLoginClick,
  onRegisterClick,
  onSignOut,
}) {
  const currentUser = useContext(CurrentUserContext);
  const avatarLetter = currentUser?.name?.charAt(0).toUpperCase();

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img className="header__logo" src={Logo} alt="logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {userCity}
        </p>
      </div>

      <div className="header__actions">
        <ToggleSwitch />
        {isLoggedIn && (
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            <img src={Clothes} alt="Add clothes" />
          </button>
        )}
      </div>

      {isLoggedIn ? (
        <div className="header__user-container">
          <Link to="/profile" className="header__link">
            <p className="header__username">{currentUser.name}</p>
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt="user avatar"
                className="header__avatar"
              />
            ) : (
              <div className="header__avatar-placeholder">{avatarLetter}</div>
            )}
          </Link>
        </div>
      ) : (
        <div className="header__buttons">
          <button className="header__button-register" onClick={onRegisterClick}>
            Sign Up
          </button>
          <button className="header__button-login" onClick={onLoginClick}>
            Log in
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
