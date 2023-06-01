import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPins } from "../../store/search";
function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state?.session?.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");

  const user = useSelector((state) => {
    return state?.session?.user?.id;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchPins(keyword));
    history.push("/search");
    // closeModal();
  };
  return (
    <div className="nav-bar">
      <ul>
        <div className="nav-bar-icons">
          <li>
            <NavLink exact to="/">
              <img
                className="home-button"
                style={{ width: "75px" }}
                src="https://res.cloudinary.com/dwphwqyrn/image/upload/v1685556617/pinterest_logo_vcvw9i.png"
              />
            </NavLink>
          </li>

          <li>
            {" "}
            <div className="search-section">
              <form onSubmit={handleSubmit}>
                <div className="search-container">
                  <div className="search-input">
                    <input
                      type="text"
                      value={keyword}
                      placeholder="Search pins"
                      onChange={(e) => setKeyword(e.target.value)}
                      className="search-bar"
                    ></input>
                  </div>
                  <div className="search-button">
                    <button>Search</button>
                  </div>
                </div>
              </form>
            </div>
          </li>
          <li>
            {sessionUser && user ? (
              <div>
                <NavLink to={`/${user}/boards`}>Profile</NavLink>
              </div>
            ) : (
              <br />
            )}
          </li>
          {isLoaded && (
            <div className="profile-button">
              <li>
                <ProfileButton user={sessionUser} />
              </li>
            </div>
          )}
        </div>
      </ul>
    </div>
  );
}

export default Navigation;
