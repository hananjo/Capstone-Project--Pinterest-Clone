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
import AddToBoardOptionsModal from "../AddToBoardOptionsModal/AddToBoardOptionsModal";
import "./PinDetails.css";
import BarLoader from "react-spinners/BarLoader";

const PinDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { setModalContent } = useModal();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detailsExist, setDetailsExist] = useState(false);
  const pin = useSelector((state) => {
    return state?.pin?.details;
  });

  const sessionUser = useSelector((state) => {
    return state?.session?.user;
  });
  const user = useSelector((state) => {
    return state?.session?.user?.id;
  });

  useEffect(() => {
    dispatch(getPinDetails(id));
    dispatch(getAllComments(id));
  }, [dispatch, id]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const comments = useSelector((state) => {
    return state?.pin?.details?.comments;
  });

  const openModal = () => {
    setShowModal(true);
  };

  const handleAddComment = () => {
    setModalContent(<AddCommentModal id={id} />);
    openModal();
  };
  const handleEditComment = (pinId, id) => {
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

  const handlePinClick = (pin) => {
    setModalContent(<AddToBoardOptionsModal pin={pin} user={user} />);
    openModal();
  };

  return (
    <div className="pin-detail-page-container">
      {loading ? (
        <>
          <div className="loader">
            <p className="loading">Loading...</p>
            <BarLoader
              color="#f32420"
              height={10}
              speedMultiplier={1}
              width={200}
            />
          </div>
        </>
      ) : pin && pin?.id ? (
        <div>
          {sessionUser ? (
            <div>
              <button
                className="pin-to-board-button-pin-detail"
                onClick={() => handlePinClick(pin)}
              >
                Save
              </button>
            </div>
          ) : (
            <br />
          )}
          <div className="pin-detail-container">
            <div className="pin-detail-image">
              <img
                className="pin-detail-image-2"
                src={pin && pin?.images && pin?.images[0]?.image_url}
              />
            </div>

            <div className="pin-detail-info">
              <div className="pin-detail-title">
                <p>{pin?.name}</p>
              </div>
              <div className="pin-detail-description">
                <p>{pin?.description}</p>
              </div>
              <div className="pin-edit-and-delete-buttons">
                {sessionUser && pin && user === pin?.user_id ? (
                  <button
                    className="edit-pin-button"
                    onClick={() => handleUpdatePin(id)}
                  >
                    Edit Pin
                  </button>
                ) : (
                  <br />
                )}
                {sessionUser && pin && user === pin?.user_id ? (
                  <button
                    className="delete-pin-button"
                    onClick={() => handleDeletePin(id)}
                  >
                    Delete Pin
                  </button>
                ) : (
                  <br />
                )}
              </div>
              <div className="comments-title">
                <p>Comments ({comments.length}):</p>
              </div>
              <div className="pin-comments">
                {comments.length != 0 ? (
                  <div>
                    {comments &&
                      comments.map((comment) => {
                        return (
                          <div key={comment.id}>
                            <div className="avatars-and-comment">
                              <div className="avatars">
                                <p>
                                  {comment?.user_id === 1 && (
                                    <img
                                      style={{
                                        width: "40px",
                                        clipPath: "circle(41%)",
                                      }}
                                      src={
                                        "https://res.cloudinary.com/dwphwqyrn/image/upload/v1685589599/16147095-2CE2-4AA6-AA9E-D2F1B47D7CE6_qpx5kd.png"
                                      }
                                    />
                                  )}
                                </p>
                                <p>
                                  {comment?.user_id === 2 && (
                                    <img
                                      style={{ width: "40px" }}
                                      src={
                                        "https://res.cloudinary.com/dwphwqyrn/image/upload/v1683857034/avatar_2_rba8yf.jpg"
                                      }
                                    />
                                  )}
                                </p>
                                <p>
                                  {comment?.user_id === 3 && (
                                    <img
                                      style={{ width: "40px" }}
                                      src={
                                        "https://res.cloudinary.com/dwphwqyrn/image/upload/v1683857034/avatar_1_mhmsrt.png"
                                      }
                                    />
                                  )}
                                </p>
                              </div>
                              <div className="pin-comment">
                                <p>{comment.comment}</p>
                              </div>
                            </div>
                            <div>
                              {sessionUser &&
                              comment &&
                              user === comment.user_id ? (
                                <div className="edit-and-delete-comment">
                                  <div>
                                    <button
                                      className="comment-edit-button"
                                      onClick={() =>
                                        handleEditComment(pin.id, comment.id)
                                      }
                                    >
                                      Edit
                                    </button>
                                  </div>
                                  <div>
                                    <button
                                      className="comment-delete-button"
                                      onClick={() =>
                                        handleDeleteComment(pin.id, comment.id)
                                      }
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <br />
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div className="no-comments">No Comments</div>
                )}
              </div>
              {sessionUser ? (
                <div className="add-comment">
                  <button
                    className="add-comment-button"
                    onClick={() => handleAddComment()}
                  >
                    Add Comment
                  </button>
                </div>
              ) : (
                <br />
              )}
              {/* {sessionUser && pin && user === pin.user_id ? (
              <div>
                <NavLink to={`/pins/${id}/update`}>
                  <button>Edit</button>
                </NavLink>
              </div>
            ) : (
              <br />
            )} */}
            </div>
          </div>
        </div>
      ) : (
        <div className="page-not-found">Page not found</div>
      )}
    </div>
  );
};

export default PinDetails;
