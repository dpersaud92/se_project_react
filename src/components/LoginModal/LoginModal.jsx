import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onLogin, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setError("");
    onLogin({ email, password });
  };

  const isFormInvalid = !email || !password;

  return (
    <ModalWithForm
      title="Log In"
      name="login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email*
        <input
          type="email"
          name="email"
          required
          className="modal__input"
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
          required
          className="modal__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </label>

      {error && <span className="modal__error">{error}</span>}

      <div className="modal__switch-wrapper">
        <button
          type="submit"
          className="modal__submit"
          disabled={isFormInvalid}
        >
          Log In
        </button>
        <span className="modal__or">or</span>
        <button
          type="button"
          onClick={onSwitch}
          className="modal__switch-button"
        >
          Register
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
