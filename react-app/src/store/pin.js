const LOAD = "/pins/LOAD";
const LOAD_DETAILS = "/pins/LOAD_DETAILS";
const ADD_PIN = "/pins/ADD_PIN";
const load = (list) => ({
  type: LOAD,
  list,
});

const loadDetails = (id) => ({
  type: LOAD_DETAILS,
  id,
});

const addPin = (pin) => ({
  type: ADD_PIN,
  pin,
});

export const getAllPins = () => async (dispatch) => {
  const response = await fetch("/api/pins");

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list.pins));
  }
};

export const getPinDetails = (id) => async (dispatch) => {
  const response = await fetch(`/api/pins/${id}`);
  if (response.ok) {
    const pin = await response.json();
    dispatch(loadDetails(pin));
  }
};

export const addNewPin = (data) => async (dispatch) => {
  const response = await fetch("/api/pins/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const pin = await response.json();
    dispatch(addNewPin(pin));
    return pin;
  }
};
const initialState = {};

const pinReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const newState = {};
      action.list.forEach((pin) => {
        newState[pin.id] = pin;
      });
      return {
        ...newState,
      };
    case LOAD_DETAILS:
      return { ...state, details: action.id };
    case ADD_PIN:
      return { ...state, [action.pin.id]: action.pin };
    default:
      return state;
  }
};

export default pinReducer;
