import { useEffect, useState } from "react";
import { getAllPins } from "../../store/pin";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import AddToBoardOptionsModal from "../AddToBoardOptionsModal/AddToBoardOptionsModal";
import { getAllBoards } from "../../store/board";
import SearchBar from "../SearchBar/SearchBar";
const LandingPage = () => {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const [showModal, setShowModal] = useState(false);
  const [selectedPin, setSelectedPin] = useState(null);
  //   const pins = useSelector((state) => {
  //     return state?.pin;
  //   });
  //   console.log(pins, "PINS****");
  const sessionUser = useSelector((state) => {
    return state?.session?.user;
  });
  const pins = useSelector((state) => {
    return Object.values(state?.pin);
  });
  const boards = useSelector((state) => {
    return Object.values(state?.board);
  });

  console.log(boards, "*****BOARDS OPTIONS***");
  const user = useSelector((state) => {
    return state?.session?.user?.id;
  });

  useEffect(() => {
    dispatch(getAllPins());
    if (user) {
      dispatch(getAllBoards(user));
    }
  }, [dispatch, user]);

  const openModal = () => {
    setShowModal(true);
  };
  //   const handleBoardOptions = (pin) => {
  //     console.log(pin, "pin selected in handler******");
  //     setSelectedPin(pin);
  //     // setModalContent(<AddToBoardOptionsModal pin={selectedPin} user={user} />);
  //     openModal();
  //   };

  const handlePinClick = (pin) => {
    console.log(pin, "pin selected button *****");
    // setSelectedPin(pin);
    // console.log(selectedPin, "SELECTED PIN LANDING PAGE***");
    setModalContent(<AddToBoardOptionsModal pin={pin} user={user} />);
    openModal();
  };

  const handleSearchClick = () => {
    setModalContent(<SearchBar />);
    openModal();
  };
  return (
    <div>
      {sessionUser && user ? (
        <div>
          <NavLink to={`/${user}/boards`}>Profile</NavLink>
          <NavLink to={`/create-pin`}>Create new pin</NavLink>
        </div>
      ) : (
        <br />
      )}

      <div>
        <button onClick={() => handleSearchClick()}>Search</button>
        {pins?.map((pin) => {
          return (
            <div>
              {/* <button onClick={handleBoardOptions()}>Add Pin to Board</button> */}
              {/* <button onClick={() => setShowModal(true)}>
                Add Pin to Board
              </button> */}
              {sessionUser ? (
                <button onClick={() => handlePinClick(pin)}>
                  Add to Board
                </button>
              ) : (
                <br />
              )}
              <NavLink
                //   key={pin?.id}
                to={`/pins/${pin.id}`}
              >
                <img
                  src={pin && pin?.images && pin?.images[0]?.image_url}
                  style={{ width: "450px", height: "400px" }}
                />

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
