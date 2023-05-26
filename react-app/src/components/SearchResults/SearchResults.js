import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";

const SearchResults = () => {
  const [showModal, setShowModal] = useState(false);
  const { setModalContent } = useModal();
  const pins = useSelector((state) => {
    return Object.values(state?.searches);
  });
  const openModal = () => {
    setShowModal(true);
  };

  const handleSearch = () => {
    setModalContent(<SearchBar />);
    openModal();
  };
  return (
    <div>
      <div>
        {pins?.map((pin) => {
          return (
            <div>
              {pin?.images[0]?.image_url}
              {pin?.name}
            </div>
          );
        })}
      </div>
      <button onClick={() => handleSearch()}>Search</button>
    </div>
  );
};

export default SearchResults;
