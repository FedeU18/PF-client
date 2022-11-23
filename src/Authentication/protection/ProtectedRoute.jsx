import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ user }) => {
  const navigate = useNavigate()
  console.log(user);
  // 
  useEffect(() => {
    if (!user) { // user === null ? nav("/") : nav("/home")
      console.log("no registrado");
      navigate("/")
    }
  }, [])

  return <Outlet />
}

export default ProtectedRoute;