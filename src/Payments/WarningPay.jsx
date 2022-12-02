import React from 'react'
import { GrStatusWarning } from "react-icons/gr"
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import styles from "./FailPay.module.css"

const WarningPay = () => {
  return (
    <div className='mb-3'>
      <h1 data-aos-duration="3500" className='fw-bolder text-dark mt-3' >Esta no es una ruta correcta!,  <br />Por favor no manipules la url</h1>
      <div>
        <p className='text-dark'>esto puede suceder por
          <br />
          manipular la url o por errores del usuario</p>
      </div>
      <GrStatusWarning className='fs-1' />
      <div className='mt-5'>
        <Link className={`text-dark fw-bolder ${styles.hover_boton}`} to="/home"><IoMdArrowRoundBack className={`fs-1 ${styles.hover_boton_arrow}`} />Volver</Link>
      </div>
    </div>
  )
}

export default WarningPay