import React, { Component } from 'react';
import { Navbar, Col } from 'react-bootstrap';
import { numberWithCommas } from 'src/middleware/tools';
import { Cart } from 'src/redux/Cart/types';
import './index.css';

export class NavigationBarCartBottom extends Component<{ total_price: number, myCart: Cart }, {}> {

    componentDidMount() { }

    render() {
        return (
            <div className="NavigationBarCart-Bottom">
                <Navbar fixed="bottom">
                    <div className="container btn-wrapper" onClick={() => this.props.myCart.products.length <= 0 ? alert("ไม่พบสินค้า") : window.location.href = "/payment"} style={{ backgroundColor: "#F7941F", borderRadius: "8px" }}>

                        <Col lg="6" md="6" sm="6" xs="6" className="text-center pr-0 pl-0">
                            <div style={{ backgroundColor: "#F7941F" }}>
                                ยืนยันการสั่งซื้อ
                            </div>
                        </Col>
                        <Col lg="6" md="6" sm="6" xs="6" className="pl-0 pr-0 bg-black">
                            <div className="w-100 text-center font-weight-bold">฿ {numberWithCommas(this.props.total_price)}</div>
                        </Col>

                    </div>
                </Navbar>
            </div>
        )
    }
}