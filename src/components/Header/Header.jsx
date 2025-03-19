import "./Header.css";
import Logo from "../../assets/headerLogo.svg";
import Avatar from "../../assets/headerAvatar.svg";
import Clothes from "../../assets/addClothes.svg";

function Header() {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img className="header__logo" src={Logo} alt="logo" />
      <p className="header__date-and-location">{currentDate}, LOCATION</p>
      <button className="header__add-clothes-btn">
        <img src={Clothes} alt="clothes image" />
      </button>
      <div className="header__user-container">
        <p className="header__username">Brian O'Conner</p>
        <img src={Avatar} alt="user avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
