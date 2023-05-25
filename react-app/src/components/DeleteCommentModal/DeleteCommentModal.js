import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { getPinDetails } from "../../store/pin";
import { deleteComment, getAllComments } from "../../store/comments";
const DeleteCommentModal = ({ pinId, id }) => {
  console.log(pinId, "PINID*****");
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const removeComment = async (e) => {
    e.preventDefault();
    await dispatch(deleteComment(pinId, id));
    await dispatch(getAllComments(pinId));
    closeModal();
  };
  return (
    <div className="confirm-delete-container">
      <h2 className="confirm-delete-h2">Delete Comment Confirmation</h2>
      <p className="confirm-delete-message">
        Are you sure you want to delete this comment?
      </p>

      <div className="comment-confirmation-buttons">
        <button className="comment-choices" onClick={removeComment}>
          Yes
        </button>

        <button className="comment-choices" onClick={closeModal}>
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteCommentModal;
