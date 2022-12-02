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


export const NavBar = () => {
  const navigate = useNavigate();  
  const dispatch=useDispatch()
  const { userData } = userAuthentication();
  let infoAlumno = useSelector((state) => state.alumnos.alumno);
  let infoProfesor = useSelector((state) => state.profesores.detail);
  const [useFoto ,SetUserFoto]=useState('')
  let id = userData.id;
  useEffect(()=>{
    dispatch(actionsAlumno.getAlumnoFromAPI(id));
    dispatch(actionsProfesor.getProfesorById(id));
  },[])

  useEffect(()=>{
    if(Object.entries(infoProfesor).length === 0 && Object.entries(infoAlumno).length===0){
      SetUserFoto("https://thumbs.gfycat.com/BronzeSpryAlleycat-size_restricted.gif")
      }
    else{
      if(infoAlumno.picture){
        if(infoAlumno.picture==='sin foto'){
          SetUserFoto("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    
        }else{
          SetUserFoto(infoAlumno.picture)
        }
      }
      if(infoProfesor.imagen){
        if(infoProfesor.imagen===null){
          SetUserFoto("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    
        }else{
          SetUserFoto(infoProfesor.imagen)
        }
      }
    }
  },[])

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
        <Row>
          <Col>
            <span onClick={handleGoHome} className="logoNav">
              <img src={"logoPF.png"} className={"logoProyecto"} />
            </span>
          </Col>

          <Col xs={10}>
            <div>
              <SearchBar />
            </div>{" "}
          </Col>

          <Col className="colAvatarDrop">
            <Image
              className="imgAvatar"
              src={useFoto}
              roundedCircle
            />
            <NavDropdown className="dro" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleProfile}>
                Mi Perfil
              </NavDropdown.Item>
              <NavDropdown.Item onClick={CloseMySesion}>
                Cerrar Sesión
              </NavDropdown.Item>
              {/* <NavDropdown.Divider />
                        <NavDropdown.Item href="">
                            Separated link
                        </NavDropdown.Item> */}
            </NavDropdown>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
