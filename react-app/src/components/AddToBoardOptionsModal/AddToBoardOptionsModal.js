import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addPinToBoard, getAllBoards } from "../../store/board";
import CreateBoardLandingPage from "../CreateBoardLandingPage/CreateBoardLandingPage";
import { useModal } from "../../context/Modal";
import "./AddToBoardOptionsModal.css";
const AddToBoardOptionsModal = ({ pin, user }) => {
  console.log(pin, user, "pin select****");
  const { closeModal } = useModal();
  const { setModalContent } = useModal();
  const [selectedBoard, setSelectedBoard] = useState(null);
  //   const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const boards = useSelector((state) => {
    return Object.values(state?.board);
  });
  const boardChosen = useSelector((state) => {
    return state?.board[selectedBoard];
  });

  console.log(boardChosen, "BOARDCHOSEN*******");

  // const boards_index = useSelector((state) => {
  //   const pins = state?.board[selectedBoard]?.pins;
  //   return pins;
  // });

  // console.log(boards_index, "BOARDS_INDEX");
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

  // const handleAddToBoard = (pin) => {
  //   if (selectedBoard) {
  //     dispatch(addPinToBoard(user, selectedBoard, pin.id));
  //     closeModal();
  //   } else {
  //     alert("Select a board first");
  //   }
  // };
  const handleCreateBoard = () => {
    setModalContent(<CreateBoardLandingPage pin={pin} />);
  };

  const handleAddToBoard = (pin) => {
    let isPinOnBoard = false;
    if (boardChosen && boardChosen.pins) {
      for (const pinIndex in boardChosen.pins) {
        const pinsObj = boardChosen.pins[pinIndex];

        if (pinsObj.id === pin.id) {
          isPinOnBoard = true;
        }
      }
    }
    if (isPinOnBoard) {
      alert("This pin is already in the board");
    } else {
      if (selectedBoard) {
        console.log(selectedBoard, "SELECTED BOARD OPTIONS");
        dispatch(addPinToBoard(user, selectedBoard, pin.id));
        dispatch(getAllBoards(user));
        closeModal();
        // setModalContent(<CreateBoard)
      } else {
        alert("Select a board first");
      }
    }
  };
  // const handleAddToBoard = (pin) => {
  //   console.log(
  //     boards_index[selectedBoard],
  //     "SELECTED BOARD HANDLE SUBMIT%%%%%%%"
  //   );
  //   const pins_in_board = Object.values(boards_index).map((pin_in_board) => {
  //     if (pin_in_board.id === pin.id) {
  //       return true;
  //     }
  //   });
  //   console.log(pins_in_board, "PINS IN BOARDS ########");
  //   if (pins_in_board) {
  //     alert(`This pin is already in the board`);
  //   } else {
  //     if (selectedBoard && !pins_in_board) {
  //       dispatch(addPinToBoard(user, selectedBoard, pin.id));
  //       closeModal();
  //     } else {
  //       alert("Select a board first");
  //     }
  //   }
  // };
  return (
    <div className="options-container">
      <div className="board-options-container">
        <div>
          <select
            size="5"
            className="board-selections"
            onChange={(e) => handleBoardOptions(e)}
          >
            <option value="">Select a board</option>
            {boards?.map((board) => {
              return (
                <option key={board.id} value={board.id}>
                  {board?.name}
                </option>
              );
            })}
            {selectedBoard === "createNewBoard" ? null : (
              <option value="createNewBoard">+ Create new board</option>
            )}
            {selectedBoard === "createNewBoard" && (
              <button onClick={handleCreateBoard()}> + Create New Board</button>
            )}
            ;
          </select>
        </div>
        <div className="save-to-board-button">
          <button
            className="save-to-board-button-2"
            onClick={() => handleAddToBoard(pin)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToBoardOptionsModal;
