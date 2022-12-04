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
import {clearAlumno } from "../../redux/Actions/Alumno";
import { clear } from "../../redux/Actions/Profesor";

export const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = userAuthentication();
  let infoAlumno = useSelector((state) => state.alumnos.alumno);
  let infoProfesor = useSelector((state) => state.profesores.detail);
  const [useFoto, SetUserFoto] = useState("");
  let id = userData.id;
  useEffect(() => {
    dispatch(actionsAlumno.getAlumnoFromAPI(id));
    dispatch(actionsProfesor.getProfesorById(id));
    return ()=> {
      dispatch(clear())
      dispatch(clearAlumno())
    }
  },[])

  useEffect(()=>{
    if(Object.entries(infoProfesor).length === 0 && Object.entries(infoAlumno).length===0){
      SetUserFoto("https://thumbs.gfycat.com/BronzeSpryAlleycat-size_restricted.gif")
      }
    else{
      console.log('entra')
      console.log('aqui: ',infoProfesor)
      console.log('aq: ',infoAlumno)
      if(infoAlumno.picture){
        if(infoAlumno.picture==='sin foto'){
          SetUserFoto("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    
        }else{
          console.log('aqui a')
          SetUserFoto(infoAlumno.picture)
        }
      }
      if(infoProfesor.imagen){
        if(infoProfesor.imagen===''){
          console.log('aqui')
          SetUserFoto("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    
        }else{
          console.log('aqui 2')
          SetUserFoto(infoProfesor.imagen)
        }
      }
    }
  },[infoAlumno, infoProfesor])

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
    <div className="nnnn">
      <Container
        fluid
        fixed="top"
        className="NavColorCss shadow-lg  mb-4"
        variant="dark"
      >
        <div className="d-flex justify-content-between gap-4 p-1 align-items-center">
          <div>
            <img
              src={"logoPF.png"}
              className={"logoProyecto d-block"}
              style={{ width: "75px", height: "40px" }}
            />
          </div>

          <div>
            <div>
              <SearchBar />
            </div>
          </div>

          <div>
            <div className="position-relative">
              <img
                className="imgAvatar rounded-5"
                src={useFoto}
                roundedCircle
                style={{ objectFit: "cover", width: "40px", height: "40px" }}
              />

              <NavDropdown
                className={`position-absolute top-0 start-0 p-1 rounded-5`}
                id="basic-nav-dropdown"
                style={{ width: "45px", height: "50px" }}
              >
                <div>

                <NavDropdown.Item className="opacity-100" onClick={handleProfile}>
                  Mi Perfil
                </NavDropdown.Item>
                <NavDropdown.Item onClick={CloseMySesion}>
                  Cerrar Sesión
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
