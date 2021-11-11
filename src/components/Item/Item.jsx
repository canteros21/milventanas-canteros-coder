import  { React } from 'react'
import { Card, Image } from 'react-bootstrap'
import ItemCount from '../ItemCount/ItemCount.jsx'


import './Item.css';

const Item = ({ nombre, stock, editorial, image, precio }) => {


    return (
        <Card className="text-center">
            <Card.Header>{editorial}</Card.Header>
            <Card.Body>
                <Card.Title>{nombre}</Card.Title>
                <h4>${precio}</h4>
                <Image src={image} rounded fluid />
            </Card.Body>
            <Card.Footer>
                <ItemCount nombre={nombre} stock={stock} initial={0} />
            </Card.Footer>
        </Card>

    )
}

export default Item
