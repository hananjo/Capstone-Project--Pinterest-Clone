import { useEffect, useState } from "react";
import { getPinDetails } from "../../store/pin";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getAllComments } from "../../store/comments";
import { useModal } from "../../context/Modal";
import AddCommentModal from "../AddCommentModal/AddCommentModal";
import UpdateCommentModal from "../UpdateCommentModal/UpdateCommentModal";
import DeleteCommentModal from "../DeleteCommentModal/DeleteCommentModal";
import DeletePinModal from "../DeletePinModal/DeletePinModal";
import UpdatePin from "../UpdatePin/UpdatePin";
const PinDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { setModalContent } = useModal();
  const [showModal, setShowModal] = useState(false);

  const pin = useSelector((state) => {
    return state?.pin?.details;
  });
  const sessionUser = useSelector((state) => {
    return state?.session?.user;
  });
  const user = useSelector((state) => {
    return state?.session?.user?.id;
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

  const handleUpdatePin = (id) => {
    setModalContent(<UpdatePin id={id} />);
  };
  const handleDeletePin = (id) => {
    setModalContent(<DeletePinModal id={id} />);
    openModal();
  };
  return (
    <div>
      {pin && pin?.id ? (
        <div>
          <p>{pin?.name}</p>
          <p>{pin?.description}</p>
          <img
            src={pin && pin?.images && pin?.images[0]?.image_url}
            style={{ width: "450px", height: "400px" }}
          />
          {sessionUser && pin && user === pin?.user_id ? (
            <button onClick={() => handleUpdatePin(id)}>Update Pin</button>
          ) : (
            <br />
          )}
          {sessionUser && pin && user === pin?.user_id ? (
            <button onClick={() => handleDeletePin(id)}>Delete Pin</button>
          ) : (
            <br />
          )}
          <p>Comments:</p>
          {comments &&
            comments.map((comment) => {
              return (
                <div key={comment.id}>
                  <p>{comment.comment}</p>
                  {sessionUser && comment && user === comment.user_id ? (
                    <div>
                      <button
                        onClick={() => handleEditComment(pin.id, comment.id)}
                      >
                        Edit Comment
                      </button>
                      <button
                        onClick={() => handleDeleteComment(pin.id, comment.id)}
                      >
                        Delete Comment
                      </button>
                    </div>
                  ) : (
                    <br />
                  )}
                </div>
              );
            })}
          <button onClick={() => handleAddComment()}>Add Comment</button>
          {sessionUser && pin && user === pin.user_id ? (
            <div>
              <NavLink to={`/pins/${id}/update`}>
                <button>Edit</button>
              </NavLink>
            </div>
          ) : (
            <br />
          )}
        </div>
      ) : (
        "Page not found"
      )}
    </div>
  );
};

export default PinDetails;
