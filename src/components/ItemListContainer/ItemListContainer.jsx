import { React, useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { getFirestore } from '../../services/getFirestore.js';
import ItemList from '../ItemList/ItemList.jsx'
import { productos } from '../Products.jsx'

import './ItemListContainer.css';


const getProductos = new Promise((res, rej) => {
    setTimeout(() => {
        res(productos)

    }, 2000);
    //rej('404')
})


const ItemListContainer = ({ isNovedad }) => {

    const params = useParams();

    const categoria = params.categoryID;

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const dbQuery = getFirestore()

        if (categoria !== undefined) {

            dbQuery.collection("productos").where("categoria", "==", categoria).get()
                .then(data => {
                    setProducts(data.docs.map(prod => ({ id: prod.id, ...prod.data() })))
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);
                }).finally(() => setLoading(false))


        } else if (isNovedad) {

            dbQuery.collection("productos").where("isNovedad", "==", true).get()
                .then(data => {
                    setProducts(data.docs.map(prod => ({ id: prod.id, ...prod.data() })))
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);
                }).finally(() => setLoading(false))

        } else {

            dbQuery.collection("productos").get()
                .then(data => {
                    setProducts(data.docs.map(prod => ({ id: prod.id, ...prod.data() })))
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);
                }).finally(() => setLoading(false))
                
        }



        /*if (categoria !== undefined) {

            getProductos
                .then(res => {
                    setProducts(res.filter(prod => prod.categoria === categoria))
                }).catch((err) => {
                    console.log(`Error: ${err}`);
                }).finally(() => setLoading(false))

        } else if (isNovedad) {
            getProductos
                .then(res => {
                    setProducts(res.filter(prod => prod.isNovedad === isNovedad))
                }).catch((err) => {
                    console.log(`Error: ${err}`);
                }).finally(() => setLoading(false))
        } else {

            getProductos
                .then(res => {
                    setProducts(res)
                }).catch((err) => {
                    console.log(`Error: ${err}`);
                }).finally(() => setLoading(false))
        }*/

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