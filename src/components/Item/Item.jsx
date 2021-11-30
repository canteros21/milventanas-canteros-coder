import { React } from 'react'
import { Button, Card, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser';

import './Item.css';

const Item = ({ eleId, ruta, nombre, editorial, image, precio }) => {


    return (
        <Card className="text-center">
            <Card.Header>{editorial}</Card.Header>
            <Card.Body>
                <Card.Title>{ReactHtmlParser(nombre)}</Card.Title>
                <h4>${precio}</h4>
                <Image src={image} rounded fluid />
            </Card.Body>
            <Card.Footer>
                <Link to={`/producto/${eleId}`}>
                    <Button variant="danger">Ver detalle</Button>
                </Link>
            </Card.Footer>
        </Card>
    )
}

export default Item
