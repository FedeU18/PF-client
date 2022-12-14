import React, { useRef, useState } from "react";
import styles from "./FormGoogleProfe.module.css";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import loginWithGoogle from "../../Authentication/functions/loginWithGoogle";
import { useNavigate } from "react-router-dom";

const initialGoogleProfe = {
  username: "",
  nombre: "",
  apellido: "",
  rol: "teacher",
  pais: "",
  precio: "",
  materias: [],
};

const FormGoogleProfe = ({ mostrarProfe, setMostrarProfe }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const divref = useRef();
  const [globalMessage, setGlobalMessage] = useState("");
  const [formGoogleProfe, setFormGoogleProfe] = useState(initialGoogleProfe);
  const { nombre, apellido, username, pais, materias, precio } =
    formGoogleProfe;
  const paises = useSelector((state) => state.paises.paises);
  const profes = useSelector((state) => state.profesores.allProfesores);
  const allMaterias = useSelector((state) => state.materias.materias);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const noRepeatPlease = profes.find((profe) => profe.username === username);
    if (noRepeatPlease) {
      setGlobalMessage("username ya existe intenta con otro");
      setTimeout(() => {
        setGlobalMessage("");
      }, 3000);
      return;
    }

    if (!username || !nombre || !apellido || !pais) {
      setGlobalMessage("campos incompletos");
      setTimeout(() => {
        setGlobalMessage("");
      }, 4000);
      return;
    }

    if (!pais) {
      setGlobalMessage("elige un pais");
      setTimeout(() => {
        setGlobalMessage("");
      }, 4000);
      return;
    }

    if (username && nombre && apellido && pais) {
      try {
        await loginWithGoogle(formGoogleProfe, dispatch);
        navigate("/home");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    setFormGoogleProfe({
      ...formGoogleProfe,
      [inputName]: inputValue,
    });
  };

  const clickFueraModal = (e) => {
    e.stopPropagation();
    const div = divref.current;

    if (e.target === div) {
      setMostrarProfe(false);
    }
  };

  const handleQuitMateria = (id) => {
    const materiasQuitada = materias.filter((materias) => materias !== id);

    setFormGoogleProfe({
      ...formGoogleProfe,
      materias: materiasQuitada,
    });
  };

  const showMateria = (id) => {
    const myMateriasProfesor = allMaterias.find(
      (materia) => materia.id === Number(id)
    );

    return myMateriasProfesor.name;
  };

  const handleMateriasGoogle = (e) => {
    const value = e.target.value;
    if (materias.includes(value) || value === "") {
      return;
    } else {
      setFormGoogleProfe({
        ...formGoogleProfe,
        materias: [...formGoogleProfe.materias, value],
      });
    }
  };

  return (
    <div
      onClick={clickFueraModal}
      ref={divref}
      data-aos="fade-right"
      className={`position-fixed w-100 h-100 ${styles.form_profe}`}
    >
      <div
        className={`position-fixed top-50 start-50 translate-middle ${styles.profe_google} p-4`}
      >
        <form
          onSubmit={handleSubmit}
          className={`form-control mt-2 p-4 border-0`}
        >
          <div className="text-center">
            <FcGoogle className="fs-1" />
            <h2>como Profesor(a)</h2>
          </div>
          <div className="mt-2">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              onChange={handleChange}
              value={username}
              name="username"
              className="form-control mt-1"
              id="username"
            />
            {/* {usernameErr && <span></span>} */}
          </div>

          <div className="mt-2 row">
            <div className="col-6">
              <label htmlFor="nombre">nombre </label>
              <input
                type="text"
                onChange={handleChange}
                value={nombre}
                name="nombre"
                className="form-control"
                id="nombre"
              />
              {/* {name.length > 0 && nameErr && (
              <span className="text-danger text-center d-block">
                solo se permiten letras
              </span>
            )} */}
            </div>
            <div className="col-6">
              <label htmlFor="apellido">apellido </label>
              <input
                type="text"
                onChange={handleChange}
                value={apellido}
                name="apellido"
                className="form-control border-bottom"
                id="apellido"
              />
              {/* {lastnameErr && lastname.length > 0 && (
                <span className="text-danger d-block text-center">
                  solo letras
                </span>
              )} */}
            </div>
            {/* {age > 16 && ageErr && (
              <span className="text-danger text-center">wrong</span>
            )} */}
          </div>

          <div className="mt-2">
            <label htmlFor="pais">Pais</label>
            <select
              name="pais"
              className="form-control text-center"
              onChange={handleChange}
              value={pais}
            >
              <option value="">---</option>
              {paises.length > 0 &&
                paises.map((pais) => (
                  <option key={pais.id} value={pais.name}>
                    {pais.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="mt-2 row">
            <div className="col-6">
              <label htmlFor="materias">Materias</label>
              <select
                name="materias"
                className="form-control"
                id="materias"
                onChange={handleMateriasGoogle}
              >
                <option value="">---</option>
                {allMaterias.map((materia) => (
                  <option key={materia.id} value={materia.id}>
                    {materia.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <label htmlFor="precio">Precio:</label>
              <input
                className="form-control"
                type="number"
                name="precio"
                id="precio"
                min="10"
                max="1000"
                value={precio}
                onChange={handleChange}
                placeholder="USD"
              />
            </div>
          </div>
          <div>
          <div className="mt-2 text-center">
                {materias.map((materiaId) => (
                  <button
                    onClick={() => handleQuitMateria(materiaId)}
                    type="button"
                    className="btn btn-dark mt-2"
                    key={materiaId}
                    style={{ margin: "0 .5rem" }}
                  >
                    {showMateria(materiaId)}
                  </button>
                ))}
              </div>
          </div>

          <p className="text-danger text-center mt-2">{globalMessage}</p>

          <div className="text-center mt-3">
            <div>
              <button
                type="submit"
                className="btn btn-primary btn-sm"
                disabled={materias.length < 1}
              >
                Registrarse
              </button>
            </div>

            {/* <div className="mt-2">
              {loaderGoogle && (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden"></span>
                </>
              )}
            </div> */}
            <div className="mt-2">
              <button
                className="btn btn-danger btn-sm"
                type="button"
                onClick={(e) => setMostrarProfe(false)}
              >
                cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormGoogleProfe;
