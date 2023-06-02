import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { updateBoard, getAllBoards } from "../../store/board";

const UpdateBoardForm = ({ boardId, userId }) => {
  console.log(userId, boardId, "******BOARD*****USERID******ID****");
  // const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  //   const { id } = useParams();

  const user = useSelector((state) => {
    return state.session.user.id;
  });

  const boards = useSelector((state) => {
    return state?.board;
  });

  // const boards = useSelector((state) => {
  //   return Object.values(state?.board);
  // });

  const [name, setName] = useState(boards[boardId]?.name || "");
  const [description, setDescription] = useState(
    boards[boardId]?.description || ""
  );
  const [errors, setErrors] = useState([]);

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
        user_id: userId,
      };
      console.log(boardFormInput, "*****BOARDFORMINPUT****");
      //   console.log(boardFormInput, "BOARD FORM INPUT");
      let updatedBoard;
      updatedBoard = await dispatch(
        updateBoard(userId, boardId, boardFormInput)
      );

      if (updatedBoard) {
        await dispatch(getAllBoards(user));
        closeModal();
      }
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
          <h2>Update your board</h2>
          <label className="create-board-name">
            <div className="create-board-name-title">Name:</div>
            <input
              type="text"
              name="name"
              placeholder="What is the name of your board"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="errors">
              {errors?.includes("Name is required") && (
                <div>Name is required</div>
              )}
            </div>
          </label>
          <label className="create-board-description">
            <div className="create-board-description-title">Description:</div>
            <textarea
              type="text"
              name="description"
              placeholder="What is your board about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="errors">
              {errors?.includes("Description needs 10 or more characters") && (
                <div>Description needs 10 or more characters</div>
              )}
            </div>
          </label>
          <button className="create-board-submit-button" type="submit">
            Done
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateBoardForm;
