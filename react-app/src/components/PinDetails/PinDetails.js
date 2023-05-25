import { useEffect, useState } from "react";
import { getPinDetails } from "../../store/pin";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getAllComments } from "../../store/comments";
import { useModal } from "../../context/Modal";
import AddCommentModal from "../AddCommentModal/AddCommentModal";
import UpdateCommentModal from "../UpdateCommentModal/UpdateCommentModal";
import DeleteCommentModal from "../DeleteCommentModal/DeleteCommentModal";
const PinDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { setModalContent } = useModal();
  const [showModal, setShowModal] = useState(false);

  const pin = useSelector((state) => {
    return state?.pin?.details;
  });

  console.log(pin, "PINS****");
  console.log(pin?.description, "PIN.NAME");

  useEffect(() => {
    dispatch(getPinDetails(id));
    dispatch(getAllComments(id));
  }, [dispatch, id]);

  const comments = useSelector((state) => {
    return Object.values(state?.comment);
  });
  console.log(comments, "COMMENTS");
  //   const pins = useSelector((state) => {
  //     return Object.values(state?.pin);
  //   });
  const openModal = () => {
    setShowModal(true);
  };

  const handleAddComment = () => {
    setModalContent(<AddCommentModal id={id} />);
    openModal();
    // dispatch(getAllComments(id));
  };
  const handleEditComment = (pinId, id) => {
    console.log(pinId, id, "@@@@PINID AND ID @@@@@");
    setModalContent(<UpdateCommentModal pinId={pinId} id={id} />);
    openModal();
  };

  const handleDeleteComment = (pinId, id) => {
    setModalContent(<DeleteCommentModal pinId={pinId} id={id} />);

    openModal();
  };
  return (
    <div>
      <p>{pin?.name}</p>
      <p>{pin?.description}</p>
      <p>{pin?.images[0]?.image_url}</p>
      <p>Comments:</p>
      {comments &&
        comments.map((comment) => {
          return (
            <div key={comment.id}>
              <p>{comment.comment}</p>
              <button onClick={() => handleEditComment(pin.id, comment.id)}>
                Edit Comment
              </button>
              <button onClick={() => handleDeleteComment(pin.id, comment.id)}>
                Delete Comment
              </button>
            </div>
          );
        })}
      <button onClick={() => handleAddComment()}>Add Comment</button>
      <div>
        <NavLink to={`/pins/${id}/update`}>
          <button>Edit</button>
        </NavLink>
      </div>
    </div>
  );
};

export default PinDetails;
