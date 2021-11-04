import { Container, Nav, Navbar } from 'react-bootstrap'
import CartWidget from '../CartWidget/CartWidget.jsx'

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
                            return <Nav.Link key={i} href='#'>{item}</Nav.Link>
                        })}

                    </Nav>
                    <CartWidget />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Botonera
