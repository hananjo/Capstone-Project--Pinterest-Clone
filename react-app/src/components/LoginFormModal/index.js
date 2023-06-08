import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleDemoLogin = (e) => {
    e.preventDefault();
    setEmail("demo@aa.io");
    setPassword("password");
    dispatch(login("demo@aa.io", "password"));
    closeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <div className="log-in-container">
        <div className="login-form-title">
          <h1>Log In</h1>
        </div>
        <form className="form-login" onSubmit={handleSubmit}>
          <ul className="login-errors">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="log-in-inputs">
            <label className="email-and-input">
              {/* Email */}
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Email</label>
            </label>
            <label className="password-and-input">
              {/* Password */}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>Password</label>
            </label>

            <button className="login-form-button" type="submit">
              Log In
            </button>
          </div>
          <a className="demo" href="#" onClick={handleDemoLogin}>
            Demo User
          </a>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
