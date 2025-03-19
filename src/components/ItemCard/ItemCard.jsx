import "./ItemCard.css";
import Shirt from "../../assets/Shirt.svg";
import Shorts from "../../assets/Shorts.svg";
import Cap from "../../assets/Cap.svg";
import Sneakers from "../../assets/Sneakers.svg";

function ItemCard() {
  return (
    <div className="item__cards">
      <div className="item__cards-container">
        <p className="item__cards-name">T-Shirts</p>
        <img src={Shirt} alt="shirt" className="item__cards-image" />
      </div>
      <div className="item__cards-container">
        <p className="item__cards-name">Shorts</p>
        <img src={Shorts} alt="shorts" className="item__cards-image" />
      </div>
      <div className="item__cards-container">
        <p className="item__cards-name">Cap</p>
        <img src={Cap} alt="cap" className="item__cards-image" />
      </div>
      <div className="item__cards-container">
        <p className="item__cards-name">Sneakers</p>
        <img src={Sneakers} alt="sneakers" className="item__cards-image" />
      </div>
    </div>
  );
}

export default ItemCard;
