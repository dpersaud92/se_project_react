import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import WeatherContext from "../../contexts/currentTemperatureUnit";
import WeatherCard from "../WeatherCard/WeatherCard";

function ClothesSection() {
  const weatherData = useContext(WeatherContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__add-item">
        <p>Your Items</p>
        <button className="clothes-section__button">+ Add New</button>
      </div>
      <ul className="cards__list">
        {defaultClothingItems
          .filter((item) => item.weather && item.weather === weatherData.type)
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                // TODO - pass as prop
                // onCardClick={handleCardClick}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
