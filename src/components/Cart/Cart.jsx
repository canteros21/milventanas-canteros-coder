import { Container, Row, Col, Button } from 'react-bootstrap'
import { useCartContext } from '../../context/CartContext'
import CartListItem from '../CartListItem/CartListItem.jsx'
import { Link } from 'react-router-dom'

import './Cart.css';

const Cart = () => {

    const { cartList, totalPrice, setTotalPrice, totalItems, setTotalItems } = useCartContext()

    console.log(cartList)

    const removeProduct = (currentItemId) => {


        cartList.forEach((prod) => {
            if (prod.id === currentItemId) {
                cartList.splice(cartList.findIndex(a => a.id === prod.id), 1)

                console.log(totalPrice)
                let subtotalAQuitar = prod.cantidadAgregada * prod.precio

                setTotalPrice(totalPrice - subtotalAQuitar)
                setTotalItems(totalItems - prod.cantidadAgregada)
            }
        });
    }

    return (
        <>
            {
                cartList.length > 0 ?

                    <Container className="cart-container">
                        <h2 className="title">Carrito de compras</h2>
                        <Row className="cart-list-header">
                            <Col xs="10" className="col-header">
                                <h5>Producto</h5>
                            </Col>
                            <Col xs="2" className="col-header">
                                <h5>Subtotal</h5>
                            </Col>
                        </Row>

                        {cartList.map((product, index) =>
                            <CartListItem key={index} product={product} removeProduct={removeProduct} />
                        )}
                        <Row>
                            <Col xs={{ span: 2, offset: 10 }}>
                                <h3>Total: <b>${totalPrice}</b></h3>
                            </Col>
                        </Row>
                    </Container >
                    :

                    <Container className="cart-container-empty">
                        <h3>Actualmente no posee productos en su Carrito</h3>
                        <h5>Le recomendamos estas <Link to="/novedades" className="btn-link-novedades"><Button variant="danger" size="sm">Novedades</Button></Link> que le puede interesar!</h5>
                    </Container>
            }
        </>
    )
}
export default Cart