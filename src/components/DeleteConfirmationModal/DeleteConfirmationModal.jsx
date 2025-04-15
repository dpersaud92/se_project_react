import React from "react";
import "./DeleteConfirmationModal.css";

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirmDelete,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal modal_opened">
      <div className="modal__content modal__content_type_confirm">
        <button onClick={onClose} type="button" className="modal__close">
          ×
        </button>
        <h3 className="modal__title">
          Are you sure you want to delete this item?
        </h3>
        <div className="modal__actions">
          <button className="modal__button" onClick={onConfirmDelete}>
            Yes, delete
          </button>
          <button
            className="modal__button modal__button_type_cancel"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
