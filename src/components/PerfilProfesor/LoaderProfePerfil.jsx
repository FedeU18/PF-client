import React from "react";
import { Link } from "react-router-dom";
import "./PerfilProfesor.css";

const LoaderProfePerfil = () => {
  return (
    <div className="divPrincipalProf">
      <div className="ContMyPerfilFavoritesProf">
        <Link to="/home">
          <button className="goBackBtn">
            <img className="gobackArrowProf" src={"/retro.png"} />
          </button>
        </Link>

        <div>
          <div className="myperfilContProf">
            <div className="FotoPerfilAContProf">
              <img
                src={
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
                }
                className="ProfilePictureAlumProf"
              />

              <div className="usernameProfePEr"></div>
              <button className="button-17" role="button">
                Profesor
              </button>

              <button className="button-62" role="button">
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

        <div className="myFavContProf p-1">
          <div className="siporquDEvEle mt-5">
            <p className="placeholder-wave">
              <span className="placeholder col-12 placeholder-lg rounded-1"></span>
            </p>
            <p className="placeholder-wave">
              <span className="placeholder col-12 placeholder-lg rounded-1"></span>
            </p>
            <p className="placeholder-wave">
              <span className="placeholder col-12 placeholder-lg rounded-1"></span>
            </p>
            <p className="placeholder-wave">
              <span className="placeholder col-12 placeholder-lg rounded-1"></span>
            </p>

            <p className="placeholder-wave">
              <span className="placeholder col-12 placeholder-lg rounded-1"></span>
            </p>
            <p className="placeholder-wave">
              <span className="placeholder col-12 placeholder-lg rounded-1"></span>
            </p>
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
            <div className="materiasContProfPEr">
              <p className="placeholder-wave">
                <span className="placeholder col-12 placeholder-lg rounded-1"></span>
              </p>
              <p className="placeholder-wave">
                <span className="placeholder col-12 placeholder-lg rounded-1"></span>
              </p>
              <p className="placeholder-wave">
                <span className="placeholder col-12 placeholder-lg rounded-1"></span>
              </p>
              <p className="placeholder-wave">
                <span className="placeholder col-12 placeholder-lg rounded-1"></span>
              </p>
              <p className="placeholder-wave">
                <span className="placeholder col-12 placeholder-lg rounded-1"></span>
              </p>
              <p className="placeholder-wave">
                <span className="placeholder col-12 placeholder-lg rounded-1"></span>
              </p>
            </div>
          </div>
        </div>

        <div className="MisCertificadosPRofePEr">
          <div className="myFavHeaderPerFal">
            <span>
              Mis Certificados
              <button className="btnEditProAluProf btnEditprofOTher"></button>
            </span>
          </div>
          <div className="">
            <p className="placeholder-wave">
              <span className="placeholder col-12 placeholder-lg rounded-1 certificadoLoader"></span>
            </p>
            <p className="placeholder-wave">
              <span className="placeholder col-12 placeholder-lg rounded-1 certificadoLoader"></span>
            </p>
            <p className="placeholder-wave">
              <span className="placeholder col-12 placeholder-lg rounded-1 certificadoLoader"></span>
            </p>
            <p className="placeholder-wave">
              <span className="placeholder col-12 placeholder-lg rounded-1 certificadoLoader"></span>
            </p>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoaderProfePerfil;
