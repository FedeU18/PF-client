import React from 'react'
import { useParams } from 'react-router-dom'
import FailPayment from './FailPayment'
import SuccessPayment from './SuccessPayment'
import WarningPay from './WarningPay'

const TypeOfProcessPay = () => {
  const { type } = useParams()
  console.log(type)
  return (
    <div className={`${type === "fail" ? "bg-danger" : type === "success" ? "bg-success" : "bg-warning"} w-100 vh-100 text-light d-flex justify-content-center text-center align-items-center p-5`}>
      {type === "success" && <SuccessPayment />}
      {type === "fail" && <FailPayment />}
      {type !== "success" && type !== "fail" && <WarningPay />}
    </div>
  )
}

export default TypeOfProcessPay