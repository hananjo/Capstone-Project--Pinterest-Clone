import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { getAllBoards } from "../../store/board";
import { addNewPin, getAllPins, getPinDetails } from "../../store/pin";
// import { validateImage } from "image-validator";
import { addPinToBoard } from "../../store/board";
import "./CreatePinModal.css";
import { getAllComments } from "../../store/comments";
import CreateBoardLandingPage from "../CreateBoardLandingPage/CreateBoardLandingPage";
import UploadPicture from "../UploadPicture/UploadPicture";

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

  const sessionUser = useSelector((state) => {
    return state?.session?.user;
  });
  const user = useSelector((state) => {
    return state?.session?.user?.id;
  });

  useEffect(() => {
    dispatch(getAllBoards(user));
  }, [dispatch, user]);

  // useEffect(() => {
  //   const validationErrors = [];
  //   const acceptedExtensions = [".png", ".jpg", ".jpeg"];
  //   const extension = image.split(".").pop().toLowerCase();

  //   if (!name.length) {
  //     validationErrors.push("Name is required");
  //   }
  //   if (description.length < 10) {
  //     validationErrors.push("Description needs 10 or more characters");
  //   }
  //   if (!keyword.length) {
  //     validationErrors.push(
  //       "To make your pin accessable for other users, have at least one keyword for your pin"
  //     );
  //   }
  //   if (size === "") {
  //     validationErrors.push("Image sizing is required");
  //   }

  //   if (!acceptedExtensions.includes("." + extension)) {
  //     validationErrors.push("Image URL must end in .png, .jpg, or .jpeg");
  //   }
  //   setErrors(validationErrors);
  // }, [name, description, keyword, size, image]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    if (!validationErrors.length) {
      const pinFormInput = {
        name,
        description,
        keyword,
        user_id: user,
        image_url: image,
        size: size,
      };

      //aws add in
      // let addedNewPin;
      // addedNewPin = await dispatch(addNewPin(pinFormInput, user));
      //aws addin

      //   closeModal();
      // if (selectedBoard) {
      //   console.log(selectedBoard, "SET SELECTED BOARD VALUE****");
      //   dispatch(addPinToBoard(user, selectedBoard, addedNewPin.id));
      //   closeModal();
      // }
      // else {
      //   alert("Select a board first");
      // }

      //aws addin
      // const res = await fetch("/api/pins/images/url", {
      //   method: "POST",
      //   body: formData,
      // });
      // if (res.ok) {
      //   let url = await res.json();
      //   console.log(url, "***URL***");
      //   let image = url.url;
      //   const pinFormInput = {
      //     name,
      //     description,
      //     keyword,
      //     user_id: user,
      //     image_url: image,
      //     size: size,
      //   };
      //   let addedNewPin;
      //   addedNewPin = await dispatch(addNewPin(pinFormInput, user));

      // if (addedNewPin) {
      //   history.push(`/pins/${addedNewPin.id}`);
      // }
      //aws addin

      // }
      let addedNewPin;
      addedNewPin = await dispatch(addNewPin(pinFormInput, user));
      if (addedNewPin) {
        history.push(`/pins/${addedNewPin.id}`);
      }
    }
  };

  return (
    <>
      {sessionUser && user ? (
        <div className="create-pin-container">
          <form className="create-pin-form" onSubmit={handleSubmit}>
            {/* <ul className="errors">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul> */}
            <div className="post-form-title">
              <h2>Create new pin</h2>
            </div>

            <div className="create-pin-name-input">
              <input
                type="text"
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Name</label>
              <div className="errors">
                {errors?.includes("Name is required") && (
                  <div>Name is required</div>
                )}
              </div>
            </div>
            <label className="create-pin-description-input">
              <input
                type="text"
                required
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label>Description</label>
              <div className="errors">
                {errors?.includes(
                  "Description needs 10 or more characters"
                ) && <div>Description needs 10 or more characters</div>}
              </div>
            </label>
            <label className="create-pin-keyword-input">
              <input
                type="text"
                required
                name="keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <label>Keywords</label>
              <div className="errors">
                {errors?.includes(
                  "To make your pin accessable for other users, have at least one keyword for your pin"
                ) && (
                  <div>
                    To make your pin accessable for other users, have at least
                    one keyword for your pin
                  </div>
                )}
              </div>
            </label>
            <label className="create-pin-image-input">
              <input
                style={{ height: "40px" }}
                type="text"
                // type="file"
                accept="image/*"
                required
                name="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <label>Upload Image</label>
              <div className="errors">
                {errors?.includes(
                  "Image URL must end in .png, .jpg, or .jpeg"
                ) && <div>Image URL must end in .png, .jpg, or .jpeg</div>}
              </div>
            </label>
            <label className="create-pin-image-size-input">
              <div className="post-pin-input-title">
                Please select the size of the image file:
              </div>
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
            {/* <label className="create-pin-to-board-input">
              <div className="post-pin-input-title">Pin to a board:</div>
              <select onChange={(e) => handleBoardOptions(e)}>
                <option value="">Select a board</option>
                {boards?.map((board) => {
                  return (
                    <option key={board.id} value={board.id}>
                      {board?.name}
                    </option>
                  );
                })} */}
            {/* {selectedBoard === "createNewBoard" ? null : (
                  <option value="createNewBoard">+ Create new board</option>
                )}
                {selectedBoard === "createNewBoard" && (
                  <button onClick={handleCreateBoard()}>
                    {" "}
                    + Create New Board
                  </button>
                )}
                ; */}
            {/* </select>
            </label> */}

            {/* <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            /> */}

            {/* <div>
              <UploadPicture />
            </div> */}
            <div className="post-pin-save">
              <button className="post-pin-save-button" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="please-login-error-page">
          Please log in to view this page
        </div>
      )}
    </>
  );
};

export default CreatePinModal;
