import { useRoutes } from 'react-router-dom'
import Boards from '~/pages/Boards'
import Board from '~/pages/Boards/_id'
import paths from './paths'
import DefaultLayout from '~/layouts'

export default function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        {
          path: paths.boards(),
          element: <Boards />
        },
        {
          path: paths.board(':boardId'),
          element: <Board />
        }
      ]
    }
  ])
}
