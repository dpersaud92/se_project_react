import "./ModalWithForm.css";
import close from "../../assets/close.svg";
import React, { forwardRef } from "react";

const ModalWithForm = forwardRef(
  (
    {
      children,
      buttonText,
      title,
      isOpen,
      onClose,
      onSubmit,
      isSubmitDisabled,
    },
    ref
  ) => {
    return (
      <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
        <div ref={ref} className="modal__content">
          <h2 className="modal__title">{title}</h2>
          <button onClick={onClose} type="button" className="modal__close">
            <img src={close} alt="close" />
          </button>
          <form className="modal__form" onSubmit={onSubmit}>
            {children}
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
