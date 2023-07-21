import { useEffect, useState } from "react";
import { getAllPins } from "../../store/pin";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import AddToBoardOptionsModal from "../AddToBoardOptionsModal/AddToBoardOptionsModal";
import { getAllBoards } from "../../store/board";
import "./LandingPage.css";
import BarLoader from "react-spinners/BarLoader";
const LandingPage = () => {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const [showModal, setShowModal] = useState(false);
  const [selectedPin, setSelectedPin] = useState(null);
  const [loading, setLoading] = useState(false);
  const sessionUser = useSelector((state) => {
    return state?.session?.user;
  });
  const pins = useSelector((state) => {
    return Object.values(state?.pin);
  });
  const boards = useSelector((state) => {
    return Object.values(state?.board);
  });
  const user = useSelector((state) => {
    return state?.session?.user?.id;
  });

  useEffect(() => {
    dispatch(getAllPins());
    if (user) {
      dispatch(getAllBoards(user));
    }
  }, [dispatch, user]);


  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 350);
  }, []);

  const openModal = () => {
    setShowModal(true);
  };


  const handlePinClick = (pin) => {


    setModalContent(<AddToBoardOptionsModal pin={pin} user={user} />);
    openModal();
  };



  return (
    <div className="landing-page">
      <div>
        {loading ? (
          <>
            <div className="loader-landing">
              <p className="loading">Loading...</p>
              <BarLoader
                color="#f32420"
                height={10}
                speedMultiplier={1}
                width={200}
              />
            </div>
          </>
        ) : sessionUser && user ? (
          <div>
            <div className="your-pins">
              <NavLink className="your-pins-link" to={`/your-pins`}>
                Your Pins &gt;
              </NavLink>
            </div>

            <div className="pin-create-button-container">
              <NavLink to={`/create-pin`}>
                <img
                  className="pin-create-button"
                  style={{ width: "50px" }}
                  src="https://res.cloudinary.com/dwphwqyrn/image/upload/v1685586576/add_button_icon_pc5nvr.png"
                />
              </NavLink>
            </div>
          </div>
        ) : (
          <br />
        )}
      </div>

      <div className="pins-container">
        {pins?.map((pin) => {
          return (
            <div className="pins">
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

                to={`/pins/${pin.id}`}
              >
                <div className="grid-wrapper">
                  <div className="pin-photos">
                    <img
                      src={pin && pin?.images && pin?.images[0]?.image_url}
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
