import React, { Component } from 'react';
import "./PromotionModalV1.css"
import { Card, Button } from 'react-bootstrap';

export class PromotionPageV1 extends Component<{}>{

    state = { mobile: "" }

    render() {
        return (
            <div className="container h-100">
                <div className="col-12 h-100" style={{ paddingTop: "0rem" }}>
                    <Card className="text-center">
                        <Card.Body>
                            <Button variant="primary" href={"/"} style={{ fontSize: "2rem" }}>
                                รับสิทธ์ซื้อเลย
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        )
    }

    onMobileChange(e: any) {
        if (e.target.value.length <= 10) { this.setState({ mobile: e.target.value }) }
    }
}