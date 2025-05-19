import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemModal.css";
import CloseWhite from "../../assets/closewhite.svg";
import CloseBlack from "../../assets/close.svg";

export default function ItemModal({ selectedCard, onClose, onDelete }) {
  const currentUser = useContext(CurrentUserContext);

  if (!selectedCard) return null;

  const isOwn = selectedCard?.owner === currentUser._id;
  const isDarkBackground = true;

  const closeIcon = isDarkBackground ? CloseWhite : CloseBlack;

  return (
    <div className="modal modal_type_preview modal_opened" onClick={onClose}>
      <div
        className="modal__content modal__content_type_image"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal__close-preview modal__close-button_dark"
          onClick={onClose}
        >
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>
        <img
          className="modal__image"
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
        />
        <div className="modal__footer">
          <div className="modal__info">
            <p className="modal__caption">{selectedCard.name}</p>
            <p className="modal__weather">Weather: {selectedCard.weather}</p>
          </div>
          {isOwn && (
            <button
              className="modal__delete"
              onClick={() => onDelete(selectedCard)}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
