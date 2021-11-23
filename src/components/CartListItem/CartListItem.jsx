import { useState } from 'react'
import { Row, Col, Image, InputGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'



const CartListItem = ({ product, removeProduct }) => {

    const [subtotal, setSubtotal] = useState(product.subtotal)
    const [count, setCount] = useState(product.cantidadAgregada)


    const quitarProducto = () => {
        console.log("Se quito el producto")
       // removeProduct(product.id)

    }

    

    const sumarCantidad = () => {
        if (count <= product.stock) {
            setCount(count + 1)
            setSubtotal(product.precio * count)
        }

    }

    const restarCantidad = () => {
        if (count >= 1) {
            setCount(count - 1)
            setSubtotal(product.precio * count)
        }

    }

    return (
        <Row className="cart-list-item">
            <Col xs="3">
                <Image src={product.img} fluid />
            </Col>
            <Col xs="5">
                <h4><b>{product.nombre}</b> <small>{product.autor}</small></h4>
                <h6>{product.editorial}</h6>
                <h5><b>Precio unidad:</b> $<small>{product.precio}</small></h5>
            </Col>
            <Col xs="2">
                <h4>x<small>{product.cantidadAgregada}</small></h4>
                {/*<InputGroup className="counter-group mb-3">
                    <Button variant="outline-secondary" className="counter-group-button" onClick={restarCantidad}>-</Button>
                    <Button variant="outline-secondary" className="counter-group-button counter-disabled" disabled>{count}</Button>
                    <Button variant="outline-secondary" className="counter-group-button" onClick={sumarCantidad}>+</Button>
    </InputGroup>*/}
            </Col>
            <Col xs="1">
                <span className="subtotal">${subtotal}</span>
            </Col>
            <Col xs="1">
                <button className="delete-product" onClick={quitarProducto}><FontAwesomeIcon icon={faTrashAlt} size="2x" /></button>
            </Col>
        </Row>
    )
}

export default CartListItem
