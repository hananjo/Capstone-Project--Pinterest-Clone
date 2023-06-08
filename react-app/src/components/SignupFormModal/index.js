import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    const validationErrors = [];
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      } else {
        closeModal();
      }
    } else {
      validationErrors.push(
        "Confirm Password field must be the same as the Password field"
      );
    }
    // else {
    //   setErrors([
    //     "Confirm Password field must be the same as the Password field",
    //   ]);
    // }
    if (!email.includes("@" && ".")) {
      validationErrors.push("Need a valid email address");
    }
    setErrors(validationErrors);
  };

  return (
    <>
      <div className="sign-up-container">
        <div className="sign-up-title">
          <h1>Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <ul className="signup-errors">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="sign-up-inputs-container">
            <label className="sign-up-inputs">
              {/* Email */}
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Email</label>
            </label>
            <label className="sign-up-inputs">
              {/* Username */}
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label>Username</label>
            </label>
            <label className="sign-up-inputs">
              {/* Password */}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>Password</label>
            </label>
            <label className="sign-up-inputs">
              {/* Confirm Password */}
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <label>Confirm Password</label>
            </label>

            <button className="sign-up-form-button" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;
