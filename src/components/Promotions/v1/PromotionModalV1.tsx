import React, { Component } from 'react';
import { Modal, ButtonToolbar, InputGroup, Badge, Button, FormControl } from "react-bootstrap"
import "./PromotionModalV1.css"

export class PromotionModalV1 extends Component<{}>{

    state = {
        lgShow: true,
        setLgShow: true
    }

    render() {
        return (
            <ButtonToolbar>
                <Modal
                    size="xl"
                    show={this.state.lgShow}
                    onHide={() => this.setState({ lgShow: false })}
                    aria-labelledby="example-modal-sizes-title-lg"
                    dialogClassName="Landing-Modal"
                >
                    <Modal.Header closeButton={true} className="text-center">
                        <Modal.Title id="example-modal-sizes-title-lg" />          </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3 text-center">
                            <div className="w-100">
                                <h2>โปรโมชั่น</h2>
                                <h3>สินค้าราคาพิเศษ</h3>
                                <h1>50%</h1>
                                <h4>
                                    สมัครรับส่วนลด และ โปรโมชั่น
                                </h4>
                            </div>
                            <InputGroup.Prepend className="w-100 mb-3">
                                <FormControl
                                    aria-describedby="basic-addon1"
                                    className="text-center"
                                    onChange={(e: any) => console.error(e.target.value)}
                                />
                            </InputGroup.Prepend>
                            <div className="w-100 text-center">
                                <h4>
                                    <Badge variant="primary" className="w-80"> รับส่วนลด และ โปรโมชั่นทาง SMS </Badge>
                                </h4>
                            </div>
                            <div className="text-center w-100">
                                <Button variant="success">ยืนยัน</Button>
                            </div>
                        </InputGroup>
                    </Modal.Body>
                </Modal>
            </ButtonToolbar>
        )
    }
}