import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getAllPins } from "../../store/pin";
import { deletePin } from "../../store/pin";

const DeletePinModal = ({ id }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  const removePin = async (e) => {
    e.preventDefault();
    await dispatch(deletePin(id));
    await dispatch(getAllPins());
    closeModal();
    history.push(`/`);
  };
  return (
    <div className="confirm-delete-container">
      <h2 className="confirm-delete-h2">Delete Pin Confirmation</h2>
      <p className="confirm-delete-message">
        Are you sure you want to delete this pin?
      </p>

      <div className="confirmation-buttons">
        <button className="delete-yes-choices" onClick={removePin}>
          Yes
        </button>

        <button className="delete-no-choices" onClick={closeModal}>
          No
        </button>
      </div>
    </div>
  );
};

export default DeletePinModal;
