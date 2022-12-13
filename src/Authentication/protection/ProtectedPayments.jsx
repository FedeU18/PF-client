import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const verifyPayment = () => {
  const payment = localStorage.getItem("in-process");
  const dataJSON = JSON.parse(payment);

  if (dataJSON) return true;
  else return false;
};

const ProtectedPayments = ({children}) => {
  const verify = verifyPayment();

  return verify ? children : <Navigate to="/home" />;
};

export default ProtectedPayments;
