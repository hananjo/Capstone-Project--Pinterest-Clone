import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import "./Navigation.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      {/* <button > */}
      <div className="profile-icon">
        <img
          // className="profile-button"
          style={{ width: "40px" }}
          onClick={openMenu}
          src="https://res.cloudinary.com/dwphwqyrn/image/upload/v1685590785/profile-icon_ozzohk.png"
        />
        {/* <i className="fas fa-user-circle" /> */}
      </div>
      {/* </button> */}
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="logout-container">
              <NavLink to={`/${user}/boards`}>
                <img
                  style={{
                    clipPath: "circle(41%)",
                    width: "40px",
                  }}
                  src="https://res.cloudinary.com/dwphwqyrn/image/upload/v1685589422/16147095-2CE2-4AA6-AA9E-D2F1B47D7CE6_qpx5kd.png"
                />
              </NavLink>
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li>
                <button className="logout-button" onClick={handleLogout}>
                  Log Out
                </button>
              </li>
            </div>
          </>
        ) : (
          <>
            <div className="login-signup-container">
              <OpenModalButton
                className="login-button"
                buttonText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />

              <OpenModalButton
                className="signup-button"
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
