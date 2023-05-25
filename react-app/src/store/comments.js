const LOAD_COMMENTS = "/comments/LOAD_COMMENTS";
const ADD_COMMENT = "/comments/ADD_COMMENT";

const load = (list) => ({
  type: LOAD_COMMENTS,
  list,
});

const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment,
});
export const getAllComments = (id) => async (dispatch) => {
  const response = await fetch(`/api/pins/${id}/comments`);
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

export const addNewComment = (data, id) => async (dispatch) => {
  console.log(id, data, "DATA AND ID *********");
  const response = await fetch(`/api/pins/${id}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const comment = await response.json();
    dispatch(addComment(comment));
    return comment;
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
    case ADD_COMMENT:
      return { ...state, [action.comment.id]: action.comment };
    default:
      return state;
  }
};

export default commentReducer;
