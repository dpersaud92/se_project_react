import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, onRegister, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submit clicked:", { email, password, name, avatar }); // ✅

    if (!email || !password || !name || !avatar) {
      setError("All fields are required.");
      return;
    }

    setError("");
    onRegister({ email, password, name, avatar });
  };

  const isFormInvalid = !email || !password || !name || !avatar;

  return (
    <ModalWithForm
      title="Sign Up"
      name="register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email*
        <input
          type="email"
          name="email"
          className="modal__input"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </label>

      <label className="modal__label">
        Password*
        <input
          type="password"
          name="password"
          className="modal__input"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </label>

      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          name="avatar"
          className="modal__input"
          required
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="Avatar URL"
        />
      </label>

      {error && <span className="modal__error">{error}</span>}

      <div className="modal__switch-wrapper">
        <button
          type="submit"
          className="modal__submit"
          disabled={isFormInvalid}
        >
          Next
        </button>
        <span className="modal__or">or</span>
        <button
          type="button"
          onClick={onSwitch}
          className="modal__switch-button"
        >
          Log In
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
