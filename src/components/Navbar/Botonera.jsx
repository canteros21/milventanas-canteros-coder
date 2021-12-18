import { React, useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import CartWidget from '../CartWidget/CartWidget.jsx'
import { Link } from 'react-router-dom'

import logo from './logo.png'
import './Botonera.css';

const botones = [
    { id: 0, nombre: "Novedades", link: "/novedades" },
    { id: 1, nombre: "Nacional", link: "/categoria/nacional" },
    { id: 2, nombre: "Internacional", link: "/categoria/internacional" }

]

const Botonera = () => {


    const [currentKey, setCurrentKey] = useState(-1);


    return (
        <Navbar bg="light" fixed="top" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/" onClick={() => { setCurrentKey(-1) }}><img src={logo} className="img-fluid" alt="Mil Ventanas, tienda de novelas y comics" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" activeKey={currentKey}>
                        {botones.map(function (item) {
                            return <Nav.Link key={item.id} as={Link} eventKey={item.id} to={item.link} onClick={() => { setCurrentKey(item.id) }}>{item.nombre}</Nav.Link>
                        })}

                    </Nav>
                    <Link to="cart" onClick={() => { setCurrentKey(10) }}>
                        <CartWidget />
                    </Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Botonera
