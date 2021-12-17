import { React, useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { getFirestore } from '../../services/getFirestore.js';
import ItemList from '../ItemList/ItemList.jsx'

import './ItemListContainer.css';


const ItemListContainer = ({ isNovedad }) => {

    const params = useParams();

    const categoria = params.categoryID;

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const db = getFirestore()
        const dbQueryProductos = db.collection("productos")

        if (categoria !== undefined) {

            dbQueryProductos.where("categoria", "==", categoria).get()
                .then(data => {
                    setProducts(data.docs.map(prod => ({ id: prod.id, ...prod.data() })))
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);
                }).finally(() => setLoading(false))


        } else if (isNovedad) {

            dbQueryProductos.where("isNovedad", "==", true).get()
                .then(data => {
                    setProducts(data.docs.map(prod => ({ id: prod.id, ...prod.data() })))
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);
                }).finally(() => setLoading(false))

        } else {

            dbQueryProductos.get()
                .then(data => {
                    setProducts(data.docs.map(prod => ({ id: prod.id, ...prod.data() })))
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);
                }).finally(() => setLoading(false))
                
        }


    }, [categoria, isNovedad])


    return (
        <Container>
            {
                loading ? <h3 className="loading-title">Cargando...</h3> :
                    <div className='item-list'>
                        {
                            isNovedad ? <h2>Novedades</h2> :
                                <h2>{params.categoryID}</h2>
                        }
                        <Row>
                            <ItemList products={products} categoria={params.categoryID} isNovedad={isNovedad} />
                        </Row>
                    </div>
            }
        </Container>
    )
}
export default ItemListContainer