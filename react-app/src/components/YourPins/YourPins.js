import { useEffect, useState } from "react";
import { getAllPins } from "../../store/pin";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import AddToBoardOptionsModal from "../AddToBoardOptionsModal/AddToBoardOptionsModal";
import { getAllBoards } from "../../store/board";

const YourPins = () => {
  const dispatch = useDispatch();

  const { setModalContent } = useModal();

  const [showModal, setShowModal] = useState(false);

  const [selectedPin, setSelectedPin] = useState(null);

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
        {sessionUser && user ? (
          <div className="pin-create-button-container">
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

      <div className="pins-container">
        {pins?.map((pin) => {
          return (
            <div>
              {pin?.user_id === user ? (
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

                  <NavLink to={`/pins/${pin.id}`}>
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
                </div>
              ) : (
                <br />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default YourPins;
