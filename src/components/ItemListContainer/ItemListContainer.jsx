import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ItemList from '../ItemList/ItemList.jsx'

import './ItemListContainer.css';


const ItemListContainer = ({ greeting }) => {


    return (
        <div className='item-list'>
            <Container>
                <h2>{greeting}</h2>
                <Row>
                   <ItemList />
                </Row>
            </Container>


        </div>
    )
}
export default ItemListContainer