import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const verifyAuth = () => {
  const user = localStorage.getItem("user")

  if (user) return true
  else return false
}

const ProtectedRoute = () => {
  const verify = verifyAuth()

  return verify ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoute;