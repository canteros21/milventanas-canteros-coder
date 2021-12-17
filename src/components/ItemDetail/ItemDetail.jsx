import { React } from 'react'
import { Row, Col, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useCartContext } from '../../context/CartContext.jsx';
import ItemCount from '../ItemCount/ItemCount.jsx'
import ReactHtmlParser from 'react-html-parser';

import './ItemDetail.css';


const ItemDetail = ({ product }) => {


    const { agregarAlCarro, totalItems, setTotalItems } = useCartContext()

    let history = useNavigate();

    const onAdd = (cantidad) => {

        let subtotal = product.precio * cantidad
        setTotalItems(totalItems + cantidad)
        agregarAlCarro({ ...product, cantidadAgregada: cantidad, subtotal: subtotal }, cantidad, subtotal)
    }


    return (

        <div key={product.id} className="product-detail">

            <Row>
                <Col xs={4} >

                    <Image src={product.img} fluid />
                </Col>
                <Col xs={8} >
                    <h3 className="title">{product.nombre}</h3>
                    <h5>{product.autor} - {product.editorial}</h5>
                    <h4>${product.precio}</h4>
                    <div className="info">{ReactHtmlParser(product.detail)}</div>
                    <h6>Stock: <b>{product.stock}</b></h6>

                    <Row>
                        <Col xs={{ span: 4, offset: 8 }} >
                            <ItemCount nombre={product.nombre} stock={product.stock} initial={0} onAdd={onAdd} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 2, offset: 10 }} >
                            <button onClick={() => { history(-1) }} className="btn-volver">Volver</button>
                        </Col>
                    </Row>
                </Col>
            </Row >
        </div >

    )
}

export default ItemDetail
