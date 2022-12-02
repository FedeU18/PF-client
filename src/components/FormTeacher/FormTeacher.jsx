import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormTeacher.css";
import { postProfesor } from "../../redux/Actions/Profesor";
import registerUser from "../../Authentication/functions/registerUser";
import { useDispatch, useSelector } from "react-redux";
import { getMaterias } from "../../redux/Actions/Materias";
import { getPaises } from "../../redux/Actions/Paises";
import { FcGoogle } from "react-icons/fc";

const FormTeacher = ({ setMostrarProfe }) => {
  const [teacher, setTeacher] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contraseña: "",
    rol: "teacher",
    username: "",
    imagen: "",
    descripcion: "",
    puntuacion: [1],
    precio: "",
    estudios: [],
    materias: [],
    pais: [],
  });
  const navigate = useNavigate();
  const materias = useSelector((state) => state.materias.materias);
  const materiasSort = materias.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (b.name > a.name) {
      return -1;
    }
    return 0;
  });
  const paises = useSelector((state) => state.paises.paises);
  const paisesSort = paises.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (b.name > a.name) {
      return -1;
    }
    return 0;
  });
  const dispatch = useDispatch();
  const [globalMessage, setGlobalMessage] = useState("");
  const [confirm, setConfirm] = useState("");
  const [parte, setParte] = useState("primera");
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(getPaises());
    dispatch(getMaterias());
  }, []);

  const handleOnChange = (e) => {
    setTeacher({
      ...teacher,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectMaterias = (e) => {
    setTeacher({
      ...teacher,
      materias: [...teacher.materias, Number(e.target.value)],
    });
  };

  const handleSelectPaises = (e) => {
    setTeacher({
      ...teacher,
      pais: [...teacher.pais, e.target.value],
    });
  };

  const handleEstudios = (e) => {
    setTeacher({
      ...teacher,
      estudios: [e.target.value],
    });
  };

  const handleOnClick = async (e) => {
    e.preventDefault();
    const userLogin = await registerUser(
      teacher.email,
      teacher.contraseña,
      teacher
    );
    dispatch(postProfesor({ id: userLogin.user.uid, ...teacher }));

    if (typeof userLogin === "string") {
      setGlobalMessage(userLogin);
      setTimeout(() => {
        setGlobalMessage("");
      }, 10000);
      return;
    }
    navigate("/home");
  };

  const handleClose = (e) => {
    e.preventDefault();
    setTeacher({
      ...teacher,
      materias: teacher.materias.filter((m) => {
        return m !== Number(e.target.value);
      }),
    });
  };

  function disabled() {
    if (teacher.contraseña !== confirm) {
      setError("La contraseña no coincide");
      return true;
    }
    return false;
  }

  return (
    <div>
      <form className="form">
        <div className="formulario">
          <h3>Bienvenido</h3>
          {globalMessage && <p>{globalMessage}</p>}

          {parte === "primera" && (
            <div>
              <div className="label-input">
                <label>Username</label>
                <input
                  onChange={(e) => handleOnChange(e)}
                  type="text"
                  name="username"
                  value={teacher.username}
                  placeholder="Username"
                />
              </div>
              <div className="label-input">
                <label>Email</label>
                <input
                  onChange={(e) => handleOnChange(e)}
                  type="email"
                  name="email"
                  value={teacher.email}
                  placeholder="Email"
                />
              </div>
              <div className="label-input">
                <label>Contraseña</label>
                <input
                  onChange={(e) => handleOnChange(e)}
                  type="password"
                  name="contraseña"
                  value={teacher.contraseña}
                  placeholder="Contraseña"
                />
              </div>
              <div className="label-input">
                <label>Repetí tu contraseña</label>
                <input
                  onChange={(e) => setConfirm(e.target.value)}
                  type="password"
                  name="confirm"
                  value={confirm}
                />
              </div>
              <div className="botones">
                <button
                  disabled={teacher.contraseña === confirm ? false : true}
                  onClick={(e) => setParte("segunda")}
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {parte === "segunda" && (
            <div>
              <div className="label-input">
                <label>Nombre</label>
                <input
                  onChange={(e) => handleOnChange(e)}
                  type="text"
                  name="nombre"
                  value={teacher.nombre}
                  placeholder="Nombre"
                />
              </div>
              <div className="label-input">
                <label>Apellido</label>
                <input
                  onChange={(e) => handleOnChange(e)}
                  type="text"
                  name="apellido"
                  value={teacher.apellido}
                  placeholder="Apellido"
                />
              </div>
              <div className="label-input">
                <label>Tus estudios</label>
                <input
                  onChange={(e) => handleEstudios(e)}
                  type="text"
                  name="estudios"
                  value={teacher.estudios}
                  placeholder="estudios"
                />
              </div>
              <div className="label-input">
                <label>Tu país</label>
                <select onChange={(e) => handleSelectPaises(e)}>
                  <option value="">---</option>
                  {paisesSort.length &&
                    paisesSort.map((p) => {
                      return (
                        <option key={p.id} value={p.name}>
                          {p.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="botones">
                <button onClick={(e) => setParte("primera")}>Atrás</button>
                <button onClick={(e) => setParte("tercera")}>Siguiente</button>
              </div>
            </div>
          )}

          {parte === "tercera" && (
            <div>
              <div className="label-input">
                <label>Descripción</label>
                <textarea
                  onChange={(e) => handleOnChange(e)}
                  type="text"
                  name="descripcion"
                  value={teacher.descripcion}
                />
              </div>
              <div className="label-input">
                <label>¿Cuanto cuestan tus clases?</label>
                <input
                  onChange={(e) => handleOnChange(e)}
                  type="text"
                  name="precio"
                  value={teacher.precio}
                  placeholder="Precio(USD)"
                />
              </div>
              <div className="label-input">
                <label>¿Que enseñas?</label>
                <select onChange={(e) => handleSelectMaterias(e)}>
                  {materiasSort.length &&
                    materiasSort.map((m) => {
                      return (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              {teacher.materias.length ? (
                teacher.materias.map((m) => {
                  return (
                    <button
                      type="button"
                      onClick={(e) => handleClose(e)}
                      value={m}
                      key={m}
                    >
                      {m}
                    </button>
                  );
                })
              ) : (
                <></>
              )}
              <div className="botones">
                <button onClick={(e) => setParte("segunda")}>Atrás</button>
                <button type="submit" onClick={(e) => handleOnClick(e)}>
                  Register
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="texto">
          <div className="contenido">
            <h3>¡Registrate como Profesor!</h3>
            <p className="parrafo">
              Ayuda a estudiantes de nivel medio a prepararse para sus exámenes
            </p>

            <p className="text-center fw-bolder fs-5">o</p>

            <button
              type="button"
              onClick={() => setMostrarProfe(true)}
              className="btn bg-light btn-sm"
            >
              <FcGoogle className="fs-1" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormTeacher;
