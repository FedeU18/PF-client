import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import resetPassword from '../../Authentication/functions/resetPassword'

const ForgotPassword = () => {
  const [email, setEmail] = useState("")

  const IForgotMyPassword = () => {
    resetPassword()
  }

  return (
    <div className='vh-100 w-100 bg-primary d-flex justify-content-center align-items-center'>
      <div className='mb-4'>
        <div>
          <h1 className='fw-bolder'>¿Perdiste tu Contraseña?</h1>
          <p className='text-center'>lo sentimos..., pero ¡no te preocupes! <br />
            nosotros siempre pensamos en ti 💖<br />
          </p>

          <h4 className='fw-bolder'>Necesitamos tu email:</h4>
        </div>
        <div style={{maxWidth: "300px"}}>
          <div>
            <input
              name='email-reset'
              type="email"
              value={email}
              className="form-control fs-6 rounded-1"
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <button type='submit' className='btn btn-success'>Recuperar</button>
          </div>
        </div>
        <Link to="/" className='fs-5 text-danger mt-3 d-block'>Regresar</Link>
      </div>
    </div>
  )
}

export default ForgotPassword