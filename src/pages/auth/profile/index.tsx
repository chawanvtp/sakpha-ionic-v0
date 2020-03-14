import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import ProfileCard from 'src/components/Auth/Profile';
import LoginCard from 'src/components/Auth/Login/card';
import AddressCard from 'src/components/Auth/Profile/address';
import CropCard from 'src/components/Auth/Profile/crop';
import NavigationBarTop from 'src/components/NavigationBars/Top';
import { userCartProps, redux } from 'src/redux/definition';

class ProfilePage extends Component<userCartProps & RouteComponentProps, {}> {

  state = {
    username: "",
    password: "",
    username_valid: false,
    password_valid: false
  }

  componentDidMount() { }

  render() {
    this.userLogin = this.userLogin.bind(this)
    return (
      <div className="h-100 Profile-Page text-center">
        <div className="container mb-4">
        <NavigationBarTop user={this.props.user} product_count={this.props.product_in_cart ? this.props.product_in_cart.products.length : 0} />

          {this.props.user.id ?
            <div style={{ color: "black" }}>
              <ProfileCard user={this.props.user} />
              <AddressCard user={this.props.user} />
              <CropCard user={this.props.user} />
            </div>
            :
            <div>
              <h4 className="mb-4 font-weight-bold">เข้าสู่ระบบ</h4>
              <LoginCard user={this.props.user} bgColor={"transparent"} />
            </div>
          }

        </div>
      </div>
    )
  }

  async userLogin() {
    if (!this.state.username_valid || !this.state.password_valid) { return alert("เบอร์โทรศัพท์ หรือ รหัสผ่าน ไม่ถูกต้อง") }
    var isSuccess = await this.props.userStartLogin(this.state.username, this.state.password)

    if (isSuccess !== undefined) {
      alert(isSuccess)
    } else {
      this.props.history.push({
        pathname: 'home',
        state: this.props.location.state
      })
    }
  }

}

export default connect(
  redux.userCartState,
  redux.userCartDispatch
)(ProfilePage);