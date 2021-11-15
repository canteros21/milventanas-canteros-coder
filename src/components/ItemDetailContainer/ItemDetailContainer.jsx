import { React, useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { productos } from '../Products.jsx'
import { useParams } from 'react-router-dom'
import ItemDetail from '../ItemDetail/ItemDetail.jsx'

import './ItemDetailContainer.css';

const getProducto = new Promise((res, rej) => {
    setTimeout(() => {
        res(productos)

    }, 2000);
    //rej('404')
})



const ItemDetailContainer = () => {

    let params = useParams();

    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)

    const rutaProducto = params.productID;


    useEffect(() => {

        if (rutaProducto !== undefined) {

            getProducto
                .then(res => {
                    setProduct(res.find(prod => prod.ruta === rutaProducto))
                }).catch((err) => {
                    console.log(`Error: ${err}`);
                }).finally(() => setLoading(false))
        } else {

            getProducto
                .then(res => {
                    setProduct(res)
                }).catch((err) => {
                    console.log(`Error: ${err}`);
                }).finally(() => setLoading(false))
        }


    }, [rutaProducto])

    return (
        <Container className="item-detail">
            {
                loading ? <h3 className="loading-title">Cargando...</h3> :
                    <Row>
                        <ItemDetail product={product} />

                    </Row>
            }
        </Container>
    )
}
export default ItemDetailContainer