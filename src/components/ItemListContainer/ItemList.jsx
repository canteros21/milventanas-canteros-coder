import { React, useState, useEffect } from 'react'
import { Col } from 'react-bootstrap'
import Item from './Item/Item.jsx'

const productos = [
    { id: 0, nombre: "La mano del pintor", editorial: "Editorial Sigilo", stock: 14, img: "images/la-mano-del-pintor.jpg", precio: "1750", autor: "Maria Luque" },
    { id: 1, nombre: "Intensa", editorial: "Hotel de las Ideas", stock: 17, img: "images/intensa.jpg", precio: "1160", autor: "Sole Otero" },
    { id: 2, nombre: "Me aburro rápido", editorial: "Wai Comics", stock: 23, img: "images/me-aburro-rapido.jpg", precio: "950", autor: "Alexis Moyano" },
    { id: 3, nombre: "Noticia de pintores", editorial: "Editorial Sigilo", stock: 16, img: "images/noticia-de-pintores.jpg", precio: "1550", autor: "Maria Luque" },
    { id: 4, nombre: "Beautiful Darkness", editorial: "Draw & Quarterly", stock: 6, img: "images/beautiful-darkness.jpg", precio: "2850", autor: "Fabien Vehlmann" }
]

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