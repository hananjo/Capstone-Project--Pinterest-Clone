import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { getPinDetails, updatePin } from "../../store/pin";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
const UpdatePin = ({ id }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const { id } = useParams();

  const pins = useSelector((state) => {
    return state?.pin.details;
  });
  const [name, setName] = useState(pins?.name || "");
  const [description, setDescription] = useState(pins?.description || "");
  const [keyword, setKeyword] = useState(pins?.keyword || "");
  const [image, setImage] = useState(pins?.images[0]?.image_url || "");
  const [size, setSize] = useState(pins?.images[0]?.size || "");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const user = useSelector((state) => {
    return state.session.user.id;
  });

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

      let updatedPin;
      updatedPin = await dispatch(updatePin(id, pinFormInput));
      //   closeModal();
      //   if (selectedBoard) {
      //     dispatch(addPinToBoard(user, selectedBoard, addedNewPin.id));
      //     closeModal();
      //   } else {
      //     alert("Select a board first");
      //   }

      if (updatedPin) {
        // history.push(`/pins/${id}`);
        await dispatch(getPinDetails(id));
        closeModal();
      }
    }
  };

  return (
    <div>
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
          <button type="submit">Save</button>
        </label>
      </form>
    </div>
  );
};

export default UpdatePin;
