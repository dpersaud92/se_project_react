import "./ClothesSection.css";
import React, { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  clothingItems,
  onCardClick,
  onCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  return (
    <section className="clothes-section">
      <div className="clothes-section__items">
        {userItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            isLoggedIn={isLoggedIn}
            isDarkBackground={true}
          />
        ))}
      </div>
    </section>
  );
}

export default ClothesSection;
