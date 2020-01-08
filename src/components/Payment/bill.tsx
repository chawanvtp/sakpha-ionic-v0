import React, { Component } from "react";
import { userCartProps, redux } from "src/redux/definition";
import { Card } from "react-bootstrap";
import { numberWithCommas } from "src/middleware/tools";
import { connect } from "react-redux";
import { ProductInCart } from "src/redux/Cart/types";
import ProductCardInBill from "src/components/Products/Bill/product-card";
import StoreCardInBill from "src/components/Products/Bill/store-card";
import './index.css';
import { Seller } from "src/models/SellerModel";
import { getShippingFee } from "src/facades/Payment";

class Bill extends Component<userCartProps, {}> {

    state = {
        shopList: this.getShopList(this.props.product_in_cart.products),
        total_price: this.getTotalPrice(this.props.product_in_cart.products),
        products: this.getProducts(this.props.product_in_cart.products)
    }

    render() {
        var shops = this.createShops(this.state.shopList)
        this.getShippingFee(this.props.product_in_cart.products)
        return (
            <div>
                <Card className="mb-2 pb-3">
                    <Card.Body className="pl-0 pr-0 p-0 pb-0">
                        <div className="pl-3 text-center header">
                            สรุปรายการ
                        </div>
                        <div className="container">
                            {shops}
                        </div>
                        <div className="pr-5 pl-5">
                            <Card.Text className="text-right mb-0 top">ค่าบริการ: 0 บาท</Card.Text>
                            <Card.Text className="text-right mb-0">ค่าจัดส่ง: 0 บาท</Card.Text>
                            <Card.Text className="text-right">ส่วนลด: {numberWithCommas(this.state.total_price)} บาท</Card.Text>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }

    getTotalPrice(products_in_cart: Array<ProductInCart>) {
        var total_price = 0
        products_in_cart.forEach(element => {
            total_price += (element.price * element.quantity)
        })
        return total_price
    }

    getShopList(products_in_cart: Array<ProductInCart>) {
        var shopList = [""]
        var seller = [] as Array<Seller>
        products_in_cart.forEach(element => {
            if (shopList[0] === "") {
                shopList[0] = element.seller_id
                seller.push(element.seller)
            } else {
                if (!shopList.includes(element.seller_id)) {
                    shopList.push(element.seller_id)
                    seller.push(element.seller)
                }
            }
        });
        return seller
    }

    getProducts(products_in_cart: Array<ProductInCart>) {
        var products = []
        products.push(
            products_in_cart.map(
                (element, index: number) => (
                    <ProductCardInBill user={this.props.user} product_in_cart={this.props.product_in_cart} product_detail={element} key={`payment-${index}-${element.product_id}-${element.stock_id}`} />
                ))
        )
        return products
    }

    async getShippingFee(products_in_cart: Array<ProductInCart>) {
        var items = []
        items.push(
            products_in_cart.map(
                (element, index: number) => (
                    { id: element.stock_id, quantity: element.quantity }
                ))
        )
        console.error("items: ", items)
        var shipping_fee = await getShippingFee(items[0])
        console.error("shipping_fee: ", shipping_fee)
    }

    createShops(shopList: Array<Seller>) {
        var shops = []
        shops.push(
            (shopList).map(
                (seller, index: number) => (
                    <StoreCardInBill user={this.props.user} product_in_cart={this.props.product_in_cart} seller={seller} key={`StoreCardInCart-${seller.id}`} />
                )
            ))
        return shops
    }
}

export default connect(
    redux.userCartState,
    redux.userCartDispatch
)(Bill)