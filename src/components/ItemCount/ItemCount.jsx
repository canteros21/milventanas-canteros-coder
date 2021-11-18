import { React, useState } from 'react'
import { InputGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


import './ItemCount.css';

const ItemCount = ({ stock, initial, onAdd }) => {

    const [count, setCount] = useState(initial)
    const [changeButton, setChangeButton] = useState(false)
    const [hasAdded, sethasAdded] = useState(false)


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

    const agregar = () => {

        if (count === 0) {
            alert("No agregaste ningún ejemplar o no tenemos habilitado stock del mismo");
        } else {
            onAdd(count)
            setCount(count)
            setChangeButton(true)
            sethasAdded(true)
        }

    }

    return (
        <div className="counter-wrapper d-grid">
            <InputGroup className="counter-group mb-3">
                <Button variant="outline-secondary" className="counter-group-button" onClick={restarCantidad} disabled={count <= initial || hasAdded}>-</Button>
                <Button variant="outline-secondary" className={hasAdded? "counter-group-button counter-disabled" : "counter-group-button counter" } disabled>{count}</Button>
                <Button variant="outline-secondary" className="counter-group-button" onClick={sumarCantidad} disabled={count >= stock || hasAdded}>+</Button>
            </InputGroup>

            {
                changeButton ?

                    <Link to="/cart">
                        <Button variant="danger" size="lg" >Finalizar compra</Button>
                    </Link>
                    :
                    <Button variant="danger" size="lg" onClick={agregar} disabled={count === 0}>Agregar al carrito</Button>
            }
        </div>

    )
}

export default ItemCount
