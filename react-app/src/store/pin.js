const LOAD = "/pins/LOAD";
const LOAD_DETAILS = "/pins/LOAD_DETAILS";

const load = (list) => ({
  type: LOAD,
  list,
});

const loadDetails = (id) => ({
  type: LOAD_DETAILS,
  id,
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
    if(response.ok) {
        const pin = await response.json();
        dispatch(loadDetails(pin))
    }
}

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
    default:
      return state;
    case LOAD_DETAILS:
      return { ...state, details: action.id };
  }
};

export default pinReducer;
