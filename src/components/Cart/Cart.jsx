import { useState, useEffect, memo } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useCartContext } from '../../context/CartContext'
import CartListItem from '../CartListItem/CartListItem.jsx'
import { Link } from 'react-router-dom'

import './Cart.css';

const Cart = memo(() => {

    const { quitarTodo, cartList, precioTotal, borrarDelCarro } = useCartContext()

    const [isModified, setIsModified] = useState(false)


    useEffect(() => {
        setTimeout(() => {
            setIsModified(false)
        }, 1000);
    }, [isModified])


    const onRemove = (currentItemId) => {

        setIsModified(true)
        borrarDelCarro(currentItemId)

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
                            <CartListItem key={index} product={product} onRemove={onRemove} />
                        )}
                        <Row>
                            <Col xs={{ span: 3, offset: 9 }}>
                                <h3 className="total-label">Total: <b>${precioTotal()}</b></h3>
                                <button className="btn-quitar-todo" onClick={quitarTodo}>Quitar todos los productos</button>
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
}, (anterior, posterior) => anterior.cartList.length === posterior.cartList.length)
export default Cart