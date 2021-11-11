import { React, useState, useEffect } from 'react'
import { Col } from 'react-bootstrap'
import Item from '../Item/Item.jsx'
import { productos } from '../Products.jsx'


const getProductos = new Promise((res, rej) => {
    setTimeout(() => {
        res(productos)

    }, 2000);
    //rej('404')
})


const ItemList = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        getProductos
            .then(res => {
                setProducts(res)
            }).catch((err) => {
                console.log(`Error: ${err}`);
            }).finally(() => setLoading(false))

    }, [])


    return (
        <>
            {
                loading ? <h3>Cargando...</h3> :

                    products.map(ele =>
                        <Col xs={3} >
                            <Item key={ele.id} nombre={ele.nombre} editorial={ele.editorial} stock={ele.stock} image={ele.img} precio={ele.precio} initial={0} />
                        </Col>
                    )}
        </>
    )
}
export default ItemList