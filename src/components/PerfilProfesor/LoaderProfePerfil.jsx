import React from "react";
import { Link } from "react-router-dom";
import "./PerfilProfesor.css";

const LoaderProfePerfil = () => {
  return (
    <div className="divPrincipalProf">
      {/* <EditarProfesor
            show={show}
            profesor={info}
            handleClose={handleClose}
          /> */}
      {/* <AñadirCerificado
            show={modalShow}
            profesorId={info.id}
            onHide={() => setModalShow(false)}
          /> */}

      <div className="ContMyPerfilFavoritesProf">
        <Link to="/home">
          <button className="goBackBtn">
            <img className="gobackArrowProf" src={"/retro.png"} />
          </button>
        </Link>

        <div>
          <div className="myperfilContProf">
            <div className="FotoPerfilAContProf">
              <img src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"} className="ProfilePictureAlumProf" />

              <div className="usernameProfePEr"></div>
              <button class="button-17" role="button">
                Profesor
              </button>

              <button class="button-62" role="button">
                Ir a Mi Perfil Comercial
              </button>
            </div>
            <div className="InFoAlumnoPErfContProf">
              <div className="titleMyPRofileProf">
                <span>Mi Perfil</span>
                <button className="btnEditProAluProf">
                  {/* <AiOutlineEdit onClick={handleShow} /> */}
                </button>
              </div>

              <div className="contInfoPErfAlumProf">
                <div>
                  <div className="miniContinfoPErfAluProf">
                    <div className="eachInfoIputPErProfe">
                      <div className="nameInfoPErAluProf">Nombre:</div>
                      <p className="placeholder-wave">
                        <span className="placeholder col-12 placeholder-lg rounded-1"></span>
                      </p>
                    </div>
                    <div className="eachInfoIputPErProfe">
                      <div className="nameInfoPErAluProf">Apellido:</div>
                      <p className="placeholder-wave">
                        <span className="placeholder col-12 placeholder-lg rounded-1"></span>
                      </p>
                    </div>
                    <div className="eachInfoIputPErProfe">
                      <div className="nameInfoPErAluProf">Precio:</div>
                      <p className="placeholder-wave">
                        <span className="placeholder col-12 placeholder-lg rounded-1"></span>
                      </p>
                    </div>
                    <div className="eachInfoIputPErProfe">
                      <div className="nameInfoPErAluProf">Pais:</div>
                      <p className="placeholder-wave">
                        <span className="placeholder col-12 placeholder-lg rounded-1"></span>
                      </p>
                    </div>
                  </div>
                  <div className="nameInfoPErAluProf plusnipaProf">Email:</div>
                  <p className="placeholder-wave">
                    <span className="placeholder col-12 placeholder-lg rounded-1"></span>
                  </p>
                  <br></br>
                  <div className="nameInfoPErAluProf plusnipaProf">
                    Descripción:
                  </div>
                  <p className="placeholder-wave">
                    <span className="placeholder col-12 placeholder-lg rounded-1"></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="myFavContProf">
          <div className="siporquDEvEle">
            <div className="myFavHeaderPerFal">
              <span>¿Porque deberian elegirme?</span>
            </div>
            <div className="desc2profPEr"></div>
          </div>
        </div>
      </div>

      <div className="SEcondcontProper">
        <div className="myMAteriasProfper">
          <div className="myFavHeaderPerFal">
            <span>
              Mis Materias
              <button className="btnEditProAluProf btnEditprofOTher ">
                {/* <AiOutlineEdit /> */}
              </button>
            </span>
            <div className="materiasContProfPEr"></div>
          </div>
        </div>

        <div className="MisCertificadosPRofePEr">
          <div className="myFavHeaderPerFal">
            <span>
              Mis Certificados
              <button className="btnEditProAluProf btnEditprofOTher"></button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoaderProfePerfil;
