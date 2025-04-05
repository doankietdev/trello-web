import { useRoutes } from 'react-router-dom'
import Boards from '~/pages/Boards'
import Board from '~/pages/Boards/_id'
import paths from './paths'
import DefaultLayout from '~/layouts'
import PageNotFound from '~/pages/PageNotFound/PageNotFound'
import Auth from '~/pages/Auth/Auth'
import AccountVerification from '~/pages/Auth/AccountVerification'
import { useSelector } from 'react-redux'
import { currentUserSelector } from '~/redux/selectors'
import ProtectedRoute from '~/components/ProtectedRoute/ProtectedRoute'

export default function Routes() {
  const user = useSelector(currentUserSelector)

  return useRoutes([
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        {
          element: <ProtectedRoute user={user} />,
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
      ]
    },
    {
      path: paths.login(),
      element: <Auth />
    },
    {
      path: '/register',
      element: <Auth />
    },
    {
      path: '/account/verification',
      element: <AccountVerification />
    },
    {
      path: '*',
      element: <PageNotFound />
    }
  ])
}
