import React from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const CartWidget = () => {
    return (
        <Button variant="outline-danger"><FontAwesomeIcon icon={faShoppingCart} /></Button>
    )
}

export default CartWidget
