import React, { Component } from 'react';
import { Card, DropdownButton, Dropdown } from 'react-bootstrap';
import { getPaymentMethods } from 'src/facades/Payment';
import './index.css';

export class PaymentMethods extends Component<{ methods: any[], selected: string, handleInputChange: Function }, {}> {

    state = {
        payment_methods: this.props.methods,
        payment_selected: this.props.selected,
        payment_name: "ชำระเงินปลายทาง"
    }

    UNSAFE_componentWillReceiveProps(nextProps: any) {
        this.setState({ payment_selected: nextProps.selected })
    }

    componentWillMount() {
        if (this.state.payment_methods.length <= 0) this.getPaymentMethods()
    }

    render() {
        return (
            <Card className="mb-2 pb-3 PaymentMethods-Card">
                <Card.Body className="pl-0 pr-0 p-0 pb-0">
                    <div className="pl-3 header text-center">เลือกวิธีชำระสินค้า</div>
                    <div className="PaymentMethods-dropdown-button-wrapper">
                        <DropdownButton id="dropdown-button" className="dropdown-button" title={this.state.payment_name}>
                            {this.state.payment_methods.map((method: any, index) =>
                                <Dropdown.Item key={`payment-${method.type}-${index}`} eventKey={method.type} onSelect={(e: any) => this.handleInputChange({ target: { name: "payment_selected", value: method.type } }, method.name)}>
                                    {method.name}
                                </Dropdown.Item>
                            )}
                        </DropdownButton>
                    </div>
                </Card.Body>
            </Card>
        )
    }

    async getPaymentMethods() {
        const methods = await getPaymentMethods()
        this.setState({ payment_methods: methods })
    }

    handleInputChange(e: any, payment_name?: string) {
        this.props.handleInputChange(e)
        this.setState({ payment_name })
    }

}