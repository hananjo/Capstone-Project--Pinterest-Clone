import { unstable_renderSubtreeIntoContainer } from "react-dom";

const LOAD_BOARD = "board/LOAD_BOARDS";
const ADD_BOARD = "board/ADD_BOARDS";

const loadBoard = (list) => ({
  type: LOAD_BOARD,
  list,
});

const addBoard = (board) => ({
  type: ADD_BOARD,
  board,
});

export const getAllBoards = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/boards`);
  if (response.ok) {
    const list = await response.json();
    console.log(list, "*****list");
    dispatch(loadBoard(list));
  }
};

export const addNewBoard = (data, id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/boards`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const board = await response.json();
    dispatch(addBoard(board));
    return board;
  }
};

export const updateBoard = (userId, id, data) => async (dispatch) => {
  const { name, description, user_id } = data;
  const response = await fetch(`/api/users/${userId}/boards/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description, user_id }),
  });
  if (response.ok) {
    const board = await response.json();
    dispatch(addBoard(board));
    return board;
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
    case ADD_BOARD:
      return { ...state, [action.board.id]: action.board };
    default:
      return state;
  }
};

export default boardReducer;
