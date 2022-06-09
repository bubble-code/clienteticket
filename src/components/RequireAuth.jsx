import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
const RequireAuth = () => {

  const { auth } = useAuth();
  const location = useLocation();
  const { user } = auth;
  console.log({ user });

  return (
    user ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default RequireAuth;