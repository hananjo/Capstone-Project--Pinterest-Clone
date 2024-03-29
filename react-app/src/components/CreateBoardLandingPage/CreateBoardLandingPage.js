import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { addNewBoard, getAllBoards } from "../../store/board";
import AddToBoardOptionsModal from "../AddToBoardOptionsModal/AddToBoardOptionsModal";
const CreateBoardLandingPage = ({ pin }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const { setModalContent } = useModal();
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
    setErrors(validationErrors);
  }, [name, description]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!errors.length) {
      const boardFormInput = {
        name,
        description,
        user_id: user,
      };

      let addedNewBoard;
      addedNewBoard = await dispatch(addNewBoard(boardFormInput, user));
      await dispatch(getAllBoards(user));

      setModalContent(<AddToBoardOptionsModal user={user} pin={pin} />);
    }
  };

  return (
    <>
      <div className="create-board-container">
        <form className="create-board-form" onSubmit={handleSubmit}>
          {/* <ul className="errors">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul> */}
          <h2>Create new board</h2>
          <label className="create-board-name">
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
          </label>
          <label className="create-board-description">
            <textarea
              type="text"
              required
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Description</label>
            <div className="errors">
              {errors?.includes("Description needs 10 or more characters") && (
                <div>Description needs 10 or more characters</div>
              )}
            </div>
          </label>
          <button className="create-board-submit-button" type="submit">
            Create Board
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateBoardLandingPage;
