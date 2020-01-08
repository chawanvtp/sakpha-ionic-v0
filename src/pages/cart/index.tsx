import React, { Component } from 'react';
import "./index.css";
import { connect } from 'react-redux';
import NavigationBarTop from 'src/components/NavigationBars/Top';
import StoreCardInCart from 'src/components/Cart/store-card';
import { ProductInCart } from 'src/redux/Cart/types';
import { Seller } from 'src/models/SellerModel';
import { NavigationBarCartBottom } from 'src/components/NavigationBars/Bottom/cart';
import { rootProps, redux } from 'src/redux/definition';
import { Button } from 'react-bootstrap';
import { image_not_found } from 'src/definitions/Error';

class CartPage extends Component<rootProps, {}> {

  state = {
    shopList: this.getShopList(this.props.product_in_cart.products),
    shopsWrapper: [],
    total_price: this.getTotalPrice(this.props.product_in_cart.products)
  }

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    this.setState({
      total_price: this.getTotalPrice(nextProps.product_in_cart.products),
      shopList: this.getShopList(this.props.product_in_cart.products)
    })
  }

  componentDidUpdate() { }

  render() {
    this.userLogin = this.userLogin.bind(this)
    var shops = this.createShops(this.state.shopList)
    return (
      <div className="Cart-Page">
        <NavigationBarTop user={this.props.user} product_count={this.props.product_in_cart.products.length} />
        <div className="text-center pt-3 pb-3 bg-white mb-2 font-weight-bold" style={{ marginTop: "-1rem", fontSize: "18px" }}>
          ตะกร้าสินค้าของฉัน
        </div>
        <div className="w-100">
          {shops[0].length > 0 ?
            <div className="pb-5">
              {shops}
              <NavigationBarCartBottom total_price={this.state.total_price} myCart={this.props.product_in_cart} />
            </div>
            :
            <div className="text-center">
              <div className="pt-1 rounded-circle empty-wrapper">
                <img className="mt-5 rounded mx-auto d-block w-75 icon-empty" src={require("../../images/cart_empty.png")} alt="emptyCart" onClick={() => window.location.href = "/"} onError={(e: any) => { e.target.onerror = null; e.target.src = image_not_found }} />
              </div>
              <div className="mb-3 mt-3 font-weight-bold">ไม่มีสินค้าในตะกร้า</div>
              <Button variant={"warning"} className="w-75" onClick={() => window.location.href = "/"}>เลือกสินค้า</Button>
            </div>
          }
        </div>
      </div>
    )
  }

  async userLogin(mobile: string, password: string) {
    var isSuccess = await this.props.userStartLogin(mobile, password)
    if (isSuccess !== undefined) { alert(isSuccess) }
  }

  getTotalPrice(products_in_cart: Array<ProductInCart>) {
    var total_price = 0
    products_in_cart.forEach(element => { total_price += (element.price * element.quantity) })
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

  createShops(shopList: Array<Seller>) {
    var shops = []
    shops.push(
      (shopList).map(
        (seller, index: number) => (
          <StoreCardInCart user={this.props.user} product_in_cart={this.props.product_in_cart} seller={seller} key={`StoreCardInCart-${seller.id}`} />
        )
      ))
    return shops
  }

}

export default connect(
  redux.rootState,
  redux.rootDispatch
)(CartPage);