import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import { forgotPasswordSend } from 'src/facades/Auth/UserAccountFacade';
import { RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { validateInput, getParam } from 'src/middleware/tools';
import { userCartProps, redux } from 'src/redux/definition';

class ForgotPasswordPage extends Component<userCartProps & RouteComponentProps, {}> {

  state = {
    username: getParam("mobile") + "",
    password: "",
    username_valid: (getParam("mobile") + "").length >= 10 ? true : false,
    password_valid: false
  }

  componentDidMount() { }

  render() {
    this.userLogin = this.userLogin.bind(this)
    return (
      <div className="h-100 ForgotPassword-Page text-center">
        <div className="container mb-4">
          <h4 className="mb-4">Forgot Password</h4>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faUserCircle} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="username"
              placeholder="เบอร์โทรศัพท์"
              aria-label="เบอร์โทรศัพท์"
              type="number"
              value={this.state.username}
              aria-describedby="basic-addon1"
              onChange={(e: any) => this.onInputChange(e)}
            />
          </InputGroup>

          {(!this.state.username_valid || !this.state.password_valid) && (this.state.username.length > 0 && this.state.password.length > 0) ?
            <div style={{ color: "red", marginTop: "0.5rem" }}>เบอร์โทรศัพท์ ไม่ถูกต้อง</div>
            : ""
          }

          <Button
            variant="success"
            className="login-submit-btn"
            onClick={(e: any) => this.onForgotPasswordSubmit()}
          >ยืนยัน
          </Button>

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

  async onForgotPasswordSubmit() {
    if (!this.state.username_valid) { return alert("เบอร์โทรศัพท์ ไม่ถูกต้อง") }
    var isSuccess = await forgotPasswordSend(this.state.username)
    if (isSuccess.error) {
      alert(isSuccess.error)
    } else {
      window.location.href = `resetPassword?username=${this.state.username}&token=${isSuccess.id}`
    }
  }

  validateInput(name: string, value: string) {
    this.setState({
      [name + "_valid"]: validateInput(name, value)
    })
  }

  onInputChange = (event: any) => {
    if (event.target.name === "username" && event.target.value.length > 10) return
    this.setState({
      [event.target.name]: event.target.value
    });
    this.validateInput(event.target.name, event.target.value)
  }

}

export default connect(
  redux.rootState,
  redux.rootDispatch
)(ForgotPasswordPage);