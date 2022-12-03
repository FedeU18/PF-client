import logo from "./img/1.png";
import loginWithGoogle from "../../Authentication/functions/loginWithGoogle";
import MessageError from "./MessageError";
import { useState } from "react";
import "./Landing.css";
import img from "./img/google.png";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import imagen from "./img/img1.jpeg";
import imagen2 from "./img/img2.jpeg";
import imagen3 from "./img/img3.jpeg";
import dibujoo from "./img/dibujo.jpeg";
import { FaPencilAlt } from "react-icons/fa";

import {FaGlobeAmericas} from "react-icons/fa";
import {FaCheck} from "react-icons/fa";


import { Link } from 'react-router-dom'
import LoginWithEmailPassword from '../../Authentication/functions/loginWithEmailAndPassword'
import { useNavigate } from 'react-router-dom'


export const Landing = () => {
  const [messageError, setMessageError] = useState(false);
  const [globalMessage, setGlobalMessage] = useState("");
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const loginGoogle = async (e) => {
    e.preventDefault();
    try {
      const googleTryLoogin = await loginWithGoogle();
      if (googleTryLoogin === "user no existe") {
        setMessageError(true);
        setTimeout(() => {
          setMessageError(false);
        }, 3000);
        return;
      }

      navigate("/home");
      return;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const register$ = await LoginWithEmailPassword(input.email, input.password);
    if (typeof register$ === "string") {
      setGlobalMessage(register$);
      setTimeout(() => {
        setGlobalMessage("");
      }, 3000);
    } else {
      navigate("/home");
    }
  };

  return (
    <>
      <div className="fondo position-relative">
        {messageError && <MessageError />}
        <div className="custom-shape-divider-bottom-1669219916">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <div>
          <img className="logo" src={logo} alt="logo" />
          <Container className="container">
            <Row className="two-col">
              <Col className="formulario">
                <div id="contenedor">
                  <div id="central">
                    <div id="login">
                      <div className="titulo">Bienvenido</div>
                      <form id="loginform">
                        <input
                          onChange={(e) => handleInput(e)}
                          type="text"
                          name="email"
                          placeholder="Email"
                          value={input.email}
                        />

                        <input
                          onChange={(e) => handleInput(e)}
                          type="password"
                          placeholder="Contraseña"
                          name="password"
                          value={input.password}
                        />
                        <button
                          type="submit"
                          onClick={(e) => handleSubmit(e)}
                          title="Ingresar"
                          name="Ingresar"
                        >
                          Login
                        </button>
                      </form>
                      {globalMessage && (
                        <p className="text-danger text-center fw-bold mt-2">
                          {globalMessage}
                        </p>
                      )}
                      <div className="pie-form">
                        <Link to="/forgot-password" className="link">
                          ¿Perdiste tu contraseña?
                        </Link>
                        <br />
                        <Link to="/register" className="link">
                          ¿No tienes Cuenta? Registrate
                        </Link>
                      </div>
                      <div>
                        <button type="button" onClick={loginGoogle}>
                          google
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="text">
                <h1 className="title">Encuentra un profesor particular</h1>
                <div>
                  Find your teacher fue creado como una manera
                  <br></br>
                  de ayudar a conectar a profesores de toda Latinoamerica
                  <br></br>
                  con aquellos alumnos en busca de reforzar sus conocimientos en
                  <br></br>
                  las materias de la escuela.
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <div className="segundo-fondo">
        <div className="segundo-contenedor">
          <div className="texto-dos">
            <h1 className="titulo-dos">Por que unirte a nuestra comunidad?</h1>
            <br></br>
            <div>
              <h5>
                <FaPencilAlt /> Podras estudiar sin salir de tu casa.
              </h5>
            </div>
            <br></br>

            <div>
              <h5>
                {" "}
                <FaPencilAlt /> Elegir la tarifa adecuada .
              </h5>
            </div>
            <br></br>

            <h5>
              <FaPencilAlt /> tener las clases en vivo.{" "}
            </h5>
          </div>

          <div data-aos="zoom-out-right">
            {" "}
            <img className="foto-dos" src={imagen} />{" "}
          </div>
          <div data-aos="zoom-out-down">
            {" "}
            <img className="foto-tres" src={imagen2} />{" "}
          </div>
          <div data-aos="zoom-out-left">
            {" "}
            <img className="foto-cuatro" src={imagen3} />{" "}
          </div>
        </div>
      </div>

      <div className="tercer-fondo">
        <div className="globo"></div>
        <div className="globo2"></div>

        <div className="tercer-contenedor">
          <div className="texto-dos">
            <div
              data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="1500"
            >
              <h1 className="titulo-dos">Nuestras Materias</h1>
            </div>

            <br></br>
            <h5>
              {" "}
              podras estudiar sin salir de tu casa
              <br></br>
              <br></br>
              con aquellos alumnos en busca de reforzar sus conocimientos en
              <br></br>
              las materias de la escuela.
            </h5>
          </div>
        </div>

        <div data-aos="zoom-out-right">
          {" "}
          <img className="fotoo-dos" src={dibujoo} />{" "}
        </div>
      </div>

      <div className="cuarto-fondo">
        <div className="globo-cuatro"></div>

        <div className="cuarto-contenedor">
          <div className="texto-cuarto">
            <h3 className="titulo-dos">¿Cómo dar clases particulares?</h3>
            <h5>
              Es fácil y ya has hecho la mitad del trabajo antes de llegar a
              esta página. En 5 minutos puedes crear un anuncio para dar clases
              particulares. Los únicos requisitos para crear tu perfil son un
              poco de buena voluntad para describir tu metodología y una bonita
              foto para ilustrar tu anuncio de clases particulares.
            </h5>
          </div>
        </div>

        <div data-aos="zoom-out-right">
          {" "}
          <img className="cuarta-foto" src={imagen} />{" "}
        </div>
      </div>

      <div className="quinto-fondo">
        <div className="custom-shape-divider-top-1669860789">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>

        <div className="nuestros">
          {" "}
          <h1 className="texto-nuestro">
            {" "}
            <FaGlobeAmericas /> Nuestros Paises
          </h1>
        </div>

        <div className="paises">
          <h5 className="paises-dos">
            {" "}
            <FaCheck /> Argentina
          </h5>
          <h5 className="paises-dos">
            {" "}
            <FaCheck /> Bolivia
          </h5>
          <h5 className="paises-dos">
            <FaCheck /> Colombia
          </h5>
          <h5 className="paises-dos">
            <FaCheck /> Chile
          </h5>

          <h5 className="paises-dos">
            <FaCheck /> Costa Rica
          </h5>
          <h5 className="paises-dos">
            <FaCheck /> Cuba
          </h5>
          <h5 className="paises-dos">
            <FaCheck /> El Salvador
          </h5>
          <h5 className="paises-dos">
            <FaCheck />
            Ecuador
          </h5>

          <h5 className="paises-dos">
            {" "}
            <FaCheck />
            Guatemala
          </h5>
          <h5 className="paises-dos">
            <FaCheck /> Honduras
          </h5>
          <h5 className="paises-dos">
            <FaCheck /> Nicaragua
          </h5>
          <h5 className="paises-dos">
            <FaCheck />
            Paraguay
          </h5>

          <h5 className="paises-dos">
            <FaCheck />
            Peru
          </h5>
          <h5 className="paises-dos">
            <FaCheck />
            Puerto Rico
          </h5>
          <h5 className="paises-dos">
            <FaCheck /> Venezuela
          </h5>
        </div>
      </div>

      <div>
        <div cassName="sexto-fondo"></div>
      </div>
    </>
  );
};

