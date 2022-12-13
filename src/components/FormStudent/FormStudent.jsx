import React, { useEffect, useRef } from "react";
import loginWithGoogle from "../../Authentication/functions/loginWithGoogle";
import logOut from "../../Authentication/functions/logOut";
import { useState } from "react";
import styles from "./FormStudent.module.css";
import registerUser from "../../Authentication/functions/registerUser";
import LoginWithEmailPassword from "../../Authentication/functions/loginWithEmailAndPassword";
import { validateInput } from "./validateInputStudents";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllAlumnos, postAlumno } from "../../redux/Actions/Alumno";
import { FcGoogle } from "react-icons/fc";
import FormGoogle from "../FormGoogle/FormGoogle";

const initialStudentForm = {
  username: "",
  name: "",
  lastname: "",
  email: "",
  password: "",
  passwordConfirm: "",
  rol: "student",
  age: "",
  country: "",
  picture:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
};

const initialStudentErrors = {
  nameErr: false,
  lastnameErr: false,
  emailErr: false,
  passwordErr: false,
  ageErr: false,
  countryErr: false,
  usernameErr: false,
  usernameExist: true,
};

const FormStudent = ({ setMostrarStudent }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const passwordShow = useRef();
  const [next, setNext] = useState(false);
  const [globalMessage, setGlobalMessage] = useState("");
  const [login, setLogin] = useState(true);
  const [form, setForm] = useState(initialStudentForm);
  const {
    name,
    lastname,
    email,
    password,
    passwordConfirm,
    age,
    rol,
    picture,
    country,
    username,
  } = form;
  const countries = useSelector((state) => state.paises.paises);
  const [errors, setErrors] = useState(initialStudentErrors);
  const {
    nameErr,
    lastnameErr,
    emailErr,
    passwordErr,
    ageErr,
    usernameErr,
    usernameExist,
  } = errors;
  const [loaderRegister, setLoaderRegister] = useState(false);
  const alumnos = useSelector((state) => state.alumnos.alumnos);
  const profesores = useSelector((state) => state.profesores.allProfesores);

  useEffect(() => {
    dispatch(getAllAlumnos());
    return () => dispatch(getAllAlumnos());
  }, []);

  const handleChangeStudent = (e) => {
    const username = e.target.name;
    const valueInput = e.target.value;

    validateInput(username, valueInput, setErrors, errors);

    if (username === "username") {
      const allUsers = [...profesores, ...alumnos];

      const noRepeatPlease = allUsers.find(
        (user) => user.username === valueInput
      );
      if (noRepeatPlease) {
        setErrors({ ...errors, usernameExist: true });
      } else {
        setErrors({ ...errors, usernameExist: false });
      }
    }

    setForm({
      ...form,
      [username]: valueInput,
    });
  };

  const enterWithGoogle = async () => {
    try {
      setMostrarStudent(true);
    } catch (error) {
      // console.error(error);
    }
  };

  const handlerSubmitStudent = async (e) => {
    e.preventDefault();
    setLoaderRegister(true);

    if (!country) {
      setLoaderRegister(false);
      setGlobalMessage("Please choose a country");
      setTimeout(() => {
        setGlobalMessage("");
      }, 4000);
      return;
    }
    if (!login) {
      try {
        const data = await LoginWithEmailPassword(email, password);

        if (typeof data === "string") {
          setLoaderRegister(false);
          setGlobalMessage(data);
          setTimeout(() => {
            setGlobalMessage("");
          }, 4000);
          return;
        }
        setLoaderRegister(false);
        navigate("/home");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const userLogin = await registerUser(email, password, form);

        if (typeof userLogin === "string") {
          setLoaderRegister(false);
          setGlobalMessage(userLogin);
          setTimeout(() => {
            setGlobalMessage("");
          }, 4000);
          return;
        }

        dispatch(
          postAlumno({
            id: userLogin.user.uid,
            name,
            lastname,
            picture,
            age,
            email,
            country,
            username,
          })
        );
        setLoaderRegister(false);
        navigate("/home");
      } catch (error) {
        console.error(error);
      }
    }

    setForm(initialStudentForm);
  };

  const clickOutForm = (e) => {
    console.log(e.target);
  };

  return (
    <div className="p-2 mt-5">
      <div className={`p-3 ${styles.max_width} ${styles.form_student}`}>
        <h2 className="text-center fw-bolder mb-3 p-1" data-aos="flip-down">
          Regístrate como Estudiante
        </h2>

        <form onSubmit={handlerSubmitStudent} className="p-3 pt-0">
          {!next && (
            <>
              <div>
                <div data-aos="fade-right" className="col">
                  <label htmlFor="username">Username: </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={handleChangeStudent}
                    className="form-control p-1 fs-6 rounded-1"
                    value={username.toLowerCase()} // todos en minuscula
                    placeholder="enter your name..."
                    autoComplete="off"
                  />
                  {username.length > 1 && usernameErr && (
                    <span
                      data-aos="fade-down"
                      className="text-center text-danger d-block"
                    >
                      Invalid username
                    </span>
                  )}

                  {usernameExist && username !== "" && (
                    <span
                      data-aos="fade-down"
                      className="text-danger text-center d-block"
                    >
                      el nombre de usuario ya existe
                    </span>
                  )}
                </div>
              </div>
              <div className="row mt-2">
                <div data-aos="fade-right" className="col">
                  <label htmlFor="name">nombre </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleChangeStudent}
                    className="form-control p-1 fs-6 rounded-1"
                    value={name}
                    placeholder="enter your name..."
                    autoComplete="off"
                  />

                  {name.length > 1 && nameErr && (
                    <p data-aos="fade-down" className="text-center text-danger">
                      Invalid name: no numbers only words
                    </p>
                  )}
                </div>

                <div className="col" data-aos="fade-right">
                  <label htmlFor="lastname">apellido </label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    onChange={handleChangeStudent}
                    className="form-control p-1 fs-6 rounded-1"
                    value={lastname}
                    placeholder="enter your lastname..."
                    autoComplete="off"
                  />
                  {lastname.length > 1 && lastnameErr && (
                    <p data-aos="fade-down" className="text-center text-danger">
                      Invalid lastname: no numbers only words
                    </p>
                  )}
                </div>
              </div>

              <div className="row">
                <div className="mt-2 col-9">
                  <label htmlFor="country">País: </label>
                  <select
                    name="country"
                    id="country"
                    onChange={handleChangeStudent}
                    className="form-control p-1 fs-6 rounded-1"
                  >
                    <option value="">---</option>
                    {countries.length > 0 &&
                      countries.map((country) => {
                        return (
                          <option value={country.name} key={country.id}>
                            {country.name}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div
                  className="mt-2 col-3"
                  data-aos="fade-right"
                  data-aos-delay="100"
                >
                  <label htmlFor="age">edad </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    onChange={handleChangeStudent}
                    className="form-control p-1 fs-6 rounded-1"
                    value={age}
                    placeholder="age..."
                  />
                  {ageErr && age > 5 && (
                    <p
                      data-aos="fade-down"
                      className="text-center text-danger d-inline"
                    >
                      Invalid age: 10 - 99
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          {next && (
            <>
              <div className={`mt-2`} data-aos="fade-right">
                <label htmlFor="email">Email: </label>
                <input
                  type="text"
                  className={`form-control p-1 fs-6 rounded-1 ${styles.hover_email}`}
                  onChange={handleChangeStudent}
                  name="email"
                  value={email}
                  placeholder="email..."
                />
                {login && emailErr && email.length > 1 && (
                  <p className="text-center text-danger" data-aos="fade-down">
                    Invalid Email
                  </p>
                )}
              </div>

              <div className="row jcc">
                <div
                  className="mt-2 col-12"
                  data-aos="fade-right"
                  data-aos-delay="400"
                >
                  <label htmlFor="password">contraseña </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleChangeStudent}
                    className="form-control p-1 fs-6 rounded-1"
                    value={password}
                    placeholder="password..."
                    ref={passwordShow}
                    autoComplete="off"
                  />
                  {login && passwordErr && password.length > 3 && (
                    <p className="text-center text-danger" data-aos="fade-down">
                      invalid password: lower, upper words and numbers 8 - 20
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-2" data-aos="fade-right" data-aos-delay="300">
                <label htmlFor="password-confirm">
                  confirma tu contraseña{" "}
                </label>
                <input
                  type="password"
                  id="password-confirm"
                  name="passwordConfirm"
                  onChange={handleChangeStudent}
                  className="form-control p-1 fs-6 rounded-1"
                  value={passwordConfirm}
                  placeholder="password Confirm..."
                  autoComplete="off"
                />
              </div>
            </>
          )}

          {globalMessage && (
            <div
              className="text-center mt-1 fs-6 mt-4 text-danger"
              data-aos="flip-up"
            >
              <p>{globalMessage}</p>
            </div>
          )}

          <div className="mt-4 d-block text-center mb-2">
            <button
              type="button"
              className={`${styles.button} btn text-light bg-success`}
              onClick={(e) => setNext(!next)}
            >
              {next ? "volver" : "Siguiente"}
            </button>

            {next && (
              <button
                type="submit"
                className="btn btn-primary"
                disabled={
                  login
                    ? !country ||
                      nameErr ||
                      usernameExist ||
                      lastnameErr ||
                      passwordErr ||
                      emailErr ||
                      !name ||
                      !email ||
                      !password ||
                      !(password === passwordConfirm)
                    : !email || !password
                }
              >
                {loaderRegister && (
                  <div
                  className="spinner-border spinner-border-sm text-light"
                    role="status"
                    style={{ marginRight: ".5rem" }}
                  >
                    <span className="visually-hidden"></span>
                  </div>
                )}
                Registrate
              </button>
            )}
          </div>
        </form>

        <div>
          <p className="text-center">
            {/* <p>quiero aprender ya!!</p> */}
            <b className="fs-6">o</b>
          </p>
          <div
            className={`${styles.loginButtons} d-flex justify-content-center`}
          >
            <button
              onClick={enterWithGoogle}
              className="btn btn-light fs-6 rounded-0 p-2"
            >
              <FcGoogle className="fs-4" />
            </button>
          </div>
        </div>

        <div className="text-center mt-4">
          <p>
            Ya tienes cuenta?
            <Link to="/" className={styles.ingresa}>
              Ingresa
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormStudent;
