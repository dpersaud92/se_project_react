import "./ModalWithForm.css";
import close from "../../assets/close.svg";
import React, { forwardRef } from "react";

const ModalWithForm = forwardRef(
  (
    {
      children,
      buttonText,
      title,
      activeModal,
      onClose,
      onInputChange,
      onWeatherChange,
      isSubmitDisabled,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`modal ${activeModal === "add-garment" && "modal_opened"}`}
      >
        <div className="modal__content">
          <h2 className="modal__title">{title}</h2>
          <button onClick={onClose} type="button" className="modal__close">
            <img src={close} alt="close" />
          </button>
          <form className="modal__form">
            <label htmlFor="name" className="modal__label">
              Name
              <input
                type="text"
                className="modal__input"
                id="name"
                placeholder="Name"
                onChange={onInputChange}
              />
            </label>
            <label htmlFor="imageUrl" className="modal__label">
              Image
              <input
                type="url"
                className="modal__input"
                id="imageUrl"
                placeholder="Image URL"
                onChange={onInputChange}
              />
            </label>
            <fieldset className="modal__radio-buttons">
              <legend className="modal__legend">
                Select the weather type:
              </legend>
              {["hot", "warm", "cold"].map((type) => (
                <label
                  key={type}
                  htmlFor={type}
                  className="modal__legend modal__legend_type_radio"
                >
                  <input
                    type="radio"
                    className="modal__radio-input"
                    id={type}
                    name="weather"
                    value={type}
                    onChange={onWeatherChange}
                  />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              ))}
            </fieldset>
            <button
              type="submit"
              className="modal__submit"
              disabled={isSubmitDisabled}
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    );
  }
);

export default ModalWithForm;
