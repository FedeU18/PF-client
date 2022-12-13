import React, { useEffect } from "react";
import { BiSad } from "react-icons/bi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styles from "./FailPay.module.css";

const FailPayment = () => {
  const navigate = useNavigate();
  const backToHome = () => {
    localStorage.removeItem("in-process");
    localStorage.removeItem("data-payment");
    navigate("/home");
  };

  return (
    <div>
      <h1 data-aos-duration="3500" className="fw-bolder">
        We're Sorry , Something wrong happend
      </h1>
      <div className="mt-4">
        <p>
          lo sentimos sucedio un error desconocido
          <br />
          porfavor intenta denuevo o mas tarde
        </p>
      </div>
      <BiSad className="fs-1" />

      <div className="mt-4">
        <button
          onClick={backToHome}
          className={`text-dark fw-bolder ${styles.hover_boton}`}
        >
          <IoMdArrowRoundBack className={`fs-1 ${styles.hover_boton_arrow}`} />
          Volver
        </button>
      </div>
    </div>
  );
};

export default FailPayment;
