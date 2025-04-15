import "./SideBar.css";
import avatar from "../../assets/headerAvatar.svg";

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
      <p className="sidebar__username">Dwayne Persaud</p>
    </div>
  );
}

export default SideBar;
