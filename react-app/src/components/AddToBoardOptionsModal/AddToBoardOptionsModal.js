import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addPinToBoard, getAllBoards } from "../../store/board";

const AddToBoardOptionsModal = ({ pin }) => {
  console.log(pin, "pin select****");
  const [board, setBoard] = useState("");
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const boards = useSelector((state) => {
    return Object.values(state?.board);
  });
  console.log(setSelectedBoard, "SET BOARD STATE");
  console.log(boards, "*****BOARDS OPTIONS***");
  const user = useSelector((state) => {
    return state.session.user.id;
  });

  const handleBoardOptions = (e) => {
    setSelectedBoard(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllBoards(user));
  }, [dispatch, user]);

  const handleAddToBoard = () => {
    if (selectedBoard) {
      dispatch(addPinToBoard(user, selectedBoard, pin));
    }
  };
  return (
    <div>
      {boards?.map((board) => {
        <div>{board?.name}</div>;
      })}
      <select
        name="name"
        value={board.id}
        onChange={(e) => handleBoardOptions(e)}
      >
        <option value="">Select a board</option>
        {boards?.map((board) => {
          return <option>{board?.name}</option>;
        })}
      </select>
      <button onClick={handleAddToBoard}>Save</button>
    </div>
  );
};

export default AddToBoardOptionsModal;
