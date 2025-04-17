import { useEffect, useState, useRef } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import { getItems, addItem, deleteItem } from "../../utils/API";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState([]);

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

  const openConfirmationModal = (card) => {
    setCardToDelete(card);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = () => {
    const id = cardToDelete?._id ?? cardToDelete?.id;
    if (id === undefined || id === null) return;

    deleteItem(id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => (item._id ?? item.id) !== id)
        );

        setActiveModal("");
        setIsConfirmModalOpen(false);
        setSelectedCard({});
        setCardToDelete(null);
      })
      .catch(console.error);
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
    setFormValues({ name: "", imageUrl: "", weather: "" });
  };

  function handleAddItemSubmit(newItem) {
    addItem(newItem)
      .then((addedItem) => {
        setClothingItems((prev) => [addedItem, ...prev]);
        setActiveModal("");
        setFormValues({ name: "", imageUrl: "", weather: "" });
      })
      .catch(console.error);
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
    getItems()
      .then((items) => {
        if (items.length === 0) {
          Promise.all(defaultClothingItems.map((item) => addItem(item)))
            .then((seededItems) => {
              setClothingItems(seededItems);
            })
            .catch(console.error);
        } else {
          setClothingItems(items);
        }
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
                  handleAddClick={handleAddClick}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
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
  );
}

export default App;
