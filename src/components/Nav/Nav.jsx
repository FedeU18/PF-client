import "bootstrap/dist/css/bootstrap.css";
import logOut from "../../Authentication/functions/logOut";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import "./Nav.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router";
import SearchBar from "../SearchBar/SearchBar";
import userAuthentication from "../../Authentication/functions/user";
import { useEffect, useState } from "react";
import * as actionsAlumno from "../../redux/Actions/Alumno";
import * as actionsProfesor from "../../redux/Actions/Profesor";
import { useDispatch, useSelector } from "react-redux";
import { clearAlumno } from "../../redux/Actions/Alumno";
import { clear } from "../../redux/Actions/Profesor";
import { BsFillBellFill, BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import {
  getNotificaciones,
  EditarNotificaciones,
} from "../../redux/Actions/Notificacion";
import { CgProfile, CgLogOff } from "react-icons/cg";
import { setDarkTheme, setLightTheme } from "../../redux/Actions/Themes";
import { verifyTheme } from "../../redux/Reducer/themeReducer";
import styles from "./Nav.module.css"

export const NavBar = () => {
  const theme = useSelector(state => state.theme.theme)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = userAuthentication();
  let infoAlumno = useSelector((state) => state.alumnos.alumno);
  let infoProfesor = useSelector((state) => state.profesores.detail);
  let notificaciones = useSelector(
    (state) => state.notificaciones.notificaciones
  );
  const [useFoto, SetUserFoto] = useState("");
  const [notis, setNotis] = useState(0);
  let id = userData.id;

  useEffect(() => {
    dispatch(actionsAlumno.getAlumnoFromAPI(id));
    dispatch(actionsProfesor.getProfesorById(id));
    dispatch(getNotificaciones());
    return () => {
      dispatch(clear());
      dispatch(clearAlumno());
    };
  }, []);

  const setToDarkTheme = () => {
    dispatch(setDarkTheme());
  };

  const setToLightTheme = () => {
    dispatch(setLightTheme());
  };

  useEffect(() => {
    setNotis(0);
    if (notificaciones.length > 0) {
      notificaciones.map((n) => {
        if (n.visto1 === false) {
          setNotis((prev) => prev + 1);
        }
      });
    }
  }, [notificaciones]);

  useEffect(() => {
    if (
      Object.entries(infoProfesor).length === 0 &&
      Object.entries(infoAlumno).length === 0
    ) {
      SetUserFoto(
        "https://thumbs.gfycat.com/BronzeSpryAlleycat-size_restricted.gif"
      );
    } else {
      if (infoAlumno.picture) {
        if (infoAlumno.picture === "sin foto") {
          SetUserFoto(
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          );
        } else {
          console.log("aqui a");
          SetUserFoto(infoAlumno.picture);
        }
      }
      if (infoProfesor.imagen) {
        if (infoProfesor.imagen === "") {
          console.log("aqui");
          SetUserFoto(
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          );
        } else {
          console.log("aqui 2");
          SetUserFoto(infoProfesor.imagen);
        }
      }
    }
  }, [infoAlumno, infoProfesor]);

  const handleNotis = () => {
    dispatch(EditarNotificaciones());
    navigate("/notificaciones");
  };

  const CloseMySesion = () => {
    logOut();
    navigate("/");
  };

  const handleProfile = () => {
    console.log();
    console.log("me ejcute");

    navigate(`/profile`);
  };

  const handleGoHome = () => {
    navigate("/home");
  };
  return (
    <div className={`nnnn`}>
      <Container
        fluid
        fixed="top"
        className={`${theme === "dark" ? styles.dark_nav : null} NavColorCss shadow-lg`}
        variant="dark"
      >
        <div className="d-flex justify-content-between gap-4 p-1 align-items-center">
          <div>
            <img
              onClick={handleGoHome}
              src={"/logoPF.png"}
              className={"logoProyecto d-block"}
              style={{ width: "75px", height: "40px", cursor: "pointer" }}
            />
          </div>

          <div>
            <SearchBar />
          </div>

          <div
            className={`${
              Object.entries(infoProfesor).length > 0 &&
              infoProfesor.administrador === true &&
              "colAvatarDrop"
            }`}
          >
            {Object.entries(infoProfesor).length > 0 &&
              infoProfesor.administrador === true && (
                <button
                  type="button"
                  className="position-relative btnBellNoti"
                  onClick={handleNotis}
                >
                  <BsFillBellFill size={30} />
                  {notis > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {notis}
                    </span>
                  )}
                </button>
              )}

            <div className="position-relative" style={{ marginRight: ".5rem" }}>
              <img
                className="imgAvatar rounded-5 border-0"
                src={useFoto}
                style={{ objectFit: "cover", width: "40px", height: "40px" }}
              />

              <NavDropdown
                className={`position-absolute top-0 start-0 p-1 rounded-5`}
                id="basic-nav-dropdown"
                style={{ width: "45px", height: "50px", color: "transparent" }}
              >
                <div>
                  <NavDropdown.Item
                    className="fw-bolder"
                    style={{ width: "200px", marginBottom: ".5rem" }}
                  >
                    <div className="row">
                      <div className="col-6">
                        <button
                          className="btn btn-dark"
                          onClick={setToDarkTheme}
                        >
                          Dark <BsFillMoonFill />
                        </button>
                      </div>
                      <div className="col-6">
                        <button
                          className="btn btn-light"
                          onClick={setToLightTheme}
                        >
                          Light <BsFillSunFill />
                        </button>
                      </div>
                    </div>
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className="fw-bolder"
                    onClick={handleProfile}
                  >
                    <CgProfile className="fs-5 Ajuste-Icons" /> Mi Perfil
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className="fw-bolder"
                    onClick={CloseMySesion}
                  >
                    <CgLogOff className="fs-5 Ajuste-Icons" /> Cerrar Sesión
                  </NavDropdown.Item>
                </div>
              </NavDropdown>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
