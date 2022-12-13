import loginWithGoogle from "../../Authentication/functions/loginWithGoogle";
import MessageError from "./MessageError";
import { useState } from "react";
import "./Landing.css";
import img from "./img/google.png";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import profe3 from "./img/profe3.png";
import profe2 from "./img/profe2.png";
import profe from "./img/profe1.png";
import imagen from "./img/img1.jpeg";
import arg from "./img/arge.jpg";
import vene from "./img/vene.png";
import peru from "./img/peru.png";
import imagen2 from "./img/img2.jpeg";
import imagen3 from "./img/img3.jpeg";
import perfil from "./img/perfil.jpg";
import perfil2 from "./img/perfil2.jpg";
import perfil3 from "./img/perfil3.jpg";
import { FcCheckmark, FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom"; //arreglar lo de link
import { Link as LinkS } from "react-scroll";
import pizarron from "./img/pizarron.png";
import Footer from "./Footer";
import { FcGlobe } from "react-icons/fc";
import { FaPencilAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import LoginWithEmailPassword from "../../Authentication/functions/loginWithEmailAndPassword";
import { useNavigate } from "react-router-dom";
import logo from "./img/1.png";
import Tarjetas from "./Tarjetas.jsx";

export const Landing = () => {
  const [loader, setLoader] = useState(false);
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
    setLoader(true);
    const register$ = await LoginWithEmailPassword(input.email, input.password);
    if (typeof register$ === "string") {
      setLoader(false);
      setGlobalMessage(register$);
      setTimeout(() => {
        setGlobalMessage("");
      }, 3000);
      return;
    } else {
      navigate("/home");
      setLoader(false);
    }
  };

  return (
    <>
      <div className="fondo position-relative">
        <div className="nav-scroll gap-4">
          <LinkS
            to="materias"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
            className="uno"
          >
            Materias
          </LinkS>
          <LinkS
            to="paises"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
            className="dos"
          >
            Paises
          </LinkS>
          <LinkS
            to="profesores"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
            className="tres"
          >
            Profesores
          </LinkS>
          <LinkS
            to="testimonios"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
            className="cuatro"
          >
            Testimonios
          </LinkS>
        </div>

        <div>
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
                        <div className="titulo">
                          Bienvenido <FaPencilAlt className="rebotando-lapiz"/>
                        </div>
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
                            className="fw-bolder"
                          >
                            Login
                            {loader && (
                              <div
                              className="spinner-border spinner-border-sm text-dark"
                                role="status"
                                style={{ marginLeft: "1rem" }}
                              >
                                <span className="visually-hidden"></span>
                              </div>
                            )}
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
                        <div className="d-flex justify-content-center">
                          <div style={{ maxWidth: "50px" }}>
                            <button
                              type="button"
                              onClick={loginGoogle}
                              className="btn bg-light fs-5"
                            >
                              <FcGoogle style={{ fontSize: "1.8rem" }} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="text">
                  <h1 className="title fw-bolder">
                    Encuentra un profesor particular
                  </h1>
                  <div>
                    Find your teacher fue creado como una manera
                    <br></br>
                    de ayudar a conectar a profesores de toda Latinoamerica
                    <br></br>
                    con aquellos alumnos en busca de reforzar sus conocimientos
                    en
                    <br></br>
                    las materias de la escuela.
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>

      {/* Michael -------- */}
      {/* fondo 2 */}
      <div className="w-100 vh-100 mt-5">
        <div className="">
          <div className="text-center">
            <h1>Por que unirte a nuestra comunidad?</h1>
            <br></br>
            <div>
              <h5>
                <FaPencilAlt /> Podras estudiar sin salir de tu casa.
              </h5>
            </div>
            <br></br>

            <div>
              <h5>
                <FaPencilAlt /> Elegir la tarifa adecuada .
              </h5>
            </div>
            <br></br>

            <h5>
              <FaPencilAlt /> tener las clases en vivo.
            </h5>
          </div>

          <div className="d-flex gap-4 flex-wrap justify-content-center mt-5">
            <div data-aos="zoom-out-right">
              <img className="foto-fondo-2" src={imagen} />
            </div>
            <div data-aos="zoom-out-down">
              <img className="foto-fondo-2" src={imagen2} />
            </div>
            <div data-aos="zoom-out-left">
              <img className="foto-fondo-2 none" src={imagen3} />
            </div>
          </div>
        </div>
      </div>

      {/* Michael -------- */}

      {/* fondo-3  bg-image-fondo-3*/}
      <div
        className="w-80 vh-80 d-flex justify-content-center fondo-3"
        id="materias"
      >
        <div className="display-flex justify-content.">
          <div
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500"
            className="text-center"
          >
            <h1 className="fw-bolder d-flex justify-content-center text-aling-center">
              Nuestras Materias
            </h1>
          </div>

          <div className="d-flex justify-content-center flex-wrap gap-2 altura-paises align-content-center maximo-ancho">
            <h5 className="">
              <FcCheckmark /> Algebra
            </h5>
            <h5 className="">
              <FcCheckmark /> Aritmetica
            </h5>
            <h5 className="">
              <FcCheckmark /> Geometria
            </h5>
            <h5 className="">
              <FcCheckmark /> Trigonometria
            </h5>
            <h5 className="">
              <FcCheckmark /> Biologia
            </h5>
            <h5 className="">
              <FcCheckmark /> Quimica
            </h5>
            <h5 className="">
              <FcCheckmark /> Fisica
            </h5>
            <h5 className="">
              <FcCheckmark />
              Geografia
            </h5>
            <h5 className="">
              <FcCheckmark />
              Guatemala
            </h5>
            <h5 className="">
              <FcCheckmark /> Economia
            </h5>
            <h5 className="">
              <FcCheckmark /> Historia
            </h5>
            <h5 className="">
              <FcCheckmark />
              Arte
            </h5>

            <h5 className="">
              <FcCheckmark />
              Musica
            </h5>
            <h5 className="">
              <FcCheckmark />
              Literatura
            </h5>
            <h5 className="">
              <FcCheckmark /> Lenguaje
            </h5>
            <h5 className="">
              <FcCheckmark />
              Filosofia
            </h5>
            <h5 className="">
              <FcCheckmark />
              Psicologia
            </h5>
            <h5 className="">
              <FcCheckmark /> Ingles
            </h5>
            <h5 className="">
              <FcCheckmark /> Computacion
            </h5>
          </div>
        </div>

        <div data-aos="zoom-out-left" className="pizarron">
          <img className="img-de-la-seño-con-laptop" src={pizarron} />
        </div>
      </div>

      <div>
        <br></br>
      </div>

      {/* fondo 4 */}

      <div
        className="cuarto-fondo w-100 vh-100 p-3 d-flex justify-content-center "
        id="profesores"
      >
        {/* <div className="custom-shape-divider-top-1670175764">
         <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
         <path d="M1200 0L0 0 892.25 114.72 1200 0z" className="shape-fill"></path>
        </svg>
     </div> */}

        <div className="d-flex flex-column justify-content-center">
          <div className="forma" data-aos="zoom-out-left"></div>
          <div className="forma2" data-aos="zoom-out-left"></div>
          <div className="forma3" data-aos="zoom-out-left"></div>

          <div
            className="cuadrado"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <img src={logo} alt="" />
          </div>

          <div>
            <h1 className="text-center fw-bolder mb-5">
              ¿Cómo dar clases particulares?
            </h1>
          </div>
          <div className="d-flex flex-wrap align-items-center justify-content-center gap-4">
            <div data-aos="zoom-out-right">
              <Carousel className="carousel rounded-4 ">
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={profe}
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={profe2}
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={profe3}
                    alt="Third slide"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
            <div className="text-light rounded-2 p-4 como-dar-clases-particulares">
              <h5>
                Es fácil y ya has hecho la mitad del trabajo antes de llegar a
                esta página. En 5 minutos puedes crear un anuncio para dar
                clases particulares. Los únicos requisitos para crear tu perfil
                son un poco de buena voluntad para describir tu metodología y
                una bonita foto para ilustrar tu anuncio de clases particulares.
              </h5>
            </div>
          </div>
        </div>
      </div>
      {/* ////testimonios */}

      <div className="w-100 vh-100 mt-5">
        <div className="">
          <div className="text-center">
            <h1>TESTIMONIOS</h1>
          </div>
          <div className="d-flex gap-4 flex-wrap justify-content-center mt-5">
            <div data-aos="zoom-out-right">
              <img className="foto-fondo-2" src={arg} />
            </div>
            <div data-aos="zoom-out-down">
              <img className="foto-fondo-2" src={vene} />
            </div>
            <div data-aos="zoom-out-left">
              <img className="foto-fondo-2 none" src={peru} />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="d-flex gap-4 flex-wrap justify-content-center mt-5 " id="testimonios" >
         
  
              <div className="Globo"data-aos="fade-down-left">
                </div>  
                <div className="Globo2" data-aos="fade-down-right"
                     data-aos-anchor-placement="center-bottom">
                </div>    
                <div className="Globo3" data-aos="fade-down-left">
                </div>    
                <div className="Globo4" data-aos="fade-down-right" >
                </div>    
                <div className="Globo5" data-aos="fade-down-right">
                </div>    
                <div className="Globo6" data-aos="fade-down-right">
                </div>    


             <div className="d-flex flex-column justify-content-center">
                   <div>
                     <h1 className="text-center fw-bolder mb-5">
                      TESTIMONIOS
                    </h1>
                   </div>
           
           <div className="d-flex flex-wrap align-items-center justify-content-center gap-4">
            
                
            
                <div className="d-flex gap-5 flex-wrap justify-content-center mt-2">
                     <div data-aos="zoom-out-right card-conta " className="cards-conta">
                           
                            <div className="slide-container">
                               <div className="slide-content">
                                     <div className="card-wrapper"></div>
                                        <div className="card">
                                           
                                               <div className="image-content">
                                                     <span className="overlay"></span>
                                                        <div className="card-image">
                                                            <img src={perfil} alt="" className="card-img" />
                                                        </div>
                                                  </div>
                                                 <div className="card-content">
                                                    <h2 className="name">Lucia Arenas</h2>
                                                    <p className="description"> Fue muy facil encontrar a una profesora,le recominedo a todas las personas que se animen a usarla. ahora solo me tengo que concentrar en los horarios y en estudiar!    </p>
                                                    
                                                    </div>      
                                        </div>
                                 </div>
                           </div>
            </div>


              
                     <div data-aos="zoom-out-down card-conta">
                    
                       <div className="slide-container">
                               <div className="slide-content">
                                     <div className="card-wrapper"></div>
                                        <div className="card">
                                           
                                               <div className="image-content">
                                                     <span className="overlay"></span>
                                                        <div className="card-image">
                                                            <img src={perfil2} alt="" className="card-img" />
                                                        </div>
                                                  </div>
                                                 <div className="card-content">
                                                    <h2 className="name">Federico Gabrielli </h2>
                                                    <p className="description"> Se me hacia muy dificil encotrar profesores , gracias a find pude retomar y terminar mis estudios.Siempre me senti acompañado ya se son tutorias en vivo y con personas muy calidas </p>
                                                    
                                                    </div>      


                                        </div>
                               </div>
                           </div>
                     </div>
                    
                    <div data-aos="zoom-out-left card-conta">

                           <div className="slide-container">
                               <div className="slide-content">
                                     <div className="card-wrapper"></div>
                                        <div className="card">
                                           
                                               <div className="image-content">
                                                     <span className="overlay"></span>
                                                        <div className="card-image">
                                                            <img src={perfil3} alt="" className="card-img" />
                                                        </div>
                                                  </div>
                                                 <div className="card-content">
                                                    <h2 className="name">David Bell</h2>
                                                    <p className="description"> Tarde solo cuatro minutos en encontrar un profesor que se adecuara a mis necesidades, me armo un Plan de estudios en menos de 1 dia y ya aprobe la materia!!   </p>
                                                    
                                                  </div>      


                                        </div>
                               </div>
                           </div>

                    </div>
                 </div>
            </div>
        </div>
      </div>
      */}

      <Tarjetas />
      {/* fondo 5 */}
      <div className="quinto-fondo vh-100 w-100">
        <div className="custom-shape-divider-top-1669860789">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>

        <div className="mucho-margin text-light" id="paises">
          <h1 className="text-center mt-5">
            <FcGlobe /> Nuestros Paises
          </h1>
          <div>
            <div className="d-flex justify-content-center flex-wrap gap-3 altura-paises align-content-center maximo-ancho">
              <h5 className="">
                <FaCheck /> Argentina
              </h5>
              <h5 className="">
                <FaCheck /> Bolivia
              </h5>
              <h5 className="">
                <FaCheck /> Colombia
              </h5>
              <h5 className="">
                <FaCheck /> Chile
              </h5>
              <h5 className="">
                <FaCheck /> Costa Rica
              </h5>
              <h5 className="">
                <FaCheck /> Cuba
              </h5>
              <h5 className="">
                <FaCheck /> El Salvador
              </h5>
              <h5 className="">
                <FaCheck />
                Ecuador
              </h5>
              <h5 className="">
                <FaCheck />
                Guatemala
              </h5>
              <h5 className="">
                <FaCheck /> Honduras
              </h5>
              <h5 className="">
                <FaCheck /> Nicaragua
              </h5>
              <h5 className="">
                <FaCheck />
                Paraguay
              </h5>

              <h5 className="">
                <FaCheck />
                Peru
              </h5>
              <h5 className="">
                <FaCheck />
                Puerto Rico
              </h5>
              <h5 className="">
                <FaCheck /> Venezuela
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <Footer />
      </div>
    </>
  );
};
