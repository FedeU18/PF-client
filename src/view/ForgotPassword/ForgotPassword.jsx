import React, { useState } from "react";
import { Link } from "react-router-dom";
import resetPassword from "../../Authentication/functions/resetPassword";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [exito, setExito] = useState(false);

  const IForgotMyPassword = async () => {
    const data = await resetPassword(email);
    if (data === undefined) {
      setExito(true);
      setTimeout(() => {
        setExito(false);
      }, 10000);
      return;
    }
  };

  return (
    <div
      className="vh-100 w-100 d-flex justify-content-center text-light align-items-center p-4"
      style={{ backgroundColor: "rgb(85, 145, 197)" }}
    >
      <div className="mb-4">
        <div>
          <h1 className="fw-bolder text-center">¿Perdiste tu Contraseña?</h1>
          <p className="text-center">
            lo sentimos..., pero ¡no te preocupes! <br />
            nosotros siempre pensamos en ti 💖
            <br />
          </p>

          <h4 className="fw-bolder text-dark">Necesitamos tu email:</h4>
        </div>
        <div style={{ maxWidth: "300px" }}>
          <div>
            <input
              name="email-reset"
              type="email"
              value={email}
              className="form-control fs-6 rounded-1"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-success"
              onClick={IForgotMyPassword}
            >
              Recuperar
            </button>
          </div>
        </div>
        <Link to="/" className="fs-6 text-light text-danger mt-3 d-block">
          Regresar
        </Link>
        <br />
        {exito && (
          <div
            data-aos="fade-up"
            className="text-center bg-success text-light p-3 rounded-3"
          >
            <h6>
              Te enviamos un correo con un link
              <br />
              que te permitirá restablecer tu contraseña :)
            </h6>
            <p className="fs-6">
              si no aparece en tu buzon puedes buscar en spam
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
