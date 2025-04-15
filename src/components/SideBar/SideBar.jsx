import "./SideBar.css";
import Avatar from "../../assets/headerAvatar.svg";

export default function SideBar() {
  return (
    <div className="sidebar">
      <img src={Avatar} alt="User avatar" className="sidebar__avatar" />
      <h2 className="sidebar__username">John Doe</h2>
    </div>
  );
}
