import { useRoutes } from 'react-router-dom'
import Boards from '~/pages/Boards'
import Board from '~/pages/Boards/_id'
import paths from './paths'
import DefaultLayout from '~/layouts'
import PageNotFound from '~/pages/PageNotFound/PageNotFound'
import Auth from '~/pages/Auth/Auth'

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
    },
    {
      path: '/login',
      element: <Auth />
    },
    {
      path: '/register',
      element: <Auth />
    },
    {
      path: '*',
      element: <PageNotFound />
    }
  ])
}
