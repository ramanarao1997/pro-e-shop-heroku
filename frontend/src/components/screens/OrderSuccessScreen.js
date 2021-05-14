import React from 'react'
import { Row, Col } from 'react-bootstrap'

const OrderSuccessScreen = () => {
    return (
        <Row>
            <Col>
                <h3 style={{ textAlign: "center", margin: "auto" }}>
                    Hooray! Your order was placed successfully and a confirmation email was sent to you.
                </h3>
            </Col>
        </Row>
    )
}

export default OrderSuccessScreen
