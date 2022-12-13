import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./Calendario.css";
import { postFecha, getFecha } from "../../redux/Actions/Fecha";
import { useDispatch, useSelector } from "react-redux";
import userAuthenticate from "../../Authentication/functions/user";
import Table from "react-bootstrap/Table";
import StripePagos from "../../Payments/StripePagos";
import { setReservaProfe } from "../../redux/Actions/Mailer";
import { getAlumnoFromAPI, editAlumno } from "../../redux/Actions/Alumno";

const Calendario = ({ profe }) => {
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const [errorDays, setErrorDays] = useState(false);
  const alumno = useSelector((state) => state.alumnos.alumno);

  console.log("pepe", alumno);

  const fechas = useSelector((state) => state.fechas.fechas);
  const theme = useSelector((state) => state.theme.theme);
  console.log("profe: ", profe);
  const user = userAuthenticate();
  const [activate, setActivate] = useState(false);
  const [date, onChange] = useState(new Date());
  const [reserva, setReserva] = useState({
    fecha: "",
    hora: "",
    habilitado: false,
    idProfesor: profe.id,
    idAlumno: "",
  });

  useEffect(() => {
    dispatch(getFecha());
    dispatch(getAlumnoFromAPI(user.userData.id));
  }, []);

  useEffect(() => {
    setActivate(false);
    if (reserva.fecha && reserva.hora) {
      const reservaDate = reserva.fecha.split("-").join("/").split("/");
      const currentDay = new Date().toLocaleDateString().split("/");

      let day = Number(reservaDate[0]) > Number(currentDay[0]);
      // verifica que el dia sea mayor al actual
      let month = Number(reservaDate[1]) >= Number(currentDay[1]);
      // verifica que el mes sea mayor o igual al actual
      let year = Number(reservaDate[2]) >= Number(currentDay[2]);
      // verifica queel año no sea menor sino que sea igual al actual y o mayor

      if (day && month && year) {
        setErrorDays(false);
      } else {
        setErrorDays(true);
      }
    }
    const data = {
      emailProfesor: profe.email,
      emailAlumno: alumno.email,
      duration: reserva.hora,
      day: reserva.fecha,
    };
    dispatch(setReservaProfe(data));
    const DATAJSON = JSON.stringify(data);
    localStorage.setItem("data-payment", DATAJSON);
  }, [reserva.fecha, reserva.hora]);

  useEffect(() => {
    let reservado = {};
    Object.keys(profe).length !== 0 &&
      (reservado = profe.fechas?.find(
        (f) => f.fecha === reserva.fecha && f.hora === reserva.hora
      ));
    if (typeof reservado === "object") {
      if (Object.keys(reservado).length !== 0) {
        setError(true);
      }
    } else {
      setError(false);
    }
  }, [reserva.fecha, reserva.hora]);

  const handleHora = (e) => {
    e.preventDefault();
    setReserva({
      ...reserva,
      hora: e.target.value,
      idAlumno: user.userData.id,
    });
  };


  const handleFecha = (e) => {
    setReserva({
      ...reserva,
      fecha: e.getDate() + "-" + (e.getMonth() + 1) + "-" + e.getFullYear(),
    });
  };

  const handleSubmitFecha = (e) => {
    e.preventDefault();
    dispatch(postFecha(reserva));
    if (!errorDays) {
      setActivate(true);
    }
  };

  const precio = alumno.promo
    ? profe.precio - (profe.precio * 20) / 100
    : profe.precio;

  return (
    <div>
      <div>
        <Calendar
          onClickDay={(e) => handleFecha(e)}
          value={date}
          onChange={onChange}
          defaultView="month"
          minDetail="month"
          maxDetail="month"
        />
      </div>
      <div
        className={`reservasCont mt-3`}
      >
        <div className="all-horarios">
          <div>
            <h2>Horario: </h2>
          </div>
          <div className="horarios">
            <button onClick={(e) => handleHora(e)} value="12:00-13:00">
              12:00-13:00
            </button>
            <button onClick={(e) => handleHora(e)} value="15:00-16:00">
              15:00-16:00
            </button>
            <button onClick={(e) => handleHora(e)} value="17:00-18:00">
              17:00-18:00
            </button>
          </div>
        </div>

        <h2>Tu reserva: </h2>

        <Table striped bordered hover>
          <thead>
            <tr>
              <td>Fecha</td>
              <td>Hora</td>
              <td>Precio</td>
            </tr>
          </thead>
          <tbody >
            <tr>
              <td>{reserva.fecha}</td>
              <td>{reserva.hora}</td>
              {alumno?.promo ? (
                <td>
                  <strike>{profe.precio + "$"}</strike> {precio + "$"}
                </td>
              ) : (
                <td> {profe.precio + "$"} </td>
              )}
            </tr>
          </tbody>
        </Table>

        <div className="reserva w-100 justify-content-evenly align-items-center flex-column">
          <button
            disabled={
              error || errorDays || reserva.fecha === "" || reserva.hora === ""
            }
            onClick={(e) => handleSubmitFecha(e)}
            style={{ maxWidth: "200px" }}
            className="border-0 rounded-1 fs-5"
          >
            reservar
          </button>
          {activate && (
            <StripePagos id={alumno.id} precio={precio} profe={profe} />
          )}
        </div>
      </div>
      <div>
        {errorDays && (
          <p className="text-center mt-3 p-2 text-danger">
            La reserva no puede ser hoy ni un dia anterior al dia actual
          </p>
        )}
        {error && (
          <p className="text-center mt-3 p-2 text-danger">
            Esta Fecha ya está reservada, elija otra
          </p>
        )}
      </div>
    </div>
  );
};

export default Calendario;
