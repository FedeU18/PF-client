import './NavAbout.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export const NavAbout=()=>{
    return(
       
         <Navbar bg="dark"  className='NavAboutCont' variant="dark">
        <Container>
          <Navbar.Brand href="/home">
            <img className='logoPF' src={'logoPF.png'}/>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Iniciar Sesión</Nav.Link>
            <Nav.Link href="/">Crear Cuenta</Nav.Link>
       
          </Nav>
        </Container>
      </Navbar>
       
    )
}