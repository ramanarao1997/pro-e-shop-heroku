import React from 'react'
import { Row, Col } from 'react-bootstrap'

const OrderSuccessScreen = () => {
    return (
        <Row>
            <Col>
                <h2 style={{ textAlign: "center", margin: "auto" }}>
                    Hooray! Your order was placed successfully
                </h2>
            </Col>
        </Row>
    )
}

export default OrderSuccessScreen
