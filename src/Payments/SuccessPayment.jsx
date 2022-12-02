import React from 'react'
import { BsPatchCheckFill } from 'react-icons/bs'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import styles from "./FailPay.module.css"


const SuccessPayment = () => {
  return (
    <div>
      <h1 data-aos-duration="3500" data-aos="fade-down" className='fw-bolder'>Success Payment, Everything is Fine!,
        <br /> Congratulations</h1>
      <div className='mt-3' data-aos="fade-down" data-aos-duration="4000">
        <p>todo fue procesado correctamente
          <br />
          gracias por elegir estudiar con nuestros muy capacidaos
          <br />
          profesores</p>
      </div>
      <BsPatchCheckFill className='fs-1' />

      <div className='mt-5'>
        <Link className={`text-dark fw-bolder ${styles.hover_boton}`} to="/home"><IoMdArrowRoundBack className={`fs-1 ${styles.hover_boton_arrow}`} /> Volver</Link>
      </div>
    </div>
  )
}

export default SuccessPayment