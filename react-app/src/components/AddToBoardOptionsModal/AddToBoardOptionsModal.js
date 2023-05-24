import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addPinToBoard, getAllBoards } from "../../store/board";
import { useModal } from "../../context/Modal";

const AddToBoardOptionsModal = ({ pin, user }) => {
  console.log(pin, user, "pin select****");
  const { closeModal } = useModal();
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const boards = useSelector((state) => {
    return Object.values(state?.board);
  });
  console.log(setSelectedBoard, "SET BOARD STATE");
  console.log(boards, "*****BOARDS OPTIONS***");
  //   const user = useSelector((state) => {
  //     return state.session.user.id;
  //   });

  const handleBoardOptions = (e) => {
    setSelectedBoard(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllBoards(user));
  }, [dispatch, user]);

  const handleAddToBoard = (pin) => {
    if (selectedBoard) {
      dispatch(addPinToBoard(user, selectedBoard, pin.id));
      closeModal();
    } else {
      alert("Select a board first");
    }
  };
  return (
    <div>
      <select onChange={(e) => handleBoardOptions(e)}>
        <option value="">Select a board</option>
        {boards?.map((board) => {
          return (
            <option key={board.id} value={board.id}>
              {board?.name}
            </option>
          );
        })}
      </select>
      <button onClick={() => handleAddToBoard(pin)}>Save</button>
    </div>
  );
};

export default AddToBoardOptionsModal;
