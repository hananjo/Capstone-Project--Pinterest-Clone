import { useEffect, useState } from "react";
import { getPinDetails } from "../../store/pin";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min";

const PinDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const pin = useSelector((state) => {
    return state?.pin?.details;
  });
  console.log(pin, "PINS****");
  console.log(pin?.description, "PIN.NAME");

  useEffect(() => {
    dispatch(getPinDetails(id));
  }, [dispatch, id]);

  //   const pins = useSelector((state) => {
  //     return Object.values(state?.pin);
  //   });

  return (
    <div>
      <p>{pin?.name}</p>
      <p>{pin?.description}</p>
      <p>{pin?.images[0]?.image_url}</p>
    </div>
  );
};

export default PinDetails;
