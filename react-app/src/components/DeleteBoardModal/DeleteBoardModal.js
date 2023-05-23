import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteBoard, getAllBoards } from "../../store/board";

const DeleteBoardModal = ({ boardId, userId }) => {
  console.log(boardId, userId, "*****DELETE *******");
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const removeBoard = async (e) => {
    e.preventDefault();
    await dispatch(deleteBoard(userId, boardId));
    await dispatch(getAllBoards(userId));
    closeModal();
  };
  return (
    <div className="confirm-delete-container">
      <h2 className="confirm-delete-h2">Delete Board Confirmation</h2>
      <p className="confirm-delete-message">
        Are you sure you want to delete this Board?
      </p>

      <div className="board-confirmation-buttons">
        <button className="board-choices" onClick={removeBoard}>
          Yes
        </button>

        <button className="board-choices" onClick={closeModal}>
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteBoardModal;
