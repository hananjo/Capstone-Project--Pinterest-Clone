import { useEffect, useState } from "react";
import { getAllPins } from "../../store/pin";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import AddToBoardOptionsModal from "../AddToBoardOptionsModal/AddToBoardOptionsModal";
import { getAllBoards } from "../../store/board";
import "./LandingPage.css";

// import SearchBar from "../SearchBar/SearchBar";
// import { searchPins } from "../../store/search";

const LandingPage = () => {
  const dispatch = useDispatch();

  const { setModalContent } = useModal();
  // const history = useHistory()
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

  // const handleSearchClick = () => {
  //   setModalContent(<SearchBar />);
  //   openModal();
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(searchPins(keyword));
  //   history.push("/search");
  //   // closeModal();
  // };

  return (
    <div className="landing-page">
      <div>
        {/* {boards?.map((board) => {
          return (
            <div>
              {board.name}
              {board && board.pins[0] ? (
                board?.pins[0]?.images[0]?.image_url
              ) : (
                <div>
                  <img
                    style={{ width: "100px" }}
                    src="https://res.cloudinary.com/dwphwqyrn/image/upload/v1685677596/placeholder_image_e63dos.jpg"
                  />
                </div>
              )}
            </div>
          );
        })} */}
        {sessionUser && user ? (
          <div className="pin-create-button-container">
            {/* <NavLink to={`/${user}/boards`}>Profile</NavLink> */}

            <NavLink to={`/create-pin`}>
              <img
                className="pin-create-button"
                style={{ width: "50px" }}
                src="https://res.cloudinary.com/dwphwqyrn/image/upload/v1685586576/add_button_icon_pc5nvr.png"
              />
            </NavLink>
          </div>
        ) : (
          <br />
        )}
      </div>

      {/* <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={keyword}
            placeholder="Search pins"
            onChange={(e) => setKeyword(e.target.value)}
          ></input>
          <button>Search</button>
        </form> */}
      {/* <button onClick={() => handleSearchClick()}>Search</button> */}
      <div className="pins-container">
        {pins?.map((pin) => {
          return (
            <div className="pins">
              {/* <button onClick={handleBoardOptions()}>Add Pin to Board</button> */}
              {/* <button onClick={() => setShowModal(true)}>
                Add Pin to Board
              </button> */}
              {sessionUser ? (
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
              )}

              <NavLink
                //   key={pin?.id}
                to={`/pins/${pin.id}`}
              >
                <div className="grid-wrapper">
                  <div className="pin-photos">
                    <img
                      src={pin && pin?.images && pin?.images[0]?.image_url}
                      // style={{ width: "250px", height: "280px" }}
                      className="pin-images"
                    />
                  </div>
                  <div className="pin-name-landing-page">{pin?.name}</div>
                </div>
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
