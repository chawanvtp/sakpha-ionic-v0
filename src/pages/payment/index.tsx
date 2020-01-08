import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import NavigationBarTop from 'src/components/NavigationBars/Top';
import { ProductInCart } from 'src/redux/Cart/types';
import NavigationBarPaymentBottom from 'src/components/NavigationBars/Bottom/payment';
import { getPaymentMethods, getDeliveryMethods, sendOrderConfirm } from 'src/facades/Payment';
import { ProgressContainer } from 'src/components/Progress';
import { PaymentMethods } from './payment';
import './index.css';
import { userCartProps, redux } from 'src/redux/definition';
import Bill from 'src/components/Payment/bill';
import DeliveryMethods from 'src/components/Payment/delivery-methods';
import ProfileInPayment from 'src/components/Auth/Profile/payment';

class PaymentPage extends Component<userCartProps & RouteComponentProps, {}> {

  state = {
    total_price: this.getTotalPrice(this.props.product_in_cart.products),
    payment_methods: [],
    payment_selected: "cash_on_delivery",
    delivery_methods: [],
    delivery_selected: "delivery",
    steps: ["สั่งซื้อ", "ตรวจสอบ", "สำเร็จ"],
    current_step: 1,
    prev_step: 1,
    profile_edit: false
  }

  render() {
    this.userLogin = this.userLogin.bind(this)
    this.confirmFunc = this.confirmFunc.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    return (
      <div className="Payment-Page">
        <NavigationBarTop user={this.props.user} product_count={this.props.product_in_cart.products.length} />

        <div className="container Payment-Page-wrapper pl-0 pr-0">

          <ProgressContainer steps={this.state.steps} now={this.state.current_step} onElementClicked={this.handleInputChange} />

          {(this.props.user.id) ?
            <div>
              <NavigationBarPaymentBottom user={this.props.user} product_in_cart={this.props.product_in_cart} total_price={(this.state.total_price)} current_step={this.state.current_step} confirmFunc={this.confirmFunc} />
            </div>
            : ""
          }

          {this.state.current_step === 1 ?
            <div>
              {this.props.user.id ?
                <DeliveryMethods user={this.props.user} product_in_cart={this.props.product_in_cart} delivery_selected={this.state.delivery_selected} handleInputChange={this.handleInputChange} disable_edit={true} />
                :
                <ProfileInPayment user={this.props.user} product_in_cart={this.props.product_in_cart} />
              }
            </div>
            :
            <div>
              {this.props.user.id ?
                <DeliveryMethods user={this.props.user} product_in_cart={this.props.product_in_cart} delivery_selected={this.state.delivery_selected} handleInputChange={this.handleInputChange} disable_edit={this.state.profile_edit} /> : ""
              }
              <Bill user={this.props.user} product_in_cart={this.props.product_in_cart} />
              <PaymentMethods methods={this.state.payment_methods} selected={this.state.payment_selected} handleInputChange={this.handleInputChange} />

            </div>
          }


        </div>
      </div>
    )
  }

  handleInputChange(e: any) {
    if (!e || (e.target.name === "current_step" && !this.props.user.id) || (e.target.value > this.state.current_step)) return
    this.setState(e.target.name === "current_step" ? { [e.target.name]: e.target.value, profile_edit: false } : { [e.target.name]: e.target.value })
    console.error(e.target.name + " : " + e.target.value)
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

  async getPaymentMethods() {
    const methods = await getPaymentMethods()
    this.setState({ payment_methods: methods })
  }

  async getDeliveryyMethods() {
    const methods = await getDeliveryMethods(this.props.user.id)
    this.setState({ delivery_methods: methods })
  }

  async confirmFunc() {
    if (!this.props.user.id) { return alert("กรุณาใส่ เบอร์โทรศัพท์ หรือ เข้าสู่ระบบ !") }
    if (!this.props.user.profile || !this.props.user.profile.address || this.props.user.profile.address.length <= 0) { return alert("กรุณา ระบุที่อยู่การจัดส่ง") }
    if (this.state.current_step < this.state.steps.length - 1) {
      this.setState({ current_step: this.state.current_step + 1 })
    } else {
      var isSuccess = await sendOrderConfirm(this.props.product_in_cart, this.state.delivery_selected, this.state.payment_selected, "", this.state.total_price, this.props.user)
      if (!isSuccess) {
        this.props.userLogout()
        this.props.clearProductInCart()
        return alert("กรุณาลองใหม่อีกครั้งค่ะ !")
      }
      this.props.clearProductInCart()
    }
  }

}

export default connect(
  redux.userCartState,
  redux.userCartDispatch
)(PaymentPage);