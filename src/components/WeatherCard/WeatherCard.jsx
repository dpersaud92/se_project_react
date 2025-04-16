import "./WeatherCard.css";
import dayclear from "../../assets/dayclear.svg";
import daycloudy from "../../assets/daycouldy.png";
import dayfog from "../../assets/dayfog.png";
import dayrain from "../../assets/dayrain.png";
import daysnow from "../../assets/daysnow.png";
import daystorm from "../../assets/daystorm.png";
import nightclear from "../../assets/nightclear.png";
import nightcloudy from "../../assets/nightcloudy.png";
import nightfog from "../../assets/nightfog.png";
import nightrain from "../../assets/nightrain.png";
import nightsnow from "../../assets/nightsnow.png";
import nightstorm from "../../assets/nightstorm.png";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const weatherIcons = {
  dayclear,
  daycloudy,
  dayfog,
  dayrain,
  daysnow,
  daystorm,
  nightclear,
  nightcloudy,
  nightfog,
  nightrain,
  nightsnow,
  nightstorm,
};

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const iconKey = weatherData.icon;
  const icon = weatherIcons[iconKey];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {currentTemperatureUnit === "F"
          ? weatherData.temp.F
          : weatherData.temp.C}
        &deg; {currentTemperatureUnit}
      </p>
      <img src={icon} alt={iconKey} className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
