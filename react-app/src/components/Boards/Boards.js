import { getAllBoards } from "../../store/board";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import CreateBoardModal from "../CreateBoardModal/CreateBoardModal";
import UpdateBoardForm from "../UpdateBoardForm/UpdateBoardForm";
import DeleteBoardModal from "../DeleteBoardModal/DeleteBoardModal";
const Boards = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { setModalContent } = useModal();
  const [showModal, setShowModal] = useState(false);

  const boards = useSelector((state) => {
    return Object.values(state?.board);
  });

  console.log("BOARDS****", boards);
  useEffect(() => {
    dispatch(getAllBoards(id));
  }, [dispatch, id]);

  const openModal = () => {
    setShowModal(true);
  };
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
  return (
    <div>
      <button onClick={() => handleCreateBoard()}>Add new board</button>
      {boards?.map((board) => {
        return (
          <>
            <div>{board.name}</div>
            {/* <div>{board.description}</div> */}
            <button onClick={() => handleUpdateBoard(board.id, board.user_id)}>
              Update Board
            </button>
            <button onClick={() => handleDeleteBoard(board.id, board.user_id)}>
              Delete Board
            </button>
          </>
        );
      })}
    </div>
  );
};

export default Boards;
