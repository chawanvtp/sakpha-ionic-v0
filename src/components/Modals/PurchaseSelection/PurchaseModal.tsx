import React, { Component } from 'react';
import { Modal, ButtonToolbar, Button, InputGroup, FormControl, Dropdown } from "react-bootstrap"
import { ProductDetail } from 'src/redux/Product/Detail/types';
import { ProductCatalog } from 'src/redux/Product/Catalog/types';
import StoreList from './Store';
import './index.css'
import { connect } from 'react-redux';
import { userCartProps, redux } from 'src/redux/definition';
import { Seller } from 'src/models/SellerModel';
import { numberWithCommas } from 'src/middleware/tools';
import { image_not_found } from 'src/definitions/Error';

class PurchaseModal extends Component<userCartProps & { toggleFunc: Function, display: boolean, product_detail: ProductCatalog | ProductDetail }, {}>{

    state = {
        lgShow: this.props.display,
        setLgShow: true,
        Quantity: 1,
        volume: "1000",
        current_stage: 0
    }

    UNSAFE_componentWillReceiveProps(nextProps: any) {
        this.setState({ lgShow: nextProps.display })
    }

    render() {
        this.quantityHandle = this.quantityHandle.bind(this)
        this.buyBtnClicked = this.buyBtnClicked.bind(this)
        this.updateStage = this.updateStage.bind(this)
        return (
            <ButtonToolbar className="">
                <Modal
                    size="lg"
                    show={this.state.lgShow}
                    onHide={() => this.props.toggleFunc()}
                    aria-labelledby="example-modal-sizes-title-lg"
                    dialogClassName={this.state.current_stage < 1 ? "dialog" : "dialog store"}
                    className="PurchaseModal"
                >
                    <Modal.Header closeButton={true}>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            <div className="header-wrapper">
                                {this.state.current_stage < 1 ?
                                    "เลือกสินค้า" : "เลือกร้านค้า"
                                }
                            </div>
                        </Modal.Title>
                    </Modal.Header>

                    {this.state.current_stage < 1 ?
                        <Modal.Body className="product">
                            <InputGroup className="mb-3 text-center">
                                <div className="row mb-2 header-wrapper">
                                    <div className="col-4 image-wrapper">
                                        {this.props.product_detail.image_url ?
                                            <img
                                                onError={(e: any) => { e.target.onerror = null; e.target.src = image_not_found }}
                                                src={typeof (this.props.product_detail.image_url) !== "string" ? this.props.product_detail.image_url[0] : this.props.product_detail.image_url + ""}
                                                className="w-100"
                                                alt={typeof (this.props.product_detail.image_url) !== "string" ? this.props.product_detail.image_url[0] : this.props.product_detail.image_url + ""}
                                            /> : ""
                                        }
                                    </div>
                                    <div className="col-8 text-left detail-wrapper">
                                        <div className="mb-0 App-product-price price">
                                            {`฿ ${this.props.product_detail.price ? `${numberWithCommas(this.props.product_detail.price.min)} - ${numberWithCommas(this.props.product_detail.price.max)}` : 0}`}
                                        </div>
                                        <div className="mb-1 App-product-common-title common-title text-truncate">
                                            {this.props.product_detail.title}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-100 mb-2">
                                    <h5>ขนาดบรรจุ</h5>
                                </div>
                                <InputGroup.Prepend className="w-100">
                                    <Dropdown className="h-50 w-100">
                                        <Dropdown.Toggle variant="outline-dark" id="dropdown-basic" className="input-size">
                                            {`${this.props.product_detail.volume.volume} ${this.props.product_detail.volume.unit}`} </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {
                                                [this.props.product_detail.volume].map((volume, index) => (
                                                    <Dropdown.Item key={`${index}-volume-${volume.volume}`} eventKey="250" onSelect={() => this.volumeBtnSelected(`${volume}`)} >
                                                        {`${volume.volume} ${volume.unit}`}
                                                    </Dropdown.Item>
                                                ))
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </InputGroup.Prepend>
                            </InputGroup>

                            <InputGroup className="mb-5">
                                <div className="w-100 text-center mb-2">
                                    <h5>จำนวน</h5>
                                </div>
                                <InputGroup.Prepend>
                                    <Button variant="outline-dark" value="1" onClick={(e: any) => this.quantityHandle("-", e)}>
                                        -
                                </Button>
                                </InputGroup.Prepend>
                                <FormControl
                                    aria-describedby="basic-addon1"
                                    className="text-center"
                                    onKeyPress={(e: any) => e.charCode}
                                    type={"number"}
                                    min={1}
                                    onFocus={(e: any) => e.target.value = ''}
                                    onBlur={(e: any) => e.target.value = this.state.Quantity + ""}
                                    value={this.state.Quantity + ""}
                                    onChange={(e: any) => this.quantityHandle("type", e)}
                                />
                                <InputGroup.Prepend>
                                    <Button variant="outline-dark" value="1" onClick={(e: any) => this.quantityHandle("+", e)}>
                                        +
                                </Button>
                                </InputGroup.Prepend>
                            </InputGroup>

                            <div className="row buy-btn-wrapper">
                                <Button className="w-100 confirm-btn" onClick={() => this.updateStage(1)}>ค้นหาร้านค้า</Button>
                                <Button className="cancel-btn" onClick={() => this.updateStage(-1)}>ยกเลิก</Button>
                            </div>
                        </Modal.Body>
                        :
                        <Modal.Body>
                            <InputGroup className="">
                                <StoreList user={this.props.user} product_in_cart={this.props.product_in_cart} product_detail={this.props.product_detail} quantity={this.state.Quantity} purchaseFunc={this.buyBtnClicked} updateStageFunc={this.updateStage} />
                            </InputGroup>
                        </Modal.Body>
                    }

                </Modal>
            </ButtonToolbar>
        )
    }

    updateStage(value: number) {
        if (this.state.current_stage <= 0 && value <= 0) {
            this.props.toggleFunc()
            return
        }
        this.setState({ current_stage: this.state.current_stage + value })
    }

    quantityHandle(operator: string, e?: any) {
        switch (operator) {
            case "+": {
                this.setState({ Quantity: Number(this.state.Quantity) + Number(e.target.value) })
                break;
            }
            case "-": {
                if (this.state.Quantity <= 1) return
                this.setState({ Quantity: Number(this.state.Quantity) - Number(e.target.value) })
                break;
            }
            default: {
                (e.target.value > 0) ?
                    this.setState({ Quantity: Number(e.target.value) })
                    :
                    this.setState({ Quantity: Number(1) })
                break;
            }
        }
    }

    volumeBtnSelected(volume: string) { this.setState({ volume }) }

    buyBtnClicked(stock_id: String, shop_id: String, price: number, seller: Seller) {
        this.modalToggle(shop_id)
        this.props.addProductInCart({
            product_id: this.props.product_detail.id + "",
            stock_id: stock_id + "",
            seller_id: shop_id + "",
            quantity: this.state.Quantity,
            detail: this.props.product_detail,
            seller: seller,
            price: price
        })
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

export default connect(
    redux.userCartState,
    redux.userCartDispatch
)(PurchaseModal);