import { useState, useEffect, memo } from 'react'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import { useCartContext } from '../../context/CartContext'
import CartListItem from '../CartListItem/CartListItem.jsx'
import { Link } from 'react-router-dom'
import firebase from "firebase"
import 'firebase/firestore'
import { getFirestore } from '../../services/getFirestore.js'

import './Cart.css';

const Cart = memo(() => {

    const { quitarTodo, cartList, precioTotal, borrarDelCarro } = useCartContext()

    const [isModified, setIsModified] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [orderId, setOrderId] = useState("")


    useEffect(() => {
        setTimeout(() => {
            setIsModified(false)
        }, 1000);
    }, [isModified])


    const onRemove = (currentItemId) => {

        setIsModified(true)
        borrarDelCarro(currentItemId)

    }

    const removeAll = () => {
        setIsModified(true)
        quitarTodo()
    }

    const generarOrden = () => {

        let orden = {}
        orden.date = firebase.firestore.Timestamp.fromDate(new Date())
        orden.total = precioTotal()
        orden.buyer = { nombre: "Nicolas Canteros", mail: "canteros21@gmail.com", tel: "48218180" }
        orden.items = cartList.map(cartItem => {
            const id = cartItem.id
            const nombre = cartItem.nombre
            const precio = cartItem.precio * cartItem.cantidadAgregada

            return { id, nombre, precio }
        })


        const dbQuery = getFirestore()
        dbQuery.collection("ordenes").add(orden)
            .then(resp => {
                console.log(resp)
                setOrderId(resp.id)
            })
            .catch(err => console.log(err))
            .finally(() => {
                setShowModal(true)
            })

        /*const itemsToUpdate = dbQuery.collection("productos").where(
            firebase.firestore.FieldPath.documentId(), "in", cartList.map(i => i.id)
        )

        const batch = dbQuery.batch()

        itemsToUpdate.get()
            .then(collection => {
                collection.docs.forEach(currentStock => {
                    batch.update(currentStock.ref, {
                        stock: currentStock.data().stock - cartList.find(item => item.id === currentStock.id).cantidadAgregada
                    })
                })

                batch.commit().then(res => {
                    console.log('resultado batch:', res);
                })
            })
        */


        console.log(orden)

    }


    const handleClose = () => { setShowModal(false) }

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
                                <button className="btn-quitar-todo" onClick={removeAll}>Quitar todos los productos</button>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={{ span: 3, offset: 9 }}>
                                <button className="btn-terminar-compra" onClick={generarOrden}>Terminar Compra</button>
                            </Col>
                            <Modal show={showModal} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>¡Gracias por su compra!</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>El código de seguimiento de su orden es: <b>{orderId}</b></Modal.Body>
                            </Modal>
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