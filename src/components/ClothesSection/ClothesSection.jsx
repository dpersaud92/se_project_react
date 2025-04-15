import "./ClothesSection.css";

import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  handleAddClick,
  onCardClick,
  defaultItems,
  newItems,
}) {
  const allItems = [...defaultItems, ...newItems];

  return (
    <div className="clothes-section">
      <div className="clothes-section__add-item">
        <p>Your Items</p>
        <button
          className="clothes-section__button"
          onClick={handleAddClick}
          type="button"
        >
          + Add New
        </button>
      </div>
      <ul className="cards__list">
        {allItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
