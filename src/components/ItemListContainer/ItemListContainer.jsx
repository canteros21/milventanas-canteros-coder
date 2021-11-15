import { React, useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
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

        if (categoria !== undefined) {

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