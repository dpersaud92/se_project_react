import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main() {
  return (
    <main>
      <WeatherCard />
      <section className="cards">
        <p className="cards__text">
          Today is 75&deg; F / You may want to wear:
        </p>
      </section>
      <ItemCard />
    </main>
  );
}

export default Main;
