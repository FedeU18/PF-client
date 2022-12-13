import React, { useEffect, useState } from "react";
import { BsPatchCheckFill } from "react-icons/bs";
// import styles from "./FailPay.module.css";
import Mailer from "./Mailer";

const SuccessPayment = () => {
  const [sender, setSender] = useState(false);

  useEffect(() => {
    const dataPayment = localStorage.getItem("data-payment");
    if (dataPayment) {
      setSender(true);
    } else {
      setSender(false);
    }
  }, []);

  return (
    <div>
      <h1 data-aos-duration="3500" data-aos="fade-down" className="fw-bolder">
        Success Payment, Everything is Fine!,
        <br /> Congratulations
      </h1>
      <div className="mt-3" data-aos="fade-down" data-aos-duration="4000">
        <p>
          todo fue procesado correctamente
          <br />
          gracias por elegir estudiar con nuestros muy capacitados
          <br />
          profesores
        </p>
      </div>
      <BsPatchCheckFill className="fs-1" />

      <div className="mt-5">{sender && <Mailer />}</div>
    </div>
  );
};

export default SuccessPayment;
