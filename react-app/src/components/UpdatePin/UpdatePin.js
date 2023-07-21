import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { getPinDetails, updatePin } from "../../store/pin";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import "./UpdatePin.css";
const UpdatePin = ({ id }) => {
  const history = useHistory();
  const dispatch = useDispatch();

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
    const acceptedExtensions = [".png", ".jpg", ".jpeg"];
    const extension = image.split(".").pop().toLowerCase();
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
    if (size === "") {
      validationErrors.push("Image sizing is required");
    }
    if (!acceptedExtensions.includes("." + extension)) {
      validationErrors.push("Image URL must end in .png, .jpg, or .jpeg");
    }
    setErrors(validationErrors);
  }, [name, description, keyword, size, image]);

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

      if (updatedPin) {
        await dispatch(getPinDetails(id));
        closeModal();
      }
    }
  };

  return (
    <div className="edit-pin-form-container">
      <form className="edit-pin-form" onSubmit={handleSubmit}>
        {/* <ul className="errors">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul> */}
        <div className="edit-pin-title">
          <h2>Edit your pin</h2>
        </div>

        <label className="edit-pin-name-input">
          <div className="edit-pin-subtitles">Name of pin:</div>
          <input
            type="text"
            name="name"
            placeholder="Add your title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="errors">
            {errors?.includes("Name is required") && (
              <div>Name is required</div>
            )}
          </div>
        </label>

        <label className="edit-pin-description-input">
          <div className="edit-pin-subtitles">Description:</div>
          <textarea
            type="text"
            name="description"
            placeholder="Tell everyone what your pin is about"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="errors">
            {errors?.includes("Description needs 10 or more characters") && (
              <div>Description needs 10 or more characters</div>
            )}
          </div>
        </label>

        <label className="edit-keyword-pin-input">
          <div className="keyword-subtitles">
            <div className="edit-pin-subtitles">Keywords:</div>
            <div className="edit-pin-subtitles-2">
              For search purposes, list some keywords that users might use to
              discover your picture
            </div>
          </div>

          <input
            type="text"
            name="keyword"
            placeholder="List keywords here"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="errors">
            {errors?.includes(
              "To make your pin accessable for other users, have at least one keyword for your pin"
            ) && (
              <div>
                To make your pin accessable for other users, have at least one
                keyword for your pin
              </div>
            )}
          </div>
        </label>

        <label className="edit-upload-pin-input">
          <div className="edit-pin-subtitles">Upload an image:</div>
          <input
            style={{ height: "40px" }}
            type="text"
            name="image"
            placeholder="Post an image for your pin"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <div className="errors">
            {errors?.includes("Image URL must end in .png, .jpg, or .jpeg") && (
              <div>Image URL must end in .png, .jpg, or .jpeg</div>
            )}
          </div>
        </label>
        <label className="edit-image-file-size-select">
          <div className="edit-pin-subtitles">Image file size:</div>

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
          <div className="errors">
            {errors?.includes("Image sizing is required") && (
              <div>Image sizing is required</div>
            )}
          </div>
        </label>
        <div className="edit-pin-save">
          <button className="edit-pin-save-button" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePin;
