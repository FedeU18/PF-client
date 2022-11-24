import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container';
import './Nav.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useNavigate } from "react-router";
import SearchBar from "../SearchBar/SearchBar";


export const NavBar = () => {
    const navigate = useNavigate()
    const handleProfile = () => {
        navigate('/profile')
    }

    const handleGoHome = () => {
        navigate('/home')
    }
    return (
        <div className="nnnn" >
            <Container fluid fixed="top" className="NavColorCss shadow-lg  mb-4" variant="dark" >
                <Row>

                    <Col >
                        <span onClick={handleGoHome} className="logoNav">FYT</span>
                    </Col>

                    <Col xs={10}><div><SearchBar /></div>    </Col>

                    <Col className="colAvatarDrop">
                        <Image className="imgAvatar" src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' roundedCircle />
                        <NavDropdown className="dro" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={handleProfile} >
                                Ver Mi Perfil
                            </NavDropdown.Item>
                            <NavDropdown.Item href="">
                                Cerrar Sesión
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Col>
                </Row>
            </Container>
        </div>
    )

}