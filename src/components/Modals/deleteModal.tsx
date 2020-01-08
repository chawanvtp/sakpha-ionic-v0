import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import './index.css';

export class DeleteModal extends Component<{ isShow: boolean, toggleFunc: Function, handleFunc: Function, header?: string, body?: string }, {}>{

    render() {
        return (
            <Modal
                show={this.props.isShow}
                onHide={() => this.props.toggleFunc()}
                className="Modal-Delete"
                dialogClassName="custom-dialog"
            >
                <Modal.Header closeButton={true}>
                    <Modal.Title>{this.props.header ? this.props.header : ""}</Modal.Title>
                </Modal.Header>

                {this.props.body ?
                    <Modal.Body>
                        <p>{this.props.body}</p>
                    </Modal.Body>
                    : ""
                }

                <Modal.Footer>
                    <Button className="w-50" variant="secondary" onClick={() => this.props.toggleFunc()}>ยกเลิก</Button>
                    <Button className="w-50" variant="primary" onClick={() => this.props.handleFunc()}>ยืนยัน</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}