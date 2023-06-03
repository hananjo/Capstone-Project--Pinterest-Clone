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
                      value={keyword}
                      placeholder="Search pins"
                      onChange={(e) => setKeyword(e.target.value)}
                      className="search-bar"
                    ></input>
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
            {sessionUser && user ? (
              <div className="user-icon">
                <NavLink to={`/${user}/boards`}>
                  <img
                    style={{
                      clipPath: "circle(41%)",
                      width: "40px",
                    }}
                    src="https://res.cloudinary.com/dwphwqyrn/image/upload/v1685589422/16147095-2CE2-4AA6-AA9E-D2F1B47D7CE6_qpx5kd.png"
                  />
                </NavLink>
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
