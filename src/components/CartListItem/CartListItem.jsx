import { Row, Col, Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'



const CartListItem = ({ product, onRemove }) => {


    const quitarProducto = () => {
        onRemove(product.id)
    }



    return (
        <Row className="cart-list-item">
            <Col xs="2">
                <Image src={product.img} fluid />
            </Col>
            <Col xs="6">
                <h4><b>{product.nombre}</b> <small>{product.autor}</small></h4>
                <h6>{product.editorial}</h6>
                <h5><b>Precio unidad:</b> $<small>{product.precio}</small></h5>
            </Col>
            <Col xs="2">
                <h3>x{product.cantidadAgregada}</h3>
            </Col>
            <Col xs="1">
                <span className="subtotal">${product.subtotal}</span>
            </Col>
            <Col xs="1">
                <button className="delete-product" onClick={quitarProducto}><FontAwesomeIcon icon={faTrashAlt} size="2x" /></button>
            </Col>
        </Row>
    )
}

export default CartListItem
