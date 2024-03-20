const routesConfig = {
  boards: () => '/',
  board: (boardId) => (boardId ? `/${boardId}` : '/:boardId')
}

export default routesConfig
