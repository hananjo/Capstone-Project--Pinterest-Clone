import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { addNewComment } from "../../store/comments";
import { getPinDetails } from "../../store/pin";
import { useState, useEffect } from "react";
import "./AddCommentModal.css";
const AddCommentModal = ({ id }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const user = useSelector((state) => state.session.user.id);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const validationErrors = [];

    if (!comment.length) {
      validationErrors.push("Comment field cannot be empty");
    }
    setErrors(validationErrors);
  }, [comment]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!errors.length) {
      const newCommentInput = {
        comment: comment,
        user_id: user,
        pin_id: id,
      };


      await dispatch(addNewComment(newCommentInput, id));
      await dispatch(getPinDetails(id));
      closeModal();
    }
  };

  return (
    <div className="add-comment-modal">
      <form onSubmit={handleSubmit}>
        <div className="add-comment-input">

          <textarea

            type="text"
            style={{ width: "260px" }}
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <label>Comment</label>

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

export default AddCommentModal;
