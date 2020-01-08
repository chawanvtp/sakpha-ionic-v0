import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import { ProductInCart } from 'src/redux/Cart/types';
import { DeleteModal } from '../Modals/deleteModal'
import { numberWithCommas } from 'src/middleware/tools';
import { redux, userCartProps } from 'src/redux/definition';
import { InputGroup, Button, FormControl } from 'react-bootstrap';
import { image_not_found } from 'src/definitions/Error';

class ProductCardInCart extends Component<userCartProps & { product_detail: ProductInCart }, {}> {

    state = {
        delete_show: false,
        Quantity: this.props.product_detail.quantity
    }

    componentDidMount() { }

    render() {
        this.userLogin = this.userLogin.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.deleteBtnClicked = this.deleteBtnClicked.bind(this)

        return (!this.props.product_detail) ? (<div />) : (
            <div className="mb-4 product-card cart">
                <div className="row">
                    <div className="col-4 pr-0">
                        <img
                            onClick={(e: any) => this.linkToDetail(e)}
                            className="image"
                            onError={(e: any)=>{e.target.onerror = null; e.target.src=image_not_found}}
                            src={typeof (this.props.product_detail.detail.image_url) !== "string" ? this.props.product_detail.detail.image_url[0] : this.props.product_detail.detail.image_url + ""}
                            alt={typeof (this.props.product_detail.detail.image_url) !== "string" ? this.props.product_detail.detail.image_url[0] : this.props.product_detail.detail.image_url + ""}
                        />
                    </div>
                    <div className="col-8 pl-0">
                        <div className="col-12 App-product-title">
                            {this.props.product_detail.detail.title}
                        </div>
                        <div className="col-12">
                            {`${this.props.product_detail.detail.volume.volume} ${this.props.product_detail.detail.volume.unit}`}
                        </div>
                        <div className="col-12 App-product-price mb-3">
                            {`฿ ${numberWithCommas(this.props.product_detail.quantity * Number(this.props.product_detail.price))} ( ยังไม่รวมค่าจัดส่ง )`}
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-8">
                                    <InputGroup className="">
                                        <InputGroup.Prepend>
                                            <Button variant="outline-dark" className="rounded-left" value="1" onClick={(e: any) => this.quantityHandle("-", e)}>  -  </Button>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            aria-describedby="basic-addon1"
                                            className="text-center input-field"
                                            onKeyPress={(e: any) => e.charCode}
                                            type={"number"}
                                            min={1}
                                            onFocus={(e: any) => e.target.value = ''}
                                            onBlur={(e: any) => e.target.value = this.state.Quantity + ""}
                                            value={this.state.Quantity + ""}
                                            onChange={(e: any) => this.quantityHandle("type", e)}
                                        />
                                        <InputGroup.Prepend>
                                            <Button variant="outline-dark" className="rounded-right" value="1" onClick={(e: any) => this.quantityHandle("+", e)} > + </Button>
                                        </InputGroup.Prepend>
                                    </InputGroup>
                                </div>
                                <div className="col-4">
                                    <div className="font-weight-bold" onClick={() => this.deleteBtnClicked()} style={{ transform: "translate(20%, 30%)", color: "#495057"}}>ลบ</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DeleteModal isShow={this.state.delete_show} toggleFunc={this.deleteBtnClicked} handleFunc={this.handleDelete} header={"ต้องการลบสินค้าหรือไม่ ?"} />
            </div>
        )
    }

    async userLogin(mobile: string, password: string) {
        var isSuccess = await this.props.userStartLogin(mobile, password)
        if (isSuccess !== undefined) { alert(isSuccess) }
    }

    quantityHandle(operator: string, e?: any) {
        switch (operator) {
            case "+": {
                this.setState({ Quantity: Number(this.state.Quantity) + Number(e.target.value) })
                this.updateQuantity(Number(this.state.Quantity) + Number(e.target.value))
                break;
            }
            case "-": {
                if (this.state.Quantity <= 1) return
                this.setState({ Quantity: Number(this.state.Quantity) - Number(e.target.value) })
                this.updateQuantity(Number(this.state.Quantity) - Number(e.target.value))
                break;
            }
            default: {
                if (e.target.value > 0) {
                    this.setState({ Quantity: Number(e.target.value) })
                    this.updateQuantity(Number(e.target.value))
                } else {
                    this.setState({ Quantity: Number(1) })
                    this.updateQuantity(Number(1))
                }
                break;
            }
        }
    }

    updateQuantity(new_quantity: number) {
        this.props.addProductInCart({
            product_id: this.props.product_detail.product_id + "",
            stock_id: this.props.product_detail.stock_id + "",
            seller_id: this.props.product_detail.seller_id + "",
            quantity: Number(new_quantity) - Number(this.state.Quantity),
            detail: this.props.product_detail.detail,
            seller: this.props.product_detail.seller,
            price: this.props.product_detail.price
        })
        this.forceUpdate()
    }

    deleteBtnClicked() {
        this.setState({ delete_show: !this.state.delete_show })
    }

    handleDelete() {
        this.deleteBtnClicked()
        this.props.removeProductInCart(this.props.product_detail)
    }

    linkToDetail(e: Event) {
        e.preventDefault()
        window.location.href = `/product_detail?pid=${this.props.product_detail.product_id}`
    }

}

export default connect(
    redux.userCartState,
    redux.userCartDispatch
)(ProductCardInCart);