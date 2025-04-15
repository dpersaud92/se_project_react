import { useEffect, useState, useRef } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnit";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Avatar from "../../assets/headerAvatar.svg";
import Profile from "../Profile/Profile";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState(() => {
    const saved = localStorage.getItem("clothingItems");
    return saved ? JSON.parse(saved) : [];
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [formValues, setFormValues] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem("clothingItems", JSON.stringify(clothingItems));
  }, [clothingItems]);

  const openConfirmationModal = (card) => {
    setCardToDelete(card);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setClothingItems((prevItems) =>
      prevItems.filter((item) => item._id !== cardToDelete._id)
    );
    setIsConfirmModalOpen(false);
    setActiveModal("");
    setSelectedCard({});
    setCardToDelete(null);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const modalWithFormRef = useRef(null);
  const itemModalRef = useRef(null);

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

  function handleAddItemSubmit(newItem) {
    console.log("New item weather:", newItem.weather);
    console.log("Current weather type:", weatherData.type);

    const itemWithId = {
      ...newItem,
      _id: Date.now().toString(),
    };

    setClothingItems([itemWithId, ...clothingItems]);
    setActiveModal("");
    setFormValues({ name: "", imageUrl: "", weather: "" }); // Reset form
  }

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleClickOutside = (e) => {
      if (
        activeModal === "add-garment" &&
        modalWithFormRef.current &&
        !modalWithFormRef.current.contains(e.target)
      ) {
        closeActiveModal();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModal]);

  const isFormValid =
    formValues.name.trim() && formValues.imageUrl.trim() && formValues.weather;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleWeatherChange = (e) => {
    setFormValues((prev) => ({ ...prev, weather: e.target.value }));
  };

  return (
    <Router>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header handleAddClick={handleAddClick} weatherData={weatherData} />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                    onAddClick={handleAddClick}
                  />
                }
              />
            </Routes>
          </div>

          {activeModal === "add-garment" && (
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onClose={closeActiveModal}
              onAddItem={handleAddItemSubmit}
              modalRef={modalWithFormRef}
              formValues={formValues}
              handleInputChange={handleInputChange}
              handleWeatherChange={handleWeatherChange}
            />
          )}

          {activeModal === "preview" && (
            <ItemModal
              ref={itemModalRef}
              activeModal={activeModal}
              card={selectedCard}
              onClose={closeActiveModal}
              handleDelete={openConfirmationModal}
            />
          )}
          {isConfirmModalOpen && (
            <DeleteConfirmationModal
              isOpen={isConfirmModalOpen}
              onClose={() => setIsConfirmModalOpen(false)}
              onConfirmDelete={handleConfirmDelete}
            />
          )}
          <Footer />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </Router>
  );
}

export default App;
