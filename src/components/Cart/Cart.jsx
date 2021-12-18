import { useState, useEffect, memo } from 'react'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import { useCartContext } from '../../context/CartContext'
import CartListItem from '../CartListItem/CartListItem.jsx'
import OrderList from '../OrderList/OrderList.jsx'
import { Link } from 'react-router-dom'
import firebase from "firebase"
import 'firebase/firestore'
import { getFirestore } from '../../services/getFirestore.js'

import './Cart.css';

const Cart = memo(() => {

    const { quitarTodo, cartList, precioTotal, borrarDelCarro } = useCartContext()

    const [isModified, setIsModified] = useState(false)
    const [isFormSent, setIsFormSent] = useState(false)
    const [orderDone, setOrderDone] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [nameWrong, setNameWrong] = useState(false)
    const [telWrong, setTelWrong] = useState(false)
    const [emailWrong, setEmailWrong] = useState(false)
    const [emailConfirmWrong, setEmailConfirmWrong] = useState(false)
    const [orderId, setOrderId] = useState("")
    const [orderDetail, setOrderDetail] = useState({})
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        emailConfirm: ''
    })



    useEffect(() => {
        setTimeout(() => {
            setIsModified(false)
        }, 1000);
    }, [isModified])

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const onRemove = (currentItemId) => {

        setIsModified(true)
        borrarDelCarro(currentItemId)

    }

    const removeAll = () => {
        setIsModified(true)
        quitarTodo()
    }

    const abrirFormulario = () => {
        setShowModal(true)
    }

    const generarOrden = (e) => {

        e.preventDefault()

        if (formData.name === "" || formData.name === undefined) {
            setNameWrong(true)
            return
        } else {
            setNameWrong(false)
        }

        if (formData.phone === "" || formData.phone === undefined || isNaN(formData.phone)) {
            setTelWrong(true)
            return
        } else {
            setTelWrong(false)
        }

        if (validateEmail(formData.email)) {
            setEmailWrong(false)

            if (formData.emailConfirm != formData.email) {
                setEmailConfirmWrong(true)
                return
            } else {
                setEmailConfirmWrong(false)
            }

        } else {
            setEmailWrong(true)
            return
        }


        setIsFormSent(true)

        let orden = {}
        orden.date = firebase.firestore.Timestamp.fromDate(new Date())
        orden.total = precioTotal()
        orden.buyer = formData
        orden.items = cartList.map(cartItem => {
            const id = cartItem.id
            const nombre = cartItem.nombre
            const cantidad = cartItem.cantidadAgregada
            const precio = cartItem.precio * cartItem.cantidadAgregada


            return { id, nombre, cantidad, precio }
        })


        const dbQuery = getFirestore()
        dbQuery.collection("ordenes").add(orden)
            .then(resp => {
                setOrderId(resp.id)
                setOrderDetail(orden.items)
            })
            .catch(err => console.log(err))
            .finally(() => {
                setOrderDone(true)
            })



        const itemsToUpdate = dbQuery.collection("productos").where(
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



    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleClose = () => {
        setShowModal(false)
        setIsFormSent(false)

        if (orderDone) {
            removeAll()
        }

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
                                <button className="btn-quitar-todo" onClick={removeAll}>Quitar todos los productos</button>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={{ span: 3, offset: 9 }}>
                                <button className="btn-terminar-compra" onClick={abrirFormulario}>Terminar Compra</button>
                            </Col>
                            <Modal show={showModal} onHide={handleClose}>
                                {
                                    isFormSent ?

                                        orderDone ?
                                            <>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>¡Gracias por su compra!</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body className="order-ready">
                                                    <h4>El código de seguimiento de su orden es: <b>{orderId}</b></h4>
                                                    <OrderList orderDetail={orderDetail} />
                                                </Modal.Body>
                                            </>
                                            :
                                            <>
                                                <Modal.Header>
                                                    <Modal.Title>Confirmando la compra</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>Espere unos segundos...</Modal.Body>
                                            </>
                                        :
                                        <>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Completá los datos de facturación</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <form className='buyer-form'
                                                    onSubmit={generarOrden}
                                                    onChange={handleChange}
                                                >

                                                    <div className={nameWrong ? "input-group input-name error" : "input-group input-name"}>
                                                        <label htmlFor="name">Nombre completo:</label>
                                                        <input type='text' name='name' defaultValue={formData.name} />
                                                    </div>
                                                    <div className={telWrong ? "input-group input-tel error" : "input-group input-tel"}>
                                                        <label htmlFor="phone">Teléfono/Celular:</label>
                                                        <input type='text' name='phone' defaultValue={formData.phone} />
                                                    </div>
                                                    <div className={emailWrong ? "input-group input-email error" : "input-group input-email"}>
                                                        <label htmlFor="email">Email:</label>
                                                        <input type='text' name='email' className={emailWrong ? "error" : ""} defaultValue={formData.email} />
                                                    </div>
                                                    <div className={emailConfirmWrong ? "input-group input-email-confirm error" : "input-group input-email-confirm"}>
                                                        <label htmlFor="emailConfirm">Confirmación de Email:</label>
                                                        <input type='text' name='emailConfirm' className={emailConfirmWrong ? "error" : ""} defaultValue={formData.emailConfirm} />
                                                    </div>
                                                    <button>Listo!</button>
                                                </form>

                                            </Modal.Body>
                                        </>
                                }

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