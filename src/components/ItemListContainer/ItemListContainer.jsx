import React from 'react'
import { Container } from 'react-bootstrap'

import './ItemListContainer.css';


const ItemListContainer = ({ greeting }) => {

    return (
        <div className='item-list'>
            <Container>
                <h2>{greeting}</h2>
            </Container>
        </div>
    )
}
export default ItemListContainer