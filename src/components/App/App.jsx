import { useEffect, useState, useRef } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [formValues, setFormValues] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const modalRef = useRef(null);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    const handleClickOutside = (e) => {
      if (activeModal && modalRef.current && modalRef.current === e.target) {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mouseup", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeModal]);

  const isFormValid =
    formValues.name && formValues.imageUrl && formValues.weather;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleWeatherChange = (e) => {
    setFormValues((prev) => ({ ...prev, weather: e.target.value }));
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      </div>

      {activeModal === "add-garment" && (
        <ModalWithForm
          ref={modalRef}
          title="New garment"
          buttonText="Add garment"
          activeModal={activeModal}
          onClose={closeActiveModal}
          onInputChange={handleInputChange}
          onWeatherChange={handleWeatherChange}
          isSubmitDisabled={!isFormValid}
        />
      )}

      {activeModal === "preview" && (
        <ItemModal
          ref={modalRef}
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
