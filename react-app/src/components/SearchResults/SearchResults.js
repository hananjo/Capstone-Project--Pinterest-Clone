import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";

import AddToBoardOptionsModal from "../AddToBoardOptionsModal/AddToBoardOptionsModal";
import SearchBar from "../SearchBar/SearchBar";
import "./SearchResults.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
const SearchResults = () => {
  const [showModal, setShowModal] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  // const { setModalContent } = useModal();
  const pins = useSelector((state) => {
    return Object.values(state?.searches);
  });

  const user = useSelector((state) => {
    return state?.session?.user?.id;
  });
  // const openModal = () => {
  //   setShowModal(true);
  // };

  // const handleSearch = () => {
  //   setModalContent(<SearchBar />);
  //   openModal();
  // };
  const { setModalContent } = useModal();
  const sessionUser = useSelector((state) => {
    return state?.session?.user;
  });

  const openModal = () => {
    setShowModal(true);
  };

  const handlePinClick = (pin) => {
    console.log(pin, "pin selected button *****");
    setModalContent(<AddToBoardOptionsModal pin={pin} user={user} />);
    openModal();
  };

  return (
    <div>
      {" "}
      {pins.length ? (
        <div className="pins-container">
          <div>
            {pins?.map((pin) => {
              return (
                <div className="pins">
                  {sessionUser ? (
                    <div className="pin-to-board">
                      <button
                        className="pin-to-board-button"
                        onClick={() => handlePinClick(pin)}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <br />
                  )}
                  <div className="grid-wrapper">
                    <div>
                      <NavLink to={`/pins/${pin.id}`}>
                        <div className="pin-photos">
                          <img
                            className="pin-images"
                            src={pin?.images[0]?.image_url}
                          />
                        </div>
                        <div className="pin-name-landing-page">{pin?.name}</div>
                      </NavLink>
                    </div>
                  </div>
                </div>
              );
            })}
            <div style={{ color: "white" }}>;</div>
          </div>
        </div>
      ) : (
        <div className="search-handle-error-container">
          <div className="search-handle-error">
            No pins were associated with that keyword
          </div>
        </div>
      )}
      {/* <button onClick={() => handleSearch()}>Search</button> */}
    </div>
  );
};

export default SearchResults;
