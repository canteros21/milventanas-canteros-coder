import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useCartContext } from '../../context/CartContext.jsx';

const CartWidget = () => {

    const { totalItems } = useCartContext()


    return (
        <Button className="cart-widget" variant="outline-danger"><FontAwesomeIcon icon={faShoppingCart} />
            {totalItems > 0 ? <span className="total-products-badge">{totalItems}</span> : false}
        </Button>
    )
}

export default CartWidget
