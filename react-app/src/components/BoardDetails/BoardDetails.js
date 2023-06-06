import { useParams } from "react-router-dom";
import { getBoardDetails } from "../../store/board";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./BoardDetails.css";
import { getAllBoards } from "../../store/board";
import { useModal } from "../../context/Modal";
import AddToBoardOptionsModal from "../AddToBoardOptionsModal/AddToBoardOptionsModal";
// import { deleteBoard } from "../../store/board";
// import { useModal } from "../../context/Modal";

const BoardDetails = () => {
  // const { setModalContent } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();
  // const [showModal, setShowModal] = useState(false);
  const { userId, id } = useParams();
  // const { setModalContent } = useModal();
  console.log(userId, id, "USERID");
  // const sessionUser = useSelector((state) => {
  //   return state?.session?.user;
  // });
  //   const user = useSelector((state) => {
  //     return state.session.user.id;
  //   });
  // const user = useSelector((state) => {
  //   return state?.session?.user?.id;
  // });
  const sessionUser = useSelector((state) => {
    return state?.session?.user;
  });
  const user = useSelector((state) => {
    return state?.session?.user?.id;
  });

  const board = useSelector((state) => {
    return state?.board.details;
  });
  console.log(board, "BOARD DETAIL STATE");
  useEffect(() => {
    dispatch(getBoardDetails(userId, id));
    // if (user) {
    //   dispatch(getAllBoards(user));
    // }
  }, [dispatch, userId, id]);

  // const openModal = () => {
  //   setShowModal(true);
  // };

  // const handlePinClick = (pin) => {
  //   console.log(pin, "pin selected button *****");
  //   // setSelectedPin(pin);
  //   // console.log(selectedPin, "SELECTED PIN LANDING PAGE***");
  //   setModalContent(<AddToBoardOptionsModal pin={pin} user={user} />);
  //   openModal();
  // };

  // const handleDeleteBoard = () => {
  //   setModalContent(<DeleteBoardDetailModal />);
  //   dispatch(deleteBoard(userId, id));
  //   history.push(`/${userId}/boards`);
  // };
  return (
    <div>
      {sessionUser && user ? (
        <div className="container-for-container">
          <div className="board-details-container">
            {board && board?.pins && board?.id ? (
              <div>
                <div className="header-board-details">
                  <div className="board-details-name">
                    <p>{board?.name}</p>
                  </div>
                  <div className="image-profile-2">
                    <img
                      className="profile-image-board"
                      style={{
                        width: "60px",
                        clipPath: "circle(41%)",
                      }}
                      src={
                        "https://res.cloudinary.com/dwphwqyrn/image/upload/v1685589599/16147095-2CE2-4AA6-AA9E-D2F1B47D7CE6_qpx5kd.png"
                      }
                    />
                  </div>
                  <div className="board-details-description">
                    <p>{board?.description}</p>
                  </div>
                </div>
                <div className="pins-container-board-details">
                  {board?.pins?.map((pin) => {
                    return (
                      <div className="pins">
                        {/* {sessionUser ? (
                    <div className="pin-to-board">
                      <button
                        className="pin-to-board-button"
                        onClick={() => handlePinClick(pin)}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <br />
                  )} */}
                        <div className="grid-wrapper-2">
                          <NavLink to={`/pins/${pin.id}`}>
                            <div className="board-details-photos">
                              <div className="pin-photos">
                                <img
                                  className="pin-images-2"
                                  src={
                                    pin &&
                                    pin?.images &&
                                    pin?.images[0]?.image_url
                                  }
                                  // style={{ width: "450px", height: "400px" }}
                                />
                              </div>
                              <div className="pin-name-board-details">
                                {pin?.name}
                              </div>
                            </div>

                            {/* <p>{pin?.images[0]?.image_url}</p> */}
                          </NavLink>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* <button onClick={() => handleDeleteBoard()}>Delete Board</button> */}
              </div>
            ) : (
              <div className="page-not-found-board-details">Page not Found</div>
            )}
          </div>
        </div>
      ) : (
        <div className="please-login-error-page">
          Please log in to view this page
        </div>
      )}
    </div>
  );
};

export default BoardDetails;
