import { useEffect, useState } from "react";
import { getAllPins } from "../../store/pin";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import AddToBoardOptionsModal from "../AddToBoardOptionsModal/AddToBoardOptionsModal";
import { getAllBoards } from "../../store/board";

const LandingPage = () => {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const [showModal, setShowModal] = useState(false);
  const [selectedPin, setSelectedPin] = useState(null);
  //   const pins = useSelector((state) => {
  //     return state?.pin;
  //   });
  //   console.log(pins, "PINS****");

  const boards = useSelector((state) => {
    return Object.values(state?.board);
  });

  console.log(boards, "*****BOARDS OPTIONS***");
  const user = useSelector((state) => {
    return state.session.user.id;
  });

  useEffect(() => {
    dispatch(getAllPins());
    if (user) {
      dispatch(getAllBoards(user));
    }
  }, [dispatch, user]);
  const pins = useSelector((state) => {
    return Object.values(state?.pin);
  });

  const openModal = () => {
    setShowModal(true);
  };
  const handleBoardOptions = (pin) => {
    console.log(pin, "pin selected in handler");
    setSelectedPin(pin);
    setModalContent(<AddToBoardOptionsModal pin={selectedPin} user={user} />);
    openModal();
  };
  return (
    <div>
      <div>
        {pins?.map((pin) => {
          return (
            <div>
              <button onClick={handleBoardOptions}>Add Pin to Board</button>
              {/* <button onClick={() => setShowModal(true)}>
                Add Pin to Board
              </button> */}
              <NavLink to={`/pins/${pin.id}`}>
                {pin?.images[0]?.image_url}
                {pin?.name}
              </NavLink>
              {/*
              {showModal && (
                <div>
                  <select onChange={(e) => handleBoardOptions(e)}>
                    <option value="">Select a board</option>
                    {boards?.map((board) => {
                      return <option>{board?.name}</option>;
                    })}
                  </select>
                  <button>Done</button>
                  <button onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              )} */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LandingPage;
