import { useEffect } from "react";
import { getPinDetails } from "../../store/pin";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min";

const PinDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const pin = useSelector((state) => {
    return state?.pin.details;
  });
  //   console.log(pins, "PINS****");

  useEffect(() => {
    dispatch(getPinDetails(id));
  }, [dispatch]);

  const pins = useSelector((state) => {
    return Object.values(state?.pin);
  });

  return (
    <div>
      <div>{pin.name}</div>
      <div>{pin.description}</div>
    </div>
  );
};

export default PinDetails;
