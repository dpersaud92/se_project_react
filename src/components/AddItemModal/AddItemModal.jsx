import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItem,
  modalRef,
  formValues,
  handleInputChange,
  handleWeatherChange,
}) {
  if (!isOpen) return null;

  const isFormValid =
    formValues.name.trim() && formValues.imageUrl.trim() && formValues.weather;

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem({
      name: formValues.name,
      imageUrl: formValues.imageUrl,
      weather: formValues.weather,
    });
  }

  return (
    <ModalWithForm
      ref={modalRef}
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      isSubmitDisabled={!isFormValid}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleInputChange}
          value={formValues.name}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          required
          onChange={handleInputChange}
          value={formValues.imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
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
              onChange={handleWeatherChange}
              checked={formValues.weather === type}
            />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
      </fieldset>
    </ModalWithForm>
  );
}
