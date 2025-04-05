import { Navigate, Outlet } from 'react-router-dom'
import paths from '~/routes/paths'

function ProtectedRoute({ user }) {
  if (!user) return <Navigate to={paths.login()} replace />
  return <Outlet />
}

export default ProtectedRoute
