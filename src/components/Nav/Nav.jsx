import "bootstrap/dist/css/bootstrap.css";
import logOut  from '../../Authentication/functions/logOut'
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Nav.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router";
import SearchBar from "../SearchBar/SearchBar";
import userAuthentication from "../../Authentication/functions/user"

export const NavBar = (props) => {
  console.log("soy id de alumno ", props.idAlumno);
  const navigate = useNavigate();
  const {userData} = userAuthentication();

  const CloseMySesion = () => {
    logOut();
    navigate("/");
  };

  const handleProfile = () => {
    console.log()
    console.log("me ejcute");
    navigate(`/profile/${userData.id}`);
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
             <img src={'logoPF.png'} className={'logoProyecto'}/>
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
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              roundedCircle
            />
            <NavDropdown className="dro" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleProfile}>
                Mi Perfil
              </NavDropdown.Item>
              <NavDropdown.Item onClick={CloseMySesion}>
                Cerrar Sesión</NavDropdown.Item>
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
