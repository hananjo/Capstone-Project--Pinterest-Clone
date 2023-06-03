import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPins } from "../../store/search";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
const SearchBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [keyword, setKeyword] = useState("");
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchPins(keyword));
    history.push("/search");
    closeModal();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={keyword}
          placeholder="Search pins"
          onChange={(e) => setKeyword(e.target.value)}
        ></input>

        <button>Search</button>
      </form>
    </>
  );
};

export default SearchBar;
