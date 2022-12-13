import React from "react";
import { Link } from "react-router-dom";
import "./alumnoPerfil.css";

const LoaderPerfilStudent = () => {
  return (
    <div>
      <div className="divPrincipal">
        {/* <EditarAlumno show={show} alumno={info} handleClose={handleClose} /> */}
        <div className="ContMyPerfilFavorites">
          <Link to="/home">
            <button className="goBackBtn">
              <img className="gobackArrow" src={"/retro.png"} />
            </button>
          </Link>
          <div>
            <div className="myperfilCont">
              <div className="FotoPerfilACont">
                <img
                  src={
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
                  }
                  className="ProfilePictureAlum"
                />
                <button
                  className="button-17"
                  role="button"
                  // onClick={() => handleOpenWidget()}
                >
                  Alumno
                </button>
              </div>

              <div className="InFoAlumnoPErfCont">
                <div className="titleMyPRofile">
                  <span>Mi Perfil</span>
                  <button className="btnEditProAlu">
                    {/* <AiOutlineEdit onClick={handleShow} /> */}
                  </button>
                </div>

                <div className="contInfoPErfAlum">
                  <div>
                    <div className="miniContinfoPErfAlu">
                      <div className="eachInfoIputPErProfe">
                        <div className="nameInfoPErAlu">Nombre:</div>
                        <p className="placeholder-wave">
                          <span className="placeholder col-12 placeholder-lg opacity-25 rounded-2"></span>
                        </p>
                        {/* <div className="lainfoPErAlu">{info.name}</div> */}
                      </div>
                      <div className="eachInfoIputPErProfe">
                        <div className="nameInfoPErAlu">Apellido:</div>
                        <p className="placeholder-wave">
                          <span className="placeholder col-12 placeholder-lg opacity-25 rounded-2"></span>
                        </p>
                        {/* <div className="lainfoPErAlu">{info.lastname}</div> */}
                      </div>
                      <div className="eachInfoIputPErProfe">
                        <div className="nameInfoPErAlu">Edad:</div>
                        <p className="placeholder-wave">
                          <span className="placeholder col-12 placeholder-lg opacity-25 rounded-2"></span>
                        </p>
                        {/* <div className="lainfoPErAlu">{info.age} años</div> */}
                      </div>
                      <div className="eachInfoIputPErProfe">
                        <div className="nameInfoPErAlu">Pais:</div>
                        <p className="placeholder-wave">
                          <span className="placeholder col-12 placeholder-lg opacity-25 rounded-2"></span>
                        </p>
                        {/* <div className="lainfoPErAlu">
                              <img
                                src={info.country.flag}
                                className="flagalumPro"
                              />
                              {info.country.name}
                            </div> */}
                      </div>
                    </div>
                    <div className="nameInfoPErAlu plusnipa">Email:</div>
                    {/* <p className="placeholder-wave">
                      <span className="placeholder col-12 placeholder-lg opacity-25 rounded-2 email-student-loader"></span>
                    </p> */}
                    {/* <div className="plusnipa2">{info.email}</div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="pendientesContperfAlum">
              <div className="myPEndHeaderPerFal">
                <span className="mispenSpan">Mis Pendientes</span>
              </div>
              <div>
                <p className="placeholder-wave">
                  <span className="placeholder col-12 placeholder-lg opacity-25 rounded-2"></span>
                </p>
                <p className="placeholder-wave">
                  <span className="placeholder col-12 placeholder-lg opacity-25 rounded-2"></span>
                </p>
                <p className="placeholder-wave">
                  <span className="placeholder col-12 placeholder-lg opacity-25 rounded-2"></span>
                </p>
                <p className="placeholder-wave">
                  <span className="placeholder col-12 placeholder-lg opacity-25 rounded-2"></span>
                </p>
                <p className="placeholder-wave">
                  <span className="placeholder col-12 placeholder-lg opacity-25 rounded-2"></span>
                </p>
              </div>
              {/* <MdOutlinePendingActions
                style={{ color: "rgb(151, 140, 140,0.8)" }}
                size={24}
              /> */}
            </div>
          </div>

          <div className="myFavCont">
            <div className="myFavHeaderPerFal">
              <span>Mis Favoritos</span>
              {/* <MdOutlineFavorite
                  size={30}
                  style={{ color: "rgb(253, 17, 49)" }}
                /> */}
            </div>
            <div>
              <p className="placeholder-wave">
                <span className="placeholder col-12 placeholder-lg opacity-25 rounded-2"></span>
              </p>
              <p className="placeholder-wave">
                <span className="placeholder col-12 placeholder-lg opacity-25 rounded-2"></span>
              </p>
              <p className="placeholder-wave">
                <span className="placeholder col-12 placeholder-lg opacity-25 rounded-2"></span>
              </p>
              <p className="placeholder-wave">
                <span className="placeholder col-12 placeholder-lg opacity-25 rounded-2"></span>
              </p>
              <p className="placeholder-wave">
                <span className="placeholder col-12 placeholder-lg opacity-25 rounded-2"></span>
              </p>

              {/* {myFavProfe.length === 0 ? (
                <div className="aunnofavCont">
                  Aún no agregas nada a favoritos.
                </div>
              ) : (
                <div>
                  <Carousel>
                    {myFavProfe.map((f) => (
                      <Carousel.Item>
                        <div className="centerProfCardsFavAL">
                          <ProfeCard
                            id={f.id}
                            username={f.username}
                            nombre={f.nombre}
                            imagen={f.imagen}
                            pais={f.country?.flag}
                            descripcion={f.descripcion}
                            materias={f.materias}
                            puntuacion={f.puntuacions}
                            precio={f.precio}
                          />
                        </div>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoaderPerfilStudent;
