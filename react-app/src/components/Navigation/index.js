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
                    <img
                      style={{
                        width: "20px",
                        marginLeft: "20px",
                        marginTop: "10px",
                      }}
                      src="https://res.cloudinary.com/dwphwqyrn/image/upload/v1685578694/search_icon_mqwhqc.png"
                    />

                    <input
                      type="text"
                      required
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      className="search-bar"
                    />
                    <label>Search pins</label>
                    <div className="cancel-search">
                      <img
                        style={{ width: "20px" }}
                        onClick={() => setKeyword("")}
                        src={
                          "https://res.cloudinary.com/dwphwqyrn/image/upload/v1686113741/cancel_button_pvzadp.png"
                        }
                      />
                    </div>
                  </div>
                  <div className="search-button">
                    <button
                      className="search-button-2"
                      disabled={keyword === ""}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>

          <li>

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
