import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'


import logo from './logo.png'
import './Botonera.css';

const botones = ['Novedades', 'Categorías', 'Editoriales', 'Contacto']

const Botonera = () => {

    return (
        <Navbar bg="light" fixed="top" expand="lg">
            <Container>
                <Navbar.Brand href="#home"><img src={logo} className="img-fluid" alt="Mil Ventanas, tienda de novelas y comics" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {botones.map(function (item, i) {
                            return <Nav.Link href='#'>{item}</Nav.Link>
                        })}

                    </Nav>
                    <Button variant="outline-danger"><FontAwesomeIcon icon={faShoppingCart} /></Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Botonera
