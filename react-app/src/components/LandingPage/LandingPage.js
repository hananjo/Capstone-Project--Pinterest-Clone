import { getAllPins } from "../../store/pin";
import { useDispatch, useSelector } from "react-redux";

const LandingPage = () => {
  const dispatch = useDispatch();

  const pins = useSelector((state) => {
    return Object.values(state?.pin);
  });
};

export default LandingPage;
