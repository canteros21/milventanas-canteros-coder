import { React } from 'react'
import { Row, Col } from 'react-bootstrap'
import ReactHtmlParser from 'react-html-parser';

import './OrderList.css';

const OrderList = ({ orderDetail }) => {



    return (
        <>
            <h6>Detalle de su compra:</h6>
            <Row>
                <Col xs="8"><h5><b>Producto</b></h5></Col>
                <Col xs="4"><h5><b>Cantidad</b></h5></Col>
            </Row>
            {orderDetail.map(ele =>
                <Row>
                    <Col xs="8"><h5>{ReactHtmlParser(ele.nombre)}</h5></Col>
                    <Col xs="4"><h5>{ele.cantidad}</h5></Col>
                </Row>
            )}
        </>
    )
}
export default OrderList