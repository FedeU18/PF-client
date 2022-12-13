import React from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const Mailer = () => {
  const navigate = useNavigate();
  const DATAPARSE = JSON.parse(localStorage.getItem("data-payment"));
  const { day, duration, emailAlumno, emailProfesor } = DATAPARSE;

  const sendEmail = (event) => {
    event.preventDefault();

    emailjs
      .sendForm(
        "service_evc8spm",
        "template_a89bvb8",
        event.target,
        "UPnzqVqP0HfC1t79u"
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    emailjs
      .sendForm(
        "service_evc8spm",
        "template_aov76gg",
        event.target,
        "UPnzqVqP0HfC1t79u"
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    localStorage.removeItem("in-process")
    localStorage.removeItem("data-payment");
    navigate("/home");
  };

  return (
    <form className="bg-success border-0 d-flex justify-content-center" onSubmit={sendEmail}>
      <div className="d-none">
        <h2>Email factura</h2>
        <div>
          <input
            type="email"
            className="form-control"
            name="user_email_profesor"
            defaultValue={emailProfesor}
          />

          <input
            type="email"
            className="form-control"
            name="user_email_alumno"
            defaultValue={emailAlumno}
          />

          <textarea
            cols="10"
            rows="4"
            className="form-control"
            name="profe_message"
            defaultValue={`¡Hola! nos alegra comentarte que Un ¡Alumno Te Eligió como Su tutor! para el dia ${day} a las ${duration}`}
          ></textarea>

          <textarea
            cols="20"
            rows="5"
            className="form-control"
            name="user_message"
            defaultValue={`tu reserva fue Realizada con Éxito Enviamos un Email a tu profesor para que ambos puedan ponerse en contacto dia ${day} a las ${duration}`}
          ></textarea>
        </div>
      </div>
      <button type="submit" className="btn btn-dark p-2">
        Volver
      </button>
    </form>
  );
};

export default Mailer;
