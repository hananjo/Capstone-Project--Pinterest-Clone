const LOAD_COMMENTS = "/comments/LOAD_COMMENTS";

const load = (list) => ({
  type: LOAD_COMMENTS,
  list,
});

export const getAllComments = (id) => async (dispatch) => {
  const response = await fetch(`/api/pins/${id}/comments`);
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

const initialState = {};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COMMENTS:
      const newState = {};
      action.list.forEach((comment) => {
        newState[comment.id] = comment;
      });
      return {
        ...newState,
      };
    default:
      return state;
  }
};

export default commentReducer;
