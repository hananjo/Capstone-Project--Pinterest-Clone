import { getAllBoards } from "../../store/board";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import CreateBoardModal from "../CreateBoardModal/CreateBoardModal";
import UpdateBoardForm from "../UpdateBoardForm/UpdateBoardForm";
import DeleteBoardModal from "../DeleteBoardModal/DeleteBoardModal";
import CreatePinModal from "../CreatePinModal/CreatePinModal";
import "./Boards.css";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Boards = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { setModalContent } = useModal();
  const [showMenu, setShowMenu] = useState(false);
  // const ulRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const user = useSelector((state) => {
    return state?.session?.user;
  });
  const sessionUser = useSelector((state) => {
    return state?.session?.user?.id;
  });
  const boards = useSelector((state) => {
    return Object.values(state?.board);
  });

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  const openModal = () => {
    setShowModal(true);
  };
  console.log("BOARDS****", boards);
  useEffect(() => {
    dispatch(getAllBoards(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      // if (!ulRef.current.contains(e.target)) {
      setShowMenu(false);
      // }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);
  const handleCreateBoard = () => {
    setModalContent(<CreateBoardModal />);
    openModal();
  };

  const handleUpdateBoard = (boardId, userId) => {
    // console.log(
    //   userId,
    //   boardId,

    //   "111******BOARD*****USERID******ID****"
    // );
    setModalContent(<UpdateBoardForm boardId={boardId} userId={userId} />);
    openModal();
  };

  const handleDeleteBoard = (boardId, userId) => {
    setModalContent(<DeleteBoardModal boardId={boardId} userId={userId} />);
    openModal();
  };

  const handleCreatePin = () => {
    history.push("/create-pin");
  };
  // const handleCreatePin = () => {
  //   setModalContent(<CreatePinModal />);
  //   openModal();
  // };
  return (
    <div>
      {sessionUser && user ? (
        <div>
          <div className="adding-pins-and-boards-container">
            <div className="create-button">
              <img
                onClick={openMenu}
                className="create-pin-and-board-button"
                style={{ width: "50px" }}
                src="https://res.cloudinary.com/dwphwqyrn/image/upload/v1685586576/add_button_icon_pc5nvr.png"
              />
            </div>
            {showMenu && (
              <div className="create-pins-and-boards-buttons">
                <h4 className="create-title">Create</h4>
                <div className="boards-create-buttons">
                  <button
                    className="new-board-page-button"
                    onClick={() => handleCreatePin()}
                  >
                    Create new pin
                  </button>
                  {/* <button onClick={() => handleCreatePin()}>Create new pin </button> */}
                  <button
                    className="new-board-page-button"
                    onClick={() => handleCreateBoard()}
                  >
                    Create new board
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="boards-container">
            {boards?.map((board) => {
              return (
                <>
                  <div className="boards-page-container">
                    <div className="board-name-navlink">
                      <NavLink
                        style={{ color: "black", textDecoration: "none" }}
                        to={`/${user.id}/boards/${board.id}`}
                      >
                        <div className="board-pics-and-names">
                          <div className="board-images">
                            {board &&
                            board?.pins[0] &&
                            board?.pins[0]?.images[0]?.image_url ? (
                              <div>
                                <img
                                  className="board-image"
                                  src={
                                    board &&
                                    board?.pins[0] &&
                                    board?.pins[0]?.images[0] &&
                                    board?.pins[0]?.images[0]?.image_url
                                  }
                                />
                              </div>
                            ) : (
                              <div className="board-image">
                                <img
                                  style={{ width: "200px" }}
                                  src="https://res.cloudinary.com/dwphwqyrn/image/upload/v1685677596/placeholder_image_e63dos.jpg"
                                />
                              </div>
                            )}
                          </div>

                          <div className="board-name">{board?.name}</div>
                          <div>
                            {board?.pins?.length == 1 ? (
                              <div>{board?.pins?.length} Pin </div>
                            ) : (
                              <div>{board?.pins?.length} Pins</div>
                            )}
                          </div>
                        </div>
                      </NavLink>
                    </div>
                    {/* <div>{board.description}</div> */}
                    <div className="edit-board-button">
                      <img
                        style={{ width: "30px" }}
                        src="https://res.cloudinary.com/dwphwqyrn/image/upload/v1685734560/edit_pen_bbwcgf.png"
                        onClick={() =>
                          handleUpdateBoard(board.id, board.user_id)
                        }
                      />
                    </div>
                    <img
                      style={{ width: "37px" }}
                      src="https://res.cloudinary.com/dwphwqyrn/image/upload/v1685734970/trash_icon_gd02pe.jpg"
                      onClick={() => handleDeleteBoard(board.id, board.user_id)}
                    />
                  </div>
                </>
              );
            })}
          </div>
        </div>
      ) : (
        "Please log in to view this page"
      )}
    </div>
  );
};

export default Boards;
