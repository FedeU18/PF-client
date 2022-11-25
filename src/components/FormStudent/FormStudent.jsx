import React, { useEffect, useRef } from 'react'
import loginWithGoogle from '../../Authentication/functions/loginWithGoogle'
import logOut from '../../Authentication/functions/logOut'
import { useState } from "react";
import styles from "./FormStudent.module.css"
import registerUser from '../../Authentication/functions/registerUser'
import LoginWithEmailPassword from '../../Authentication/functions/loginWithEmailAndPassword'
import { validateInput } from './validateInputStudents'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postAlumno } from '../../redux/Actions/Alumno';

const initialStudentForm = {
  name: "",
  lastname: "",
  email: "",
  password: "",
  passwordConfirm: "",
  rol: "student",
  age: "",
  country: "",
  picture: "sin foto",
}

const initialStudentErrors = {
  nameErr: false,
  lastnameErr: false,
  emailErr: false,
  passwordErr: false,
  ageErr: false,
  countryErr: false,
}

const FormStudent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const passwordShow = useRef()
  const [globalMessage, setGlobalMessage] = useState("")
  const [login, setLogin] = useState(true)
  const [form, setForm] = useState(initialStudentForm)
  const { name, lastname, email, password, passwordConfirm, age, rol, picture, country } = form;
  const countries = useSelector(state => state.paises.paises)
  const [errors, setErrors] = useState(initialStudentErrors)
  const { nameErr, lastnameErr, emailErr, passwordErr, ageErr } = errors;

  // useEffect(() => {

  // }, [])


  const handleChangeStudent = (e) => {
    const username = e.target.name;
    const valueInput = e.target.value

    validateInput(
      username,
      valueInput,
      setErrors,
      errors
    )

    setForm({
      ...form,
      [username]: valueInput
    })
  }

  const enterWithGoogle = async () => {
    try {
      await loginWithGoogle()
      navigate("/home")
    } catch (error) {
      console.error(error)
    }
  }

  const handlerSubmitStudent = async (e) => {
    e.preventDefault();
    if (!country) {
      setGlobalMessage("Please choose a country")
      setTimeout(() => {
        setGlobalMessage("")
      }, 4000)
      return
    }
    if (!login) {
      try {
        const data = await LoginWithEmailPassword(email, password);
        if (typeof data === "string") {
          setGlobalMessage(data)
          setTimeout(() => {
            setGlobalMessage("")
          }, 4000)
          return;
        }
        navigate("/home")

      } catch (error) {
        console.error(error)
      }

    } else {
      try {
        const userLogin = await registerUser(email, password, form)

        if (typeof userLogin === "string") {
          setGlobalMessage(userLogin)
          setTimeout(() => {
            setGlobalMessage("")
          }, 4000);
          return;
        }
        dispatch(postAlumno({
          name,
          lastname,
          picture,
          age,
          email,
          country
        }))
        navigate("/home")
      } catch (error) {
        console.error(error)
      }
    }

    setForm(initialStudentForm);
  }

  return (
    <div className='p-2'>
      <div className={`p-3 ${styles.max_width} ${styles.form_student}`}>
        <h1 className='text-center fw-bolder' data-aos="flip-down">{login ? "Register Student" : "Login Student"}</h1>

        <form onSubmit={handlerSubmitStudent} className="p-3 pt-0">
          <div className='row'>
            {login && <div data-aos="fade-right" className='col'>
              <label htmlFor="name">Username </label>
              <input
                type="text"
                id='name'
                name='name'
                onChange={handleChangeStudent}
                className='form-control p-1 fs-6 rounded-1'
                value={name}
                placeholder="enter your name..."
                autoComplete='off'
              />

              {name.length > 1 && nameErr &&
                <p data-aos="fade-down" className='text-center text-danger'>Invalid name: no numbers only words</p>}
            </div >}
            {login && <div className='col' data-aos="fade-right">
              <label htmlFor="lastname" >Lastname </label>
              <input
                type="text"
                id='lastname'
                name='lastname'
                onChange={handleChangeStudent}
                className='form-control p-1 fs-6 rounded-1'
                value={lastname}
                placeholder="enter your lastname..."
                autoComplete='off'
              />
              {lastname.length > 1 && lastnameErr &&
                <p data-aos="fade-down" className='text-center text-danger'>Invalid lastname: no numbers only words</p>}
            </div>}
          </div>


          <div className='row'>
            <div
              className={`mt-2 ${login ? "col-9" : ""}`}
              data-aos="fade-right">
              <label htmlFor="email">Email: </label>
              <input
                type="text"
                className={`form-control p-1 fs-6 rounded-1 ${styles.hover_email}`}
                onChange={handleChangeStudent}
                name="email"
                value={email}
                placeholder="email..."
              />
              {login && emailErr && email.length > 1
                &&
                <p
                  className='text-center text-danger'
                  data-aos="fade-down"
                >
                  Invalid Email
                </p>}
            </div>
            {login &&
              <div
                className="mt-2 col-3"
                data-aos="fade-right"
                data-aos-delay="100">
                <label htmlFor="age">Age </label>
                <input
                  type="text"
                  id='age'
                  name='age'
                  onChange={handleChangeStudent}
                  className='form-control p-1 fs-6 rounded-1'
                  value={age}
                  placeholder="age..."
                />
                {ageErr && age > 5 &&
                  <p data-aos="fade-down" className='text-center text-danger d-inline'>Invalid age: 10 - 99</p>}
              </div>}
          </div>

          <div className='mt-2'>
            <label htmlFor="country">Country: </label>
            <select name="country" id="country" onChange={handleChangeStudent} className="form-control p-1 fs-6 rounded-1">
              <option value="">---</option>
              {countries.length > 0 && countries.map(country => {
                return <option value={country.name} key={country.id}>
                  {country.name}
                </option>
              })}
            </select>
          </div>



          <div className='row jcc'>
            <div
              className='mt-2 col-12'
              data-aos="fade-right"
              data-aos-delay="400">
              <label htmlFor="password">Password </label>
              <input
                type="password"
                id='password'
                name='password'
                onChange={handleChangeStudent}
                className='form-control p-1 fs-6 rounded-1'
                value={password}
                placeholder="password..."
                ref={passwordShow}
                autoComplete='off'
              />
              {login && passwordErr && password.length > 3
                &&
                <p
                  className='text-center text-danger'
                  data-aos="fade-down"
                >
                  invalid password: lower, upper words and numbers 8 - 20
                </p>
              }
            </div >
            {/* <div className="col-2 align-items-center">
              <button
                type="button"
                onClick={handleShowPassword}
                className="btn btn-sm btn-primary">show</button>
            </div> */}
          </div>

          {login && <div
            className='mt-2'
            data-aos="fade-right"
            data-aos-delay="300">
            <label htmlFor="password-confirm">Password Confirm </label>
            <input
              type="password"
              id='password-confirm'
              name='passwordConfirm'
              onChange={handleChangeStudent}
              className='form-control p-1 fs-6 rounded-1'
              value={passwordConfirm}
              placeholder="password Confirm..."
              autoComplete='off'
            />
          </div >}

          {globalMessage && <div className='text-center mt-1 fs-6 mt-4 text-danger' data-aos="flip-up">
            <p>{globalMessage}</p>
          </div>}

          <div className='mt-4 d-block text-center mb-2'>
            <button
              className='btn btn-success fs-6 rounded-1'
              disabled={login ?
                (!country ||
                  nameErr ||
                  lastnameErr ||
                  passwordErr ||
                  emailErr ||
                  !name ||
                  !email ||
                  !password ||
                  !(password === passwordConfirm)
                )
                :
                (!email || !password)
              }
            >
              {login ? "Register" : "Log in"}
            </button>
          </div>
        </form>


        <div>
          <p className='text-center'><b className='fs-4'>or</b></p>
          <div className={`${styles.loginButtons} d-flex justify-content-center`}>
            <button
              onClick={enterWithGoogle}
              className="btn btn-primary fs-6 rounded-0 p-2">Google</button>
            <button
              onClick={logOut}
              className="btn btn-danger fs-6 rounded-0 p-2">Log out</button>
          </div>
        </div>

        <div className='text-center mt-4'>
          <p
          >{
              login ?
                "Are you already have an account?"
                :
                "Do not have an Account?"
            }
            <a
              className={`${styles.login_or_signup} fs-5`}
              href="/"
              onClick={
                (e) => {
                  e.preventDefault();
                  setLogin(!login)
                }
              }
            >
              {login ? "log in" : "Sign up"}
            </a>
          </p>

        </div>

      </div>

    </div>
  )
}

export default FormStudent