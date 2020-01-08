import React, { Component } from 'react';
import { ButtonToolbar, Button, ButtonGroup } from "react-bootstrap"
import { ProductDetail } from 'src/redux/Product/Detail/types';
import { ProductCatalog } from 'src/redux/Product/Catalog/types';
import './index.css'
import { PurchaseSelectionConfirmModal } from './Confirm';
import { SellerFacade } from 'src/facades/Seller';
import { ProductPurchaseSeller, Seller } from 'src/models/SellerModel';
import { connect } from 'react-redux';
import { numberWithCommas } from 'src/middleware/tools';
import { Location } from 'src/middleware/location';
import { redux, userCartProps } from 'src/redux/definition';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class StoreList extends Component<userCartProps & { product_detail: ProductCatalog | ProductDetail, quantity: number, purchaseFunc: Function, updateStageFunc: Function }, {}>{

    state = {
        confirm_modal: false,
        isSelected: false,
        shopsList: "",
        product_id: this.props.product_detail.id + "",
        stock_id: "",
        seller_id: "",
        quantity: this.props.quantity,
        detail: this.props.product_detail,
        seller: Object as unknown as Seller,
        price: ""
    }

    UNSAFE_componentWillReceiveProps(nextProps: any) {
        this.createShops(this.props.product_detail.id)
    }

    render() {
        this.createShops = this.createShops.bind(this)
        if (!this.state.shopsList) this.createShops(this.props.product_detail.id)
        return (
            <div className="StoreList">
                <ButtonToolbar>
                    {this.state.shopsList}
                </ButtonToolbar>
                <div className="row buy-btn-wrapper">
                    <Button
                        disabled={!this.state.isSelected}
                        className={(!this.state.isSelected ? "buy-btn w-100" : "buy-btn-selected w-100")}
                        onClick={(e: any) => this.buyBtnClicked()}
                    >
                        ซื้อ
                    </Button>
                    <Button className="cancel-btn" onClick={() => this.props.updateStageFunc(-1)}>ยกเลิก</Button>
                </div>
            </div>
        )
    }

    async createShops(product_id: String) {
        var sellers = await this.getSeller(product_id);
        var currentLocation: any = await Location.getCurrent();
        var shops = []
        if (!sellers) return
        shops.push(
            (sellers).map(
                (shop: ProductPurchaseSeller, index: number) => (
                    < div className="w-100 mb-2 store-btn-wrapper" key={`${shop.id}-${index}`}>
                        <ButtonGroup>

                            <Button className={this.state.seller_id === shop.seller.id ? "detail-btn selected text-dark" : "detail-btn text-dark"} onClick={(e: any) => this.selectBtnClicked(shop.id, shop.seller.id, shop.price, shop.seller, e)}>
                                <div className="row">
                                    <div className="col-2">
                                        {this.state.seller_id === shop.seller.id ?
                                            <FontAwesomeIcon icon={faCheckCircle} className="icon-check" />
                                            : ""
                                        }
                                    </div>
                                    <div className="col-10 pl-0">
                                        <div className="col-8 pl-0 pr-0 float-left text-left App-seller-name">{`${shop.seller.name}`}</div>
                                        <div className="col-4 pl-0 pr-0 float-right text-right font-weight-bold">
                                            <div className="col-6 float-right text-right pl-0 pr-0 total-price">
                                                {` ${shop.price}฿`}
                                            </div>
                                        </div>
                                        <div className="w-100 float-right">
                                            <div className="col-6 float-left text-left pl-0 pr-0 App-seller-distance" style={{ fontWeight: 100, fontSize: "0.9rem" }}>
                                                {currentLocation && shop.seller.location && (shop.seller.location.length >= 2) ?
                                                    `${Location.distance(currentLocation.coords.latitude, currentLocation.coords.longitude, shop.seller.location[0], shop.seller.location[1])}`
                                                    : "x กม."
                                                }
                                            </div>
                                            <div className="col-6 float-right text-right pl-0 pr-0">
                                                <div className="d-inline-block">
                                                    <s className="mr-1 text-truncate">{`ค่าส่งเริ่มต้น: ฿${numberWithCommas(35)} `}</s> ฟรี
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Button>

                        </ButtonGroup>
                        <PurchaseSelectionConfirmModal seller={shop} product_detail={this.props.product_detail} quantity={this.props.quantity} />
                    </div >
                )
            ))
        this.setState({ shopsList: shops })
    }

    async getSeller(product_id: String) {
        var sellers = await SellerFacade.getSellerByProductID(product_id)
        return sellers
    }

    selectBtnClicked(stock_id: String, shop_id: String, price: number, seller: Seller, btn?: any) {
        this.setState({
            product_id: this.props.product_detail.id + "",
            stock_id: stock_id + "",
            seller_id: shop_id + "",
            quantity: this.props.quantity,
            detail: this.props.product_detail,
            seller: seller,
            price: price,
            isSelected: true
        })
        this.createShops(this.props.product_detail.id)
    }

    buyBtnClicked() {
        this.props.purchaseFunc(this.state.stock_id, this.state.seller_id, this.state.price, this.state.seller)
    }

    modalToggle(shop_id: String) {
        var modal = document.getElementById(`${shop_id}`)
        if (!modal) return
        modal.style.display === "block" ?
            modal.style.display = "none"
            :
            modal.style.display = "block"
    }

}

export default connect(
    redux.userCartState,
    redux.userCartDispatch
)(StoreList);