import { Container, Nav, Navbar } from 'react-bootstrap'
import CartWidget from '../CartWidget/CartWidget.jsx'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import logo from './logo.png'
import './Botonera.css';

const botones = [
    { id: 0, nombre: "Novedades", link: "/novedades"},
    { id: 1, nombre: "Nacional", link: "/categoria/nacional"},
    { id: 2, nombre: "Internacional", link: "/categoria/internacional"},
    //{ id: 3, nombre: "Editoriales", link: "editoriales"},
    { id: 3, nombre: "Contacto", link: "/contacto"},

]

const Botonera = () => {
    
  const location = useLocation();


    return (
        <Navbar bg="light" fixed="top" expand="lg">
            <Container>
                <Navbar.Brand  as={Link} to="/"><img src={logo} className="img-fluid" alt="Mil Ventanas, tienda de novelas y comics" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" activeKey={location.pathname}>
                        {botones.map(function (item) {
                            return <Nav.Link key={item.id} as={Link} to={item.link}>{item.nombre}</Nav.Link>
                        })}

                    </Nav>
                    <Link to="cart">
                        <CartWidget />
                    </Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Botonera
