import configs from '~/configs'
import Boards from '~/pages/Boards'
import Board from '~/pages/Boards/_id'

export const publicRoutes = [
  { path: configs.routes.boards(), component: Boards },
  { path: configs.routes.board(), component: Board }
]

export const privateRoutes = []
