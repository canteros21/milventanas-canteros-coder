import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ItemCount from './ItemCount/ItemCount.jsx'

import './ItemListContainer.css';


const ItemListContainer = ({ greeting }) => {

    return (
        <div className='item-list'>
            <Container>
                <h2>{greeting}</h2>
                <Row>
                    <Col xs={3}>
                        <ItemCount key={0} nombre={"La mano del pintor"} editorial={"Editorial Sigilo"} stock={14} initial={0}  />
                    </Col>
                    <Col xs={3}>
                        <ItemCount key={1} nombre={"Intensa"} editorial={"El Hotel de las Ideas"} stock={23} initial={0}  />
                    </Col>
                </Row>
            </Container>


        </div>
    )
}
export default ItemListContainer