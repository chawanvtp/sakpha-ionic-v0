import React, { Component } from 'react';
import { Card, Button } from "react-bootstrap"
import { ProductDetail } from 'src/redux/Product/Detail/types';
import { ProductCatalog } from 'src/redux/Product/Catalog/types';
import './index.css'
import { ProductPurchaseSeller } from 'src/models/SellerModel';
import { numberWithCommas } from 'src/middleware/tools';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { image_not_found } from 'src/definitions/Error';

export class PurchaseSelectionConfirmModal extends Component<{ seller: ProductPurchaseSeller, product_detail: ProductCatalog | ProductDetail, quantity: number }, {}>{

    state = {
        lgShow: true,
        setLgShow: true,
        Quantity: 1,
        volume: "1000"
    }

    render() {
        return (
            <div id={`${this.props.seller.seller.id}`} className="ConfirmModal-wrapper" style={{ display: "none" }} onClick={(e: any) => this.modalToggle(this.props.seller.seller.id)}>
                <div className="ConfirmModal" onClick={(e: any) => e.stopPropagation()}>
                    <Card>
                        <div className="container header-wrapper border-bottom-0" style={{ padding: "1rem 1rem" }}>
                            <div style={{ position: "absolute", color: "black", right: "4%", zIndex: 1000 }} onClick={() => this.modalToggle(this.props.seller.seller.id)}>X</div>
                            <div className="header">ตะกร้าสินค้า</div>
                            <FontAwesomeIcon icon={faShoppingCart} className="ml-2" />
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-5 image-wrapper">
                                    <img
                                        className="w-100"
                                        onError={(e: any) => { e.target.onerror = null; e.target.src = image_not_found }}
                                        src={typeof (this.props.product_detail.image_url) !== "string" ? this.props.product_detail.image_url[0] : this.props.product_detail.image_url + ""}
                                        alt={typeof (this.props.product_detail.image_url) !== "string" ? this.props.product_detail.image_url[0] : this.props.product_detail.image_url + ""}
                                    />
                                </div>
                                <div className="col-7 detail-wrapper">
                                    <div className="mb-0 mt-3 App-product-price price">
                                        {`฿ ${this.props.seller ? `${numberWithCommas(this.props.seller.price)}` : 0}`}
                                    </div>
                                    <div className="mb-1 App-product-common-title common-title text-truncate">
                                        {this.props.product_detail.title}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Card.Body>
                            <div className="col-12 pl-5">
                                <div className="row">
                                    <Card.Title className="mb-1 seller-name">{this.props.seller.seller.name}</Card.Title>
                                </div>
                                <div className="row">
                                    <div className="product-size float-left col-6 pl-0">{`ขนาดบรรจุ : `}</div>
                                    <div className="product-size float-right col-6 pl-0">{` ${this.props.product_detail.volume.volume} ${this.props.product_detail.volume.unit}`}</div>
                                </div>
                                <div className="row mb-3">
                                    <div className="product-quantity float-left col-6 pl-0">{`จำนวน : `}</div>
                                    <div className="product-quantity float-right col-6 pl-0">{` x${this.props.quantity} ชิ้น`}</div>
                                </div>
                                <div className="row mb-3">
                                    <div className="delivery-fee float-left col-6 pl-0">{`ค่าจัดส่ง : `}</div>
                                    <div className="delivery-fee float-right col-6 pl-0">{` ${35} ฿`}</div>
                                </div>
                                <div className="row">
                                    <Card.Text className="App-product-price mb-3 total-price">รวม {this.props.seller.price * this.props.quantity} บาท</Card.Text>
                                </div>
                            </div>
                            <div className="row">
                                <div className="text-center col-6 pr-1">
                                    <Button variant="outline-warning" className="continue-btn w-100" onClick={() => window.location.href = "/"}>ช้อปต่อ</Button>
                                </div>
                                <div className="text-center col-6 pl-1">
                                    <Button variant="warning" className="cart-btn w-100" onClick={() => window.location.href = "/cart"}>ชำระเงิน</Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        )
    }

    modalToggle(shop_id: String) {
        var modal = document.getElementById(`${shop_id}`)
        if (!modal) return
        modal.style.display === "block"
            ?
            modal.style.display = "none"
            :
            modal.style.display = "block"
    }
}