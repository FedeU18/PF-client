import React from 'react'
import { BiSad } from 'react-icons/bi'
import { IoMdArrowRoundBack } from "react-icons/io"
import { Link } from 'react-router-dom'
import styles from "./FailPay.module.css"

const FailPayment = () => {
  return (
    <div>
      <h1 data-aos-duration="3500" className='fw-bolder'>We're Sorry , Something wrong happend</h1>
      <div className='mt-4'>
        <p>lo sentimos sucedio un error desconocido
          <br />
          porfavor intenta denuevo o mas tarde</p>
      </div>
      <BiSad className='fs-1' />

      <div className='mt-4'>
        <Link className={`text-dark fw-bolder ${styles.hover_boton}`} to="/home"><IoMdArrowRoundBack className={`fs-1 ${styles.hover_boton_arrow}`} />Volver</Link>
      </div>
    </div>
  )
}

export default FailPayment