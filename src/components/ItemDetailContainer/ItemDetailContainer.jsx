import { React, useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import ItemDetail from '../ItemDetail/ItemDetail.jsx'
import { getFirestore } from '../../services/getFirestore.js'

import './ItemDetailContainer.css';



const ItemDetailContainer = () => {

    let params = useParams();

    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)

    const rutaProducto = params.productID;



    useEffect(() => {

        const dbQuery = getFirestore()

        if (rutaProducto !== undefined) {

            dbQuery.collection("productos").doc(rutaProducto).get()
                .then(prod => {
                    setProduct({ id: prod.id, ...prod.data() })
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);
                }).finally(() => setLoading(false))

        } else {

            dbQuery.collection("productos").get()
                .then(data => {
                    setProduct(data.docs.map(prod => ({ id: prod.id, ...prod.data() })))
                })
                .catch((err) => {
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