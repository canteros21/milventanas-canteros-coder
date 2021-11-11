import { React, useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { producto } from '../Products.jsx'
import ItemDetail from '../ItemDetail/ItemDetail.jsx'

import './ItemDetailContainer.css';

const getProducto = new Promise((res, rej) => {
    setTimeout(() => {
        res(producto)

    }, 2000);
    //rej('404')
})



const ItemDetailContainer = () => {

    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        getProducto
            .then(res => {
                setProduct(res)
            }).catch((err) => {
                console.log(`Error: ${err}`);
            }).finally(() => setLoading(false))

    }, [])

    return (
        <Container className="item-detail">
            <Row>
                {
                    loading ? <h3>Cargando...</h3> :
                        <ItemDetail product={product} />
                }
            </Row>
        </Container>
    )
}
export default ItemDetailContainer