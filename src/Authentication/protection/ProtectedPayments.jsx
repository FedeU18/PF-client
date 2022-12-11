import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const verifyPayment = () => {
  const payment = localStorage.getItem("data-payment");
  const dataJSON = JSON.parse(payment);

  if (dataJSON) return true;
  else return false;
};

const ProtectedPayments = () => {
  const verify = verifyPayment();

  return verify ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedPayments;
