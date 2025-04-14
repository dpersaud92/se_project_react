export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const filterWeatherData = (data) => {
  const result = {};
  const tempF = data.main.temp;

  result.city = data.name;
  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  result.type = getWeatherType(tempF);

  const isDay = data.dt >= data.sys.sunrise && data.dt <= data.sys.sunset;
  const condition = data.weather[0].main.toLowerCase();

  if (condition.includes("cloud")) {
    result.icon = isDay ? "daycloudy" : "nightcloudy";
  } else if (condition.includes("rain")) {
    result.icon = isDay ? "dayrain" : "nightrain";
  } else if (condition.includes("snow")) {
    result.icon = isDay ? "daysnow" : "nightsnow";
  } else if (condition.includes("fog") || condition.includes("mist")) {
    result.icon = isDay ? "dayfog" : "nightfog";
  } else if (condition.includes("storm") || condition.includes("thunder")) {
    result.icon = isDay ? "daystorm" : "nightstorm";
  } else if (condition.includes("clear")) {
    result.icon = isDay ? "daycloudy" : "nightclear";
  } else {
    result.icon = isDay ? "daycloudy" : "nightcloudy"; // fallback
  }

  return result;
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else {
    return "cold";
  }
};
