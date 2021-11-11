import { React } from 'react'
import { Row, Col, Image } from 'react-bootstrap'
import ItemCount from '../ItemCount/ItemCount.jsx'

import './ItemDetail.css';


const ItemDetail = ({ product }) => {


    return (

        product.map(prod =>
            <div key={prod.id} className="product-detail">


                <Row>
                    <Col xs={4} >

                        <Image src={prod.img} fluid />
                    </Col>
                    <Col xs={8} >
                        <h3>{prod.nombre}</h3>
                        <h5>{prod.autor} - {prod.editorial}</h5>
                        <h4>${prod.precio}</h4>
                        <div className="info">
                            <p>{prod.detail}</p>
                        </div>
                        <h6>Stock: <b>{prod.stock}</b></h6>

                        <Row>
                            <Col xs={{ span: 4, offset: 8 }} >
                                <ItemCount nombre={prod.nombre} stock={prod.stock} initial={0} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )


    )
}

export default ItemDetail
