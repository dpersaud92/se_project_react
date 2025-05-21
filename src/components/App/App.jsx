import { useEffect, useState, useRef } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
  updateUser,
} from "../../utils/API";
import ProtectedRoute from "../ProtectedRoute";
import { checkToken } from "../../utils/auth";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { register, login } from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const navigate = useNavigate();

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [formValues, setFormValues] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState({});

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  const resetForm = () => {
    setFormValues({
      name: "",
      imageUrl: "",
      weather: "",
    });
  };

  const openConfirmationModal = (card) => {
    setCardToDelete(card);
    setIsConfirmModalOpen(true);
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    updateUser({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser({ ...updatedUser });
        setIsEditProfileModalOpen(false);
      })
      .catch(console.error);
  };

  const handleConfirmDelete = () => {
    const id = cardToDelete?._id ?? cardToDelete?.id;
    if (id === undefined || id === null) return;

    const token = localStorage.getItem("jwt");

    deleteItem(id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => (item._id ?? item.id) !== id)
        );

        closeActiveModal();
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
  };

  function handleAddItemSubmit({ name, weather, imageUrl }) {
    const token = localStorage.getItem("jwt");

    fetch("http://localhost:3001/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, weather, imageUrl }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(`Server error ${res.status}: ${text}`);
          });
        }
        return res.json();
      })
      .then((addedItem) => {
        setClothingItems((prev) => [addedItem, ...prev]);
        resetForm(); // ✅ reset after submit
        closeActiveModal();
      })
      .catch(console.error);
  }

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          setIsLoggedIn(true);
          setCurrentUser(userData);
        })
        .catch(() => setIsLoggedIn(false))
        .finally(() => setIsAuthChecked(true));
    } else {
      setIsAuthChecked(true);
    }
  }, []);

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

  const handleLogin = ({ email, password }) => {
    login({ email, password })
      .then(({ token }) => {
        localStorage.setItem("jwt", token);
        return checkToken(token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((err) => console.error("Login failed", err));
  };

  const handleRegister = ({ email, password, name, avatar }) => {
    register({ email, password, name, avatar })
      .then(() => {
        handleLogin({ email, password });
      })
      .catch((err) => {
        console.error("Registration failed:", err.message);
        alert(err.message); // TEMP: for visibility, replace with UI error later
      });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleWeatherChange = (e) => {
    setFormValues((prev) => ({ ...prev, weather: e.target.value }));
  };

  function handleCardLike({ id, isLiked }) {
    const token = localStorage.getItem("jwt");
    const likeAction = isLiked ? removeCardLike : addCardLike;

    likeAction(id, token)
      .then((updatedItem) => {
        setClothingItems((prevItems) =>
          prevItems.map((item) =>
            item._id === updatedItem._id ? updatedItem : item
          )
        );
      })
      .catch((err) => {
        console.error("Error updating like:", err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              userCity={weatherData.city}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              onLoginClick={() => setActiveModal("login")}
              onRegisterClick={() => setActiveModal("register")}
              onSignOut={() => {
                localStorage.removeItem("jwt");
                setIsLoggedIn(false);
                setCurrentUser({});
                setActiveModal("");
                navigate("/");
              }}
            />
            <EditProfileModal
              isOpen={isEditProfileModalOpen}
              onClose={() => setIsEditProfileModalOpen(false)}
              onUpdateUser={handleUpdateUser}
            />
            {activeModal === "login" && (
              <LoginModal
                isOpen
                onClose={closeActiveModal}
                onLogin={handleLogin}
                onSwitch={() => setActiveModal("register")}
              />
            )}

            {activeModal === "register" && (
              <RegisterModal
                isOpen={activeModal === "register"}
                onClose={closeActiveModal}
                onRegister={handleRegister}
                onSwitch={() => setActiveModal("login")}
              />
            )}

            {isAuthChecked && (
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      handleCardLike={handleCardLike}
                      isLoggedIn={isLoggedIn}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute
                      isLoggedIn={isLoggedIn}
                      element={(props) => (
                        <Profile
                          {...props}
                          isLoggedIn={isLoggedIn}
                          clothingItems={clothingItems}
                          onCardClick={handleCardClick}
                          onCardLike={handleCardLike}
                          onEditProfileClick={() =>
                            setIsEditProfileModalOpen(true)
                          }
                          handleAddClick={handleAddClick}
                          onSignOut={() => {
                            localStorage.removeItem("jwt");
                            setIsLoggedIn(false);
                            setCurrentUser({});
                            setActiveModal("");
                            navigate("/");
                          }}
                        />
                      )}
                    />
                  }
                />
              </Routes>
            )}
          </div>

          {activeModal === "add-garment" && (
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onClose={() => {
                resetForm();
                closeActiveModal();
              }}
              onAddItem={handleAddItemSubmit}
              modalRef={modalWithFormRef}
              formValues={formValues}
              handleInputChange={handleInputChange}
              handleWeatherChange={handleWeatherChange}
            />
          )}

          {activeModal === "preview" && (
            <ItemModal
              selectedCard={selectedCard}
              onClose={closeActiveModal}
              onDelete={openConfirmationModal}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
