import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ user }) => {
  const location = useLocation();

  if (user.isAuth) {
    // return <Navigate to="/home" state={{from: location}} replace/>
  }

  return <Outlet />
}

export default ProtectedRoute;