import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { getAllBoards } from "../../store/board";
import { addNewPin, getAllPins } from "../../store/pin";
import { addPinToBoard } from "../../store/board";

const CreatePinModal = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [keyword, setKeyword] = useState("");
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [errors, setErrors] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const boards = useSelector((state) => {
    return Object.values(state?.board);
  });

  const user = useSelector((state) => {
    return state.session.user.id;
  });

  const handleBoardOptions = (e) => {
    setSelectedBoard(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllBoards(user));
  }, [dispatch, user]);

  useEffect(() => {
    const validationErrors = [];
    if (!name.length) {
      validationErrors.push("Name is required");
    }
    if (description.length < 10) {
      validationErrors.push("Description needs 10 or more characters");
    }
    if (!keyword.length) {
      validationErrors.push(
        "To make your pin accessable for other users, have at least one keyword for your pin"
      );
    }
    setErrors(validationErrors);
  }, [name, description, keyword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!errors.length) {
      const pinFormInput = {
        name,
        description,
        keyword,
        user_id: user,
        image_url: image,
        size: size,
      };

      let addedNewPin;
      addedNewPin = await dispatch(addNewPin(pinFormInput, user));
      //   closeModal();
      if (selectedBoard) {
        dispatch(addPinToBoard(user, selectedBoard, addedNewPin.id));
        closeModal();
      } else {
        alert("Select a board first");
      }

      if (addedNewPin) {
        history.push(`/pins/${addedNewPin.id}`);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <ul className="errors">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <h2>Create new Pin</h2>

        <label>
          {/* <div>Name:</div> */}
          <input
            type="text"
            name="name"
            placeholder="Add your title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <div>Description:</div>
          <input
            type="text"
            name="description"
            placeholder="Tell everyone what your pin is about"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          <div>Keywords:</div>
          <div>
            For search purposes, list some keywords that users might use to
            discover your picture
          </div>
          <input
            type="text"
            name="keyword"
            placeholder="List keywords here"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </label>
        <label>
          <div>Upload an image</div>
          <input
            style={{ height: "40px" }}
            type="text"
            name="image"
            placeholder="Post an image for your pin"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            // className="image-input-area"
          />
        </label>
        <label>
          <div>Please type one of the following: small, medium, or large</div>
          <select
            type="text"
            name="size"
            placeholder="Image size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="small">small</option>
            <option value="medium">medium</option>
            <option value="large">large</option>
          </select>
        </label>
        <select onChange={(e) => handleBoardOptions(e)}>
          <option value="">Select a board</option>
          {boards?.map((board) => {
            return (
              <option key={board.id} value={board.id}>
                {board?.name}
              </option>
            );
          })}
        </select>
        <button type="submit">Save</button>
      </form>
    </>
  );
};

export default CreatePinModal;
