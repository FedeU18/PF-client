import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const verifyAuth = () => {
  const user = localStorage.getItem("user")

  if (user) {
    return true
  } else {
    return false
  }
}

const PublicRoutes = () => {
  const verify = verifyAuth()

  return verify ? <Navigate to="/home" /> : <Outlet />;
}

export default PublicRoutes;