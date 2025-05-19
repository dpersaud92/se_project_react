import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onEditProfileClick, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        <img
          src={currentUser.avatar}
          alt="User avatar"
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__edit-info">
        <button className="sidebar__button" onClick={onEditProfileClick}>
          Change profile data
        </button>
        <button className="sidebar__button" onClick={onSignOut}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
