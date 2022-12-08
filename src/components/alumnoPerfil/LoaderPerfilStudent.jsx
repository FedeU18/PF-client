import React from "react";
import { Link } from "react-router-dom";
import "./alumnoPerfil.css"

const LoaderPerfilStudent = () => {
  return (
    <div>
      <div className="divPrincipal">
        <div className="ContMyPerfilFavorites">
          <Link to="/home">
          <Link to="/home">
              <button className="goBackBtn">
                <img className="gobackArrow" src={"/retro.png"} />
              </button>
            </Link>
          </Link>
          <div>
            <div className="myperfilCont">
              <div className="FotoPerfilACont">
              <img src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"} className="ProfilePictureAlum" />
                <button className="button-17" role="button">
                  Alumno
                </button>
              </div>
              <div className="InFoAlumnoPErfCont">
                <div className="titleMyPRofile">
                  <span>Mi Perfil</span>
                  <button className="btnEditProAlu">x</button>
                </div>

                <div className="contInfoPErfAlum">
                  <div>
                    <div className="miniContinfoPErfAlu">
                      <div className="eachInfoIputPErProfe">
                        <div className="nameInfoPErAlu">Nombre:</div>
                        <p className="placeholder-wave">
                          <span className="placeholder col-12 placeholder-lg opacity-25 rounded-2"></span>
                        </p>
                      </div>
                      <div className="eachInfoIputPErProfe">
                        <div className="nameInfoPErAlu">Apellido:</div>
                        <p className="placeholder-wave">
                          <span className="placeholder col-12 placeholder-lg opacity-25 rounded-2"></span>
                        </p>
                      </div>
                      <div className="eachInfoIputPErProfe">
                        <div className="nameInfoPErAlu">Edad:</div>
                        <p className="placeholder-wave">
                          <span className="placeholder col-12 placeholder-lg opacity-25 rounded-2"></span>
                        </p>
                      </div>
                      <div className="eachInfoIputPErProfe">
                        <div className="nameInfoPErAlu">Pais:</div>
                        <p className="placeholder-wave">
                          <span className="placeholder col-12 placeholder-lg opacity-25 rounded-2"></span>
                        </p>
                      </div>
                    </div>
                    <div className="nameInfoPErAlu plusnipa">Email:</div>
                    <p className="placeholder-wave">
                      <span className="placeholder col-12 placeholder-lg opacity-25 rounded-2 email-student-loader"></span>
                    </p>
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
            </div>
          </div>

          <div className="myFavCont">
            <div className="myFavHeaderPerFal">
              <span>Mis Favoritos</span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoaderPerfilStudent;
