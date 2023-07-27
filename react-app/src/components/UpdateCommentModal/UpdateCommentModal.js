import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { addNewComment, updateComment } from "../../store/comments";
import { getPinDetails } from "../../store/pin";
import "./UpdateCommentModal.css";
const UpdateCommentModal = ({ pinId, id }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const user = useSelector((state) => state.session.user.id);

  const commentSelected = useSelector((state) => state?.comment);

  const [comment, setComment] = useState(commentSelected[id]?.comment || "");
  const [errors, setErrors] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = [];

    if (!comment.length) {
      validationErrors.push("Comment field cannot be empty");
    }
    setErrors(validationErrors);

    if (!validationErrors.length) {
      const newCommentInput = {
        comment: comment,
        user_id: user,
        pin_id: id,
      };
      await dispatch(updateComment(pinId, id, newCommentInput));
      await dispatch(getPinDetails(pinId));
      closeModal();
    }
  };

  return (
    <div className="add-comment-modal">
      <form onSubmit={handleSubmit}>
        <div className="add-comment-input">
          <p className="add-comment-title">Edit your comment for this pin:</p>
          <textarea
            placeholder="Type your comment here..."
            style={{ width: "260px" }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div className="errors">
            {errors?.includes("Comment field cannot be empty") && (
              <div>Comment field cannot be empty</div>
            )}
          </div>
        </div>
        <div className="comment-submit-button">
          <button className="submit-comment-button" type="submit">
            Done
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCommentModal;
