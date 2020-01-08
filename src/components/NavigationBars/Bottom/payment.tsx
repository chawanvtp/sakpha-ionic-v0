import React, { Component } from 'react';
import { Navbar, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { redux, userCartProps } from 'src/redux/definition';
import { numberWithCommas } from 'src/middleware/tools';

class NavigationBarPaymentBottom extends Component<userCartProps & { total_price: number, current_step: number, confirmFunc?: Function }, {}> {

    componentDidMount() { }

    render() {
        return (
            <div className="NavigationBarPayment-Bottom">
                <Navbar fixed="bottom">
                    
                    {this.props.current_step === 1 ?
                        <div className="container btn-wrapper" onClick={() => this.props.product_in_cart.products.length <= 0 ? alert("ไม่พบสินค้า") : this.handlePaymentConfirm()} style={{ backgroundColor: "#F7941F", borderRadius: "8px" }}>
                            <Col lg="12" md="12" sm="12" xs="12" className="text-center pr-0 pl-0">
                                <div style={{ backgroundColor: "#F7941F" }}>
                                    ยืนยันที่อยู่จัดส่ง
                                </div>
                            </Col>
                        </div>
                        :
                        <div className="container btn-wrapper" onClick={() => this.props.product_in_cart.products.length <= 0 ? alert("ไม่พบสินค้า") : this.handlePaymentConfirm()} style={{ backgroundColor: "#F7941F", borderRadius: "8px" }}>
                            <Col lg="6" md="6" sm="6" xs="6" className="text-center pr-0 pl-0">
                                <div style={{ backgroundColor: "#F7941F" }}>
                                    ยืนยันการสั่งซื้อ
                                    </div>
                            </Col>
                            <Col lg="6" md="6" sm="6" xs="6" className="pl-0 pr-0 bg-black">
                                <div className="w-100 text-center font-weight-bold">฿ {numberWithCommas(this.props.total_price)}</div>
                            </Col>
                        </div>
                    }

                </Navbar>
            </div>
        )
    }

    handlePaymentConfirm() {
        this.props.confirmFunc ? this.props.confirmFunc() : console.error("failed")
    }
}

export default connect(
    redux.userCartState,
    redux.userCartDispatch
)(NavigationBarPaymentBottom);