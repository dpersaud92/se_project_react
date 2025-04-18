import "./ItemModal.css";
import close from "../../assets/close.svg";
import closewhite from "../../assets/closewhite.svg";
import React, { forwardRef, useRef } from "react";
import useModalClose from "../../Hooks/useModalClose";

const ItemModal = forwardRef((props, ref) => {
  const { activeModal, onClose, card, handleDelete } = props;
  const modalContentRef = useRef(null);

  useModalClose(activeModal === "preview", onClose);

  const isLightImage = card?.isLight;

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
      className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}
      onMouseDown={handleOverlayClick}
    >
      {activeModal === "preview" && (
        <div
          ref={modalContentRef}
          className="modal__content modal__content_type_image"
        >
          <button
            onClick={onClose}
            type="button"
            className="modal__close-preview"
          >
            <img
              src={isLightImage ? close : closewhite}
              alt="close"
              className="modal__close-icon"
            />
          </button>

          <img
            src={card.imageUrl || card.link}
            alt={card.name}
            className="modal__image"
          />
          <div className="modal__footer">
            <div className="modal__info">
              <h2 className="modal__caption">{card.name}</h2>
              <p className="modal__weather">Weather: {card.weather}</p>
            </div>
            <button
              className="modal__delete"
              type="button"
              onClick={() => handleDelete(card)}
            >
              Delete item
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default ItemModal;
