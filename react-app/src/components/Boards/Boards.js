import { getAllBoards } from "../../store/board";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import CreateBoardModal from "../CreateBoardModal/CreateBoardModal";
const Boards = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { setModalContent } = useModal();
  const [showModal, setShowModal] = useState(false);

  const boards = useSelector((state) => {
    return Object.values(state?.board);
  });

  console.log("BOARDS", boards);
  useEffect(() => {
    dispatch(getAllBoards(id));
  }, [dispatch, id]);

  const openModal = () => {
    setShowModal(true);
  };
  const handleCreateBoard = () => {
    setModalContent(<CreateBoardModal/>);
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
          </>
        );
      })}
    </div>
  );
};

export default Boards;
