const LOAD_COMMENTS = "/comments/LOAD_COMMENTS";
const ADD_COMMENT = "/comments/ADD_COMMENT";
const REMOVE_COMMENT = "/comments/REMOVE_COMMENT";

const load = (list) => ({
  type: LOAD_COMMENTS,
  list,
});

const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment,
});

const removeComment = (comment) => ({
    type: REMOVE_COMMENT,
    comment,
})
export const getAllComments = (id) => async (dispatch) => {
  const response = await fetch(`/api/pins/${id}/comments`);
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

export const addNewComment = (data, id) => async (dispatch) => {

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

export const updateComment = (pinId, id, data) => async (dispatch) => {

  const response = await fetch(`/api/pins/${pinId}/comments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const comment = await response.json();
    dispatch(addComment(comment));
    return comment;
  }
};

export const deleteComment = (pinId, id) => async (dispatch) => {
    const response = await fetch(`/api/pins/${pinId}/comments/${id}`, {
        method: 'DELETE',
    })
    if(response.ok) {
        const comment = await response.json()
        dispatch(removeComment(comment))
    }
}
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
    case REMOVE_COMMENT:
        const deleteNewState = {...state};
        delete deleteNewState[action.comment.id];
        return deleteNewState
    default:
      return state;
  }
};

export default commentReducer;
