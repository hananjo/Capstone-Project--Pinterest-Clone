const LOAD_BOARD = "board/LOAD_BOARDS";

const loadBoard = (list) => ({
  type: LOAD_BOARD,
  list,
});

export const getAllBoards = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/boards`);
  if (response.ok) {
    const list = await response.json();
    console.log(list, "*****list");
    dispatch(loadBoard(list));
  }
};

const initialState = {};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BOARD:
      const newState = {};
      action.list.forEach((board) => {
        newState[board.id] = board;
      });
      return { ...newState };
    default:
      return state;
  }
};

export default boardReducer;
