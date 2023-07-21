const LOAD_BOARD = "board/LOAD_BOARDS";
const LOAD_DETAILS = "board/LOAD_DETAILS";
const ADD_BOARD = "board/ADD_BOARDS";
const REMOVE_BOARD = "/board/REMOVE_BOARD";
const ADD_PIN_TO_BOARD = "/board/ADD_PIN_TO_BOARD";

const loadBoard = (list) => ({
  type: LOAD_BOARD,
  list,
});

const loadDetails = (id) => ({
  type: LOAD_DETAILS,
  id,
});
const addBoard = (board) => ({
  type: ADD_BOARD,
  board,
});

const removeBoard = (board) => ({
  type: REMOVE_BOARD,
  board,
});

const addPinBoard = (pinId, boardId) => ({
  type: ADD_PIN_TO_BOARD,
  pinId,
  boardId,
});

export const addPinToBoard = (userId, boardId, pinId) => async (dispatch) => {
  const response = await fetch(
    `/api/users/${userId}/boards/${boardId}/pins/${pinId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
  );
  if (response.ok) {
    dispatch(addPinBoard(pinId, boardId));
  }
};
export const getAllBoards = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/boards`);
  if (response.ok) {
    const list = await response.json();

    dispatch(loadBoard(list));
  }
};

export const getBoardDetails = (userId, id) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/boards/${id}`);
  if (response.ok) {
    const board = await response.json();
    dispatch(loadDetails(board));
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

export const deleteBoard = (userId, id) => async (dispatch) => {

  const response = await fetch(`/api/users/${userId}/boards/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const board = await response.json();
    dispatch(removeBoard(board));
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
    case LOAD_DETAILS:
      return { ...state, details: action.id };
    case REMOVE_BOARD:
      const deleteNewState = { ...state };
      delete deleteNewState[action.board.id];
      return deleteNewState;
    case ADD_PIN_TO_BOARD:
      return {
        ...state,
        [action.boardId]: {
          ...state[action.boardId],
          pins: [...state[action.boardId].pins, action.pinId],
        },
      };
    default:
      return state;
  }
};

export default boardReducer;
