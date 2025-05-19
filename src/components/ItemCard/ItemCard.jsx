import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./itemCard.css";
import LikeButton from "../../assets/Like.svg";
import FilledHeartIcon from "../../assets/FilledLike.svg";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.includes(currentUser._id);

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <div className="card">
      <div className="card__header">
        <p className="card__name">{item.name}</p>
        <button className={itemLikeButtonClassName} onClick={handleLike}>
          <div className="card__like">
            <img
              src={isLiked ? FilledHeartIcon : LikeButton}
              alt="like"
              className="card__like-icon"
            />
          </div>
        </button>
      </div>

      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={() => onCardClick(item)}
      />
    </div>
  );
}

export default ItemCard;
