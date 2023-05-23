import { useEffect } from "react";
import { getAllPins } from "../../store/pin";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const LandingPage = () => {
  const dispatch = useDispatch();

  //   const pins = useSelector((state) => {
  //     return state?.pin;
  //   });
  //   console.log(pins, "PINS****");

  useEffect(() => {
    dispatch(getAllPins());
  }, [dispatch]);
  const pins = useSelector((state) => {
    return Object.values(state?.pin);
  });

  return (
    <div>
      <div>
        {pins?.map((pin) => {
          return (
            <NavLink to={`/pins/${pin.id}`}>
              {pin?.images[0]?.image_url}
              {pin?.name}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default LandingPage;
