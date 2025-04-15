import "./ItemModal.css";
import close from "../../assets/close.svg";
import React, { forwardRef, useRef } from "react";

const ItemModal = forwardRef(
  ({ activeModal, onClose, card, handleDelete }, ref) => {
    const modalContentRef = useRef(null);

    const handleOverlayClick = (e) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(e.target)
      ) {
        onClose();
      }
    };

    return (
      <div
        ref={ref}
        className={`modal ${activeModal === "preview" && "modal_opened"}`}
        onMouseDown={handleOverlayClick} // Close modal when clicking on the background
      >
        {activeModal === "preview" && (
          <div
            ref={modalContentRef}
            className="modal__content modal__content_type_image"
          >
            <button onClick={onClose} type="button" className="modal__close">
              <img src={close} alt="close" />
            </button>
            <img
              src={card.link}
              alt={card.name || ""}
              className="modal__image"
            />
            <div className="modal__footer">
              <h2 className="modal__caption">{card.name}</h2>
              <p className="modal__weather">Weather: {card.weather}</p>
            </div>
            <button
              className="modal__delete"
              type="button"
              onClick={() => handleDelete(card)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  }
);

export default ItemModal;
