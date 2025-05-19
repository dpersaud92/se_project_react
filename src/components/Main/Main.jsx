import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function Main({
  weatherData,
  handleCardClick,
  handleCardLike,
  clothingItems,
  isLoggedIn,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {currentTemperatureUnit === "F"
            ? weatherData.temp.F
            : weatherData.temp.C}
          &deg; {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => item.weather && item.weather === weatherData.type)
            .map((item) => {
              return (
                <ItemCard
                  key={item._id ?? item.id}
                  item={item}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  isLoggedIn={isLoggedIn}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
