import React, { Component } from 'react';
import { Card } from 'react-bootstrap'
import './index.css'
import { ProductInCart } from 'src/redux/Cart/types';
import { userCartProps, redux } from 'src/redux/definition';
import { connect } from 'react-redux';
import { numberWithCommas } from 'src/middleware/tools';
import { image_not_found } from 'src/definitions/Error';

class ProductCardInBill extends Component<userCartProps & { product_detail: ProductInCart }, {}> {

    componentDidMount() { }

    render() {
        var product = this.props.product_detail
        if (!this.props.product_detail || !this.props.product_detail.detail) return (<div />)
        return (
            <div className="ProductCardInBill">
                <Card className="text-left" onClick={(e: any) => this.linkToDetail(e)}>
                    <Card.Body className="">
                        <div className="row">
                            <div className="col-4 image-wrapper">
                                <img
                                    className={"mb-2"}
                                    onError={(e: any) => { e.target.onerror = null; e.target.src = image_not_found }} 
                                    src={typeof (this.props.product_detail.detail.image_url) !== "string" ? this.props.product_detail.detail.image_url[0] : this.props.product_detail.detail.image_url + ""}
                                    alt={typeof (this.props.product_detail.detail.image_url) !== "string" ? this.props.product_detail.detail.image_url[0] : this.props.product_detail.detail.image_url + ""}
                                />
                            </div>
                            <div className="col-8">
                                <div className="">
                                    <div className="mb-0 App-product-title d-inline text-truncate">{this.props.product_detail.detail.title}</div>
                                </div>
                                <div className="mb-0 App-product-common-title text-truncate">{`ขนาดบรรจุ : ${product.detail.volume.volume} ${product.detail.volume.unit}`}</div>
                                <div className="mb-ๅ App-product-common-title text-truncate">{`จำนวนน : x ${this.props.product_detail.quantity} ชิ้น`}</div>
                                <div className="mb-0 App-product-price text-truncate">{`฿ ${numberWithCommas(this.props.product_detail.quantity * product.price)} (ยังไม่รวมค่าจัดส่ง)`}</div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }

    linkToDetail(e: Event) {
        e.preventDefault()
        window.location.href = `/product_detail?pid=${this.props.product_detail.detail.id}`
    }

}

export default connect(
    redux.userCartState,
    redux.userCartDispatch
)(ProductCardInBill);