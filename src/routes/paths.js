const root = {
  boards: ''
}

const paths = {
  boards: () => root.boards,
  board: (boardId) => `${root.boards}/boards/${boardId}`
}

export default paths
