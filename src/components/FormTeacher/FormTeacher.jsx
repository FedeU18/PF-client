import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormTeacher.css";
import { postProfesor, allProfes } from "../../redux/Actions/Profesor";
import registerUser from "../../Authentication/functions/registerUser";
import { useDispatch, useSelector } from "react-redux";
import { getMaterias } from "../../redux/Actions/Materias";
import { getPaises } from "../../redux/Actions/Paises";
import { FcGoogle } from "react-icons/fc";
import { getAllAlumnos } from "../../redux/Actions/Alumno";

const initialErrors = {
  nombreErr: false,
  apellidoErr: false,
  emailErr: false,
  contraseñaErr: false,
  usernameErr: false,
  usernameErrExist: false,
};

const FormTeacher = ({ setMostrarProfe }) => {
  const dispatch = useDispatch();
  const [allErrors, setAllErrors] = useState(initialErrors);
  const {
    nombreErr,
    apellidoErr,
    emailErr,
    contraseñaErr,
    usernameErr,
    usernameErrExist,
  } = allErrors;

  const allProfesores = useSelector((state) => state.profesores.allProfesores);
  const allStudents = useSelector((state) => state.alumnos.alumnos);
  const [loader, setLoader] = useState(false);
  const [globalMessage, setGlobalMessage] = useState("");
  const [confirm, setConfirm] = useState("");
  const [parte, setParte] = useState("primera");
  const [error, setError] = useState("");
  const [teacher, setTeacher] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contraseña: "",
    rol: "teacher",
    username: "",
    imagen:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",

    descripcion: "",
    puntuacion: [1],
    precio: "",
    materias: [],
    pais: [],
  });
  const navigate = useNavigate();
  const materias = useSelector((state) => state.materias.materias);
  const materiasSort = materias.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (b.name > a.name) return -1;
    return 0;
  });
  const paises = useSelector((state) => state.paises.paises);
  const paisesSort = paises.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (b.name > a.name) return -1;
    return 0;
  });

  useEffect(() => {
    dispatch(getPaises());
    dispatch(getMaterias());
    dispatch(getAllAlumnos());
    dispatch(allProfes());
  }, []);

  const handleOnChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    if (key === "username") {
      const validateUser = /^[a-zA-Z0-9_-]+$/;
      const allUsers = [...allProfesores, ...allStudents];
      console.log(allUsers);
      const noRepeatPlease = allUsers.find((user) => user.username === value);

      // if (validateUser.test(value)) {
      //   setAllErrors({ ...allErrors, usernameErr: false });
      // } else {
      //   setAllErrors({ ...allErrors, usernameErr: true });
      // }

      if (noRepeatPlease) {
        setAllErrors({ ...allErrors, usernameErrExist: true });
      } else {
        setAllErrors({ ...allErrors, usernameErrExist: false });
      }
    } else if (key === "email") {
      const emailVerify = /^\w+([.-_+ñ]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

      if (emailVerify.test(value)) {
        setAllErrors({ ...allErrors, emailErr: false });
      } else setAllErrors({ ...allErrors, emailErr: true });
    } else if (key === "nombre" || key === "apellido") {
      const validateInfo = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;

      if (validateInfo.test(value)) {
        setAllErrors({ ...allErrors, [`${key}Err`]: false });
      } else {
        setAllErrors({ ...allErrors, [`${key}Err`]: true });
      }
    } else if (key === "contraseña") {
      const validPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,20}$/;
      if (validPassword.test(value)) {
        setAllErrors({ ...allErrors, contraseñaErr: false });
      } else {
        setAllErrors({ ...allErrors, contraseñaErr: true });
      }
    }

    setTeacher({
      ...teacher,
      [key]: value,
    });
  };

  const handleSelectMaterias = (e) => {
    setTeacher({
      ...teacher,
      materias: teacher.materias.includes(Number(e.target.value))
        ? [...teacher.materias]
        : e.target.value !== "default"
        ? [...teacher.materias, Number(e.target.value)]
        : [...teacher.materias],
    });
  };

  const handleSelectPaises = (e) => {
    setTeacher({
      ...teacher,
      pais: [e.target.value],
    });
  };

  const handleOnClick = async (e) => {
    e.preventDefault();
    setLoader(true);
    const userLogin = await registerUser(
      teacher.email,
      teacher.contraseña,
      teacher
    );

    if (typeof userLogin === "string") {
      setGlobalMessage(userLogin);
      setTimeout(() => {
        setGlobalMessage("");
      }, 5000);
      setLoader(false);
      return;
    }
    if (userLogin.user.uid) {
      dispatch(postProfesor({ id: userLogin.user.uid, ...teacher }));
      navigate("/home");
    }
    setLoader(false);
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

  const show = (mat) => {
    let materia = materias.find((m) => m.id === mat);
    return materia.name;
  };

  return (
    <div data-aos="fade-right">
      <form className="form">
        <div className="formulario">
          <h3>
            Bienvenido
          </h3>

          {parte === "primera" && (
            <div>
              <div className="label-input">
                <label>Username</label>
                <input
                  onChange={(e) => handleOnChange(e)}
                  type="text"
                  name="username"
                  value={teacher.username.toLowerCase()}
                  placeholder="Username"
                />
                {usernameErrExist && (
                  <span className="text-danger">
                    el nombre de usuario ya existe
                  </span>
                )}
                {usernameErr && teacher.username !== "" && (
                  <span className="text-center text-danger">
                    username incorrecto
                  </span>
                )}
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
                {emailErr && teacher.email.length > 1 && (
                  <span className="text-danger text-center">
                    email incorrecto
                  </span>
                )}
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
                {teacher.contraseña !== "" && contraseñaErr && (
                  <span className="text-center text-danger">
                    debe tener numeros, mayusculas y minusculas (8-20)
                  </span>
                )}
              </div>
              <div className="label-input">
                <label>Repetí tu contraseña</label>
                <input
                  onChange={(e) => setConfirm(e.target.value)}
                  type="password"
                  name="confirm"
                  value={confirm}
                />
                {confirm !== "" &&
                  teacher.contraseña !== confirm &&
                  confirm && (
                    <span className="text-center text-danger">
                      las contraseñas no coinciden
                    </span>
                  )}
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
                {teacher.nombre !== "" && nombreErr && (
                  <span className="text-danger">
                    no numeros ni caracteres especiales
                  </span>
                )}
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
                {teacher.apellido !== "" && apellidoErr && (
                  <span className="text-danger">
                    no numeros ni caracteres especiales
                  </span>
                )}
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
                <input
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
                  <option value="default">Elige una o más materias</option>
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
              <div className="materias">
                {teacher.materias?.map((id) => {
                  return (
                    <button onClick={(e) => handleClose(e)} value={id} key={id}>
                      {show(id)}
                    </button>
                  );
                })}
              </div>
              <div className="botones">
                <button onClick={(e) => setParte("segunda")}>Atrás</button>
                <button
                  type="submit"
                  onClick={(e) => handleOnClick(e)}
                  disabled={
                    !teacher.nombre ||
                    !teacher.apellido ||
                    !teacher.email ||
                    !teacher.contraseña ||
                    !teacher.username ||
                    !teacher.descripcion ||
                    !teacher.precio ||
                    teacher.materias.length === 0 ||
                    teacher.pais.length !== 1 ||
                    teacher.pais[0] === "" ||
                    nombreErr ||
                    apellidoErr ||
                    emailErr ||
                    contraseñaErr ||
                    usernameErr ||
                    usernameErrExist
                  }
                >
                  {loader && (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                      style={{ marginRight: ".4rem" }}
                    >
                      <span className="visually-hidden"></span>
                    </div>
                  )}
                  Registrate
                </button>
              </div>
            </div>
          )}
          {globalMessage && (
            <span className="text-danger mt-2">{globalMessage}</span>
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
