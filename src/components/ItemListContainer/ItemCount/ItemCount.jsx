import React, { useState } from 'react'
import { InputGroup, Button, Card } from 'react-bootstrap'


import './ItemCount.css';

const ItemCount = ({ nombre, stock, editorial, initial, onAdd }) => {

    const [count, setCount] = useState(initial)

    const sumarCantidad = () => {
        if (count <= stock) {
            setCount(count + 1)
        }

    }

    const restarCantidad = () => {
        if (count >= 1) {
            setCount(count - 1)
        }

    }

    onAdd = () => {

        if (count == 0) {
            alert("No agregaste ningún ejemplar o no tenemos habilitado stock del mismo");
        } else {
            console.log(`Agregaste ${count} ejemplares de: '${nombre}' al Carrito`);
        }
    }

    return (
        <Card className="text-center">
            <Card.Header>{editorial}</Card.Header>
            <Card.Body>
                <Card.Title>{nombre}</Card.Title>
            </Card.Body>
            <Card.Footer>
                <div className="counter-wrapper d-grid">
                    <InputGroup className="counter-group mb-3">
                        <Button variant="outline-secondary" className="counter-group-button" onClick={restarCantidad} disabled={count <= initial}>-</Button>
                        <Button variant="outline-secondary" className="counter-group-button counter" disabled>{count}</Button>
                        <Button variant="outline-secondary" className="counter-group-button" onClick={sumarCantidad} disabled={count >= stock}>+</Button>
                    </InputGroup>
                    <Button variant="danger" size="lg" onClick={onAdd} disabled={count == 0}>Agregar al carrito</Button>
                </div>
            </Card.Footer>
        </Card>

    )
}

export default ItemCount
