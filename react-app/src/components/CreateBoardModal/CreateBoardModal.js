import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { addNewBoard, getAllBoards } from "../../store/board";
const CreateBoardModal = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

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
      //   console.log(boardFormInput, "BOARD FORM INPUT");
      let addedNewBoard;
      addedNewBoard = await dispatch(addNewBoard(boardFormInput, user));
      await dispatch(getAllBoards(user));
      closeModal();

      //   if (addNewBoard) {
      //     history.push(`/${user}/boards`);
      //   }
    }

    // setName("");
    // setDescription("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <ul className="errors">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <h2>Create new board</h2>
        <label>
          <div>Name:</div>
          <input
            type="text"
            name="name"
            placeholder="What is the name of your board"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <div>Description:</div>
          <input
            type="text"
            name="description"
            placeholder="Describe your board here ..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button type="submit">Create Board</button>
      </form>
    </>
  );
};

export default CreateBoardModal;
