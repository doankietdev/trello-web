const routesConfig = {
  boards: () => '/boards',
  board: (boardId) => boardId ? `/boards/${boardId}` : '/boards/:boardId'
}

export default routesConfig
