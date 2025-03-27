// import { useEffect, useState, useRef } from "react";
// import "./App.css";
// import { coordinates, APIkey } from "../../utils/constants";
// import Header from "../Header/Header";
// import Main from "../Main/Main";
// import Footer from "../Footer/Footer";
// import ModalWithForm from "../ModalWithForm/ModalWithForm";
// import ItemModal from "../ItemModal/ItemModal";
// import { filterWeatherData, getWeather } from "../../utils/weatherApi";

// function App() {
//   const [weatherData, setWeatherData] = useState({
//     type: "",
//     temp: { F: 999 },
//     city: "",
//   });
//   const [activeModal, setActiveModal] = useState("");
//   const [selectedCard, setSelectedCard] = useState({});

//   const modalRef = useRef(null);

//   const handleCardClick = (card) => {
//     setActiveModal("preview");
//     setSelectedCard(card);
//   };

//   const handleAddClick = () => {
//     setActiveModal("add-garment");
//   };

//   const closeActiveModal = () => {
//     setActiveModal("");
//   };

//   useEffect(() => {
//     getWeather(coordinates, APIkey)
//       .then((data) => {
//         const filteredData = filterWeatherData(data);
//         setWeatherData(filteredData);
//       })
//       .catch(console.error);
//   }, []);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "Escape") {
//         closeActiveModal();
//       }
//     };

//     const handleClickOutside = (e) => {
//       if (
//         activeModal &&
//         modalRef.current &&
//         !modalRef.current.contains(e.target)
//       ) {
//         closeActiveModal();
//       }
//     };

//     document.addEventListener("keydown", handleKeyDown);
//     document.addEventListener("mouseup", handleClickOutside);

//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//       document.addEventListener("mouseup", handleClickOutside);
//     };
//   }, [activeModal]);

//   const [formValues, setFormValues] = useState({
//     name: "",
//     imageUrl: "",
//     weather: "",
//   });

//   const isFormValid =
//     formValues.name && formValues.imageUrl && formValues.weather;

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormValues((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleWeatherChange = (e) => {
//     setFormValues((prev) => ({ ...prev, weather: e.target.value }));
//   };

//   return (
//     <div className="page">
//       <div className="page__content">
//         <Header handleAddClick={handleAddClick} weatherData={weatherData} />
//         <Main weatherData={weatherData} handleCardClick={handleCardClick} />
//         <Footer />
//       </div>
//       <ModalWithForm
//         ref={modalRef}
//         title="New garment"
//         buttonText="Add garment"
//         activeModal={activeModal}
//         onClose={closeActiveModal}
//         onInputChange={handleInputChange}
//         onWeatherChange={handleWeatherChange}
//         isSubmitDisabled={!isFormValid}
//       >
//         <label htmlFor="name" className="modal__label">
//           Name{" "}
//           <input
//             type="text"
//             className="modal__input"
//             id="name"
//             placeholder="Name"
//           />
//         </label>
//         <label htmlFor="imageUrl" className="modal__label">
//           Image{" "}
//           <input
//             type="url"
//             className="modal__input"
//             id="imageUrl"
//             placeholder="Image URL"
//           />
//         </label>
//         <fieldset className="modal__radio-buttons">
//           <legend className="modal__legend">Select the weather type:</legend>

//           <label htmlFor="hot" className="modal__label modal__label_type_radio">
//             <input
//               type="radio"
//               className="modal__radio-input"
//               id="hot"
//               name="weather"
//               value="hot"
//             />
//             Hot
//           </label>

//           <label
//             htmlFor="warm"
//             className="modal__label modal__label_type_radio"
//           >
//             <input
//               type="radio"
//               className="modal__radio-input"
//               id="warm"
//               name="weather"
//               value="warm"
//             />
//             Warm
//           </label>

//           <label
//             htmlFor="cold"
//             className="modal__label modal__label_type_radio"
//           >
//             <input
//               type="radio"
//               className="modal__radio-input"
//               id="cold"
//               name="weather"
//               value="cold"
//             />
//             Cold
//           </label>
//         </fieldset>
//       </ModalWithForm>
//       <ItemModal
//         ref={modalRef}
//         activeModal={activeModal}
//         card={selectedCard}
//         onClose={closeActiveModal}
//       />
//     </div>
//   );
// }

// export default App;

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
        <Footer />
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
    </div>
  );
}

export default App;
