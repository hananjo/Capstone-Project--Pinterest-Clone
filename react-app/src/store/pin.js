const LOAD = "/pins/LOAD";
const LOAD_DETAILS = "/pins/LOAD_DETAILS";
const ADD_PIN = "/pins/ADD_PIN";
const REMOVE_PIN = "/pins/REMOVE_PIN";
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

const removePin = (pin) => ({
  type: REMOVE_PIN,
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
    dispatch(addPin(pin));
    return pin;
  }
};

export const updatePin = (id, data) => async (dispatch) => {
  const response = await fetch(`/api/pins/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const pin = await response.json();
    dispatch(addPin(pin));
    return pin;
  }
};

export const deletePin = (id) => async (dispatch) => {
  const response = await fetch(`/api/pins/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const pin = await response.json();
    dispatch(removePin(pin));
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
    case REMOVE_PIN:
      const deleteNewState = { ...state };
      delete deleteNewState[action.pin.id];
      return deleteNewState;
    default:
      return state;
  }
};

export default pinReducer;
