const SEARCH_KEYWORDS = "/search/SEARCH_KEYWORDS";

const searchKeywords = (pins) => ({
  type: SEARCH_KEYWORDS,
  pins,
});

export const searchPins = (keyword) => async (dispatch) => {

  const response = await fetch("/api/pins/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ keyword }),
  });

  if (response.ok) {
    const pins = await response.json();
    dispatch(searchKeywords(pins));
  }
};

const initialState = {};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_KEYWORDS:
      const newState = {};
      action.pins.forEach((pin) => {
        newState[pin.id] = pin;
      });
      return { ...newState };
    default:
      return state;
  }
};

export default searchReducer;
