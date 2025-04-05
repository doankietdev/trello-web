export const currentBoardSelector = (state) => {
  return state.boards.currentBoard
}

export const boardsSelector = (state) => {
  return state.boards.boards
}

export const currentUserSelector = (state) => {
  return state.user.currentUser
}
