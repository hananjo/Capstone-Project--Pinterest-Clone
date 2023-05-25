import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { addNewComment, updateComment } from "../../store/comments";
import { getPinDetails } from "../../store/pin";
const UpdateCommentModal = ({ pinId, id }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const user = useSelector((state) => state.session.user.id);

  const commentSelected = useSelector((state) => state?.comment);
  console.log(commentSelected, "SELECTED COMMENT STATE*****");
  const [comment, setComment] = useState(commentSelected[id]?.comment || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCommentInput = {
      comment: comment,
      user_id: user,
      pin_id: id,
    };
    console.log(newCommentInput, "NEW COMMENT******");
    await dispatch(updateComment(pinId, id, newCommentInput));
    await dispatch(getPinDetails(pinId));
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <p>Leave a comment for this pin:</p>
        <textarea
          placeholder="Type your comment here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <button type="submit">Done</button>
    </form>
  );
};

export default UpdateCommentModal;
