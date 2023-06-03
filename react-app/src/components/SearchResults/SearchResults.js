import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import "./SearchResults.css";
const SearchResults = () => {
  // const [showModal, setShowModal] = useState(false);
  // const { setModalContent } = useModal();
  const pins = useSelector((state) => {
    return Object.values(state?.searches);
  });
  // const openModal = () => {
  //   setShowModal(true);
  // };

  // const handleSearch = () => {
  //   setModalContent(<SearchBar />);
  //   openModal();
  // };
  return (
    <div>
      {" "}
      {pins.length ? (
        <div className="pins-container">
          <div>
            {pins?.map((pin) => {
              return (
                <div className="pins">
                  <div className="grid-wrapper">
                    <div>
                      <div className="pin-photos">
                        <img
                          className="pin-images"
                          src={pin?.images[0]?.image_url}
                        />
                      </div>
                      <div className="pin-name-landing-page">{pin?.name}</div>
                    </div>
                  </div>
                </div>
              );
            })}
            ;
          </div>
        </div>
      ) : (
        <div className="search-handle-error">
          No pins were associated with that keyword
        </div>
      )}
      {/* <button onClick={() => handleSearch()}>Search</button> */}
    </div>
  );
};

export default SearchResults;
