import React, { useRef, useState } from "react";
import styles from "./FormGoogle.module.css";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { validateGoogleInput } from "./validateGoogleInput";
import loginWithGoogle from "../../Authentication/functions/loginWithGoogle";
import { useNavigate } from "react-router-dom";

const initialGoogleForm = {
  username: "",
  name: "",
  lastname: "",
  age: "",
  picture:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
  country: "",
  rol: "student",
};

const initialGoogleErrors = {
  usernameErr: false,
  nameErr: false,
  lastnameErr: false,
  ageErr: false,
  // pictureErr: false,
  emailErr: false,
  rolErr: false,
  usernameExist: false,
};

const FormGoogle = ({ mostrarStudent, setMostrarStudent }) => {
  const outForm = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [repeat, setRepeat] = useState("");
  const [loaderGoogle, setLoaderGoogle] = useState(false);
  const [formGoogle, setFormGoogle] = useState(initialGoogleForm);
  const { username, name, lastname, age, country } = formGoogle;
  const [errors, setErrors] = useState(initialGoogleErrors);
  const {
    usernameErr,
    nameErr,
    lastnameErr,
    ageErr,
    emailErr,
    rolErr,
    usernameExist,
  } = errors;
  const paises = useSelector((state) => state.paises.paises);
  const alumnos = useSelector((state) => state.alumnos.alumnos);
  const profesores = useSelector((state) => state.profesores.allProfesores);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoaderGoogle(true);

    if (!username || !name || !lastname || !age) {
      setRepeat("campos incompletos");
      setTimeout(() => {
        setRepeat("");
      }, 4000);
      setLoaderGoogle(false);
      return;
    }

    if (!country) {
      setRepeat("elige un pais");
      setTimeout(() => {
        setRepeat("");
      }, 4000);
      setLoaderGoogle(false);
      return;
    }

    if (username && name && lastname && age && country) {
      try {
        await loginWithGoogle(formGoogle, dispatch);
        navigate("/home");
      } catch (error) {
        console.error(error);
      }
    }
    setLoaderGoogle(false);
  };

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    validateGoogleInput(inputName, inputValue, setErrors, errors);

    if (inputName === "username") {
      const allUsers = [...profesores, ...alumnos];
      const noRepeatPlease = allUsers.find(
        (user) => user.username === inputValue
      );

      if (noRepeatPlease) {
        setErrors({ ...errors, usernameExist: true });
      } else {
        setErrors({ ...errors, usernameExist: false });
      }
    }

    setFormGoogle({
      ...formGoogle,
      [inputName]: inputValue,
    });
  };

  const clickOutForm = (e) => {
    if (e.target === outForm.current) {
      setMostrarStudent(false);
    }
  };

  return (
    <div
      onClick={clickOutForm}
      ref={outForm}
      data-aos="fade-right"
      className={`position-absolute w-100 h-100 ${
        styles.color_fondo_transparente
      } ${!mostrarStudent && "d-none"}`}
    >
      <div
        className={`position-fixed top-50 start-50 translate-middle ${styles.formulario_width}`}
      >
        <div className={styles.form_google_container}>
          <form
            onSubmit={handleSubmit}
            className={`form-control mt-2 p-3 border-0 ${styles.form_max_width}`}
          >
            <div className="text-center">
              <FcGoogle className="fs-1" /> <h2>como Estudiante</h2>
            </div>
            <div className="mt-2">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                onChange={handleChange}
                value={username.toLowerCase()}
                name="username"
                className="form-control mt-1"
                id="username"
              />
              {usernameExist && username !== "" && (
                <span className="text-danger text-center d-block">
                  el usuario ya existe
                </span>
              )}
            </div>
            <div className="mt-2">
              <label htmlFor="name">nombre </label>
              <input
                type="text"
                onChange={handleChange}
                value={name}
                name="name"
                className="form-control"
                id="name"
              />
              {name.length > 0 && nameErr && (
                <span className="text-danger text-center d-block">
                  solo se permiten letras
                </span>
              )}
            </div>
            <div className="mt-2 row">
              <div className="col-8">
                <label htmlFor="lastname">apellido </label>
                <input
                  type="text"
                  onChange={handleChange}
                  value={lastname}
                  name="lastname"
                  className="form-control border-bottom"
                  id="lastname"
                />
                {lastnameErr && lastname.length > 0 && (
                  <span className="text-danger d-block text-center">
                    solo letras
                  </span>
                )}
              </div>
              <div className="col-4">
                <label htmlFor="age">Edad</label>
                <input
                  type="number"
                  name="age"
                  className="form-control"
                  value={age}
                  onChange={handleChange}
                  min="10"
                  max="100"
                />
              </div>
              {age > 16 && ageErr && (
                <span className="text-danger text-center">wrong</span>
              )}
            </div>

            <div className="mt-2">
              <label htmlFor="country">Pais</label>
              <select
                name="country"
                className="form-control"
                onChange={handleChange}
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

            <div className="text-center mt-3">
              <span className="text-danger">{repeat}</span>
            </div>

            <div className="text-center mt-3">
              <div>
                <button type="submit" className="btn btn-primary btn-sm">
                  Registrarse
                </button>
              </div>

              <div className="mt-2">
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
              </div>
              <div className="mt-2">
                <button
                  className="btn btn-danger btn-sm"
                  type="button"
                  onClick={(e) => setMostrarStudent(false)}
                >
                  cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormGoogle;
