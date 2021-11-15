import { React } from 'react'
import { Col } from 'react-bootstrap'
import Item from '../Item/Item.jsx'

const ItemList = ({ products }) => {



    return (

        products.map(ele =>
            <Col key={ele.id} xs={3} >
                <Item ruta={ele.ruta} nombre={ele.nombre} editorial={ele.editorial} stock={ele.stock} image={ele.img} precio={ele.precio} initial={0} />
            </Col>
        )
    )
}
export default ItemList