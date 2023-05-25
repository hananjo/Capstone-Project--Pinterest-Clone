import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { addNewComment } from "../../store/comments";
import { getPinDetails } from "../../store/pin";
import { useState } from "react";

const AddCommentModal = ({ id }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const user = useSelector((state) => state.session.user.id);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCommentInput = {
      comment: comment,
      user_id: user,
      pin_id: id,
    };
    console.log(newCommentInput, "NEW COMMENT******");
    await dispatch(addNewComment(newCommentInput, id));
    await dispatch(getPinDetails(id));
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

export default AddCommentModal;
