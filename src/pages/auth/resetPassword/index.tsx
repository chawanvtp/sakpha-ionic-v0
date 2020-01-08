import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import { resetPasswordSend } from 'src/facades/Auth/UserAccountFacade';
import { RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { validateInput, getParam } from 'src/middleware/tools';
import { ResetPassword_STATUS } from 'src/definitions/Error';
import { userCartProps, redux } from 'src/redux/definition';

class ResetPasswordPage extends Component<userCartProps & RouteComponentProps, {}> {

  state = {
    token: getParam("token"),
    password: "",
    passwordConfirm: "",
    username: getParam("username"),
    password_valid: false,
    passwordConfirm_valid: false,
    username_valid: false
  }

  componentDidMount() { }

  render() {
    this.userLogin = this.userLogin.bind(this)
    return (
      <div className="h-100 ResetPassword-Page text-center">
        <div className="container mb-4">
          <h4 className="mb-4">Reset Password</h4>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faUnlockAlt} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="password"
              type="password"
              placeholder="รหัสผ่าน"
              aria-label="รหัสผ่าน"
              maxLength={10}
              aria-describedby="basic-addon1"
              onChange={(e: any) => this.onInputChange(e)}
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faUnlockAlt} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="passwordConfirm"
              type="password"
              placeholder="ยืนยันรหัสผ่าน"
              aria-label="ยืนยันรหัสผ่าน"
              aria-describedby="basic-addon1"
              onChange={(e: any) => this.onInputChange(e)}
            />
          </InputGroup>

          {(!this.state.password_valid || !this.state.passwordConfirm_valid) && (this.state.username !== null && this.state.password.length > 0) ?
            <div style={{ color: "red", marginTop: "0.5rem" }}>รหัสผ่าน ไม่ถูกต้อง หรือ ไม่เหมือนกัน</div>
            : ""
          }

          <Button
            variant="success"
            className="login-submit-btn"
            onClick={(e: any) => this.onResetPasswordSubmit()}
          >ยืนยัน
          </Button>

        </div>
      </div>
    )
  }

  async userLogin() {
    if (this.state.username === null || !this.state.password_valid) { return alert("เบอร์โทรศัพท์ หรือ รหัสผ่าน ไม่ถูกต้อง") }
    var isSuccess = await this.props.userStartLogin(this.state.username + "", this.state.password)

    if (isSuccess !== undefined) {
      this.props.history.push({
        pathname: '/',
        state: this.props.location.state
      })
    } else {
      alert(isSuccess)
    }
  }

  async onResetPasswordSubmit() {
    if (!this.state.password_valid || !this.state.passwordConfirm_valid) { return alert("รหัสผ่าน ไม่ถูกต้อง หรือ ไม่เหมือนกัน") }
    if (!this.state.token || !this.state.username) { return alert("ขออภัย ไม่สามารถเข้าถึงบัญชีนี้ได้") }
    var isSuccess = await resetPasswordSend(this.state.token, this.state.password)
    if (isSuccess.status !== ResetPassword_STATUS.SUCCESS) {
      alert("ขออภัย ไม่สามารถเข้าถึงบัญชีนี้ได้ กรุณาลองใหม่")
      return window.location.href = "/forgotPassword"
    } else {
      this.userLogin()
    }
  }

  validateInput(name: string, value: string) {
    (name === "password") ?
      this.setState({
        [name + "_valid"]: validateInput(name, value)
      })
      :
      this.validatePasswordConfirm(this.state.password, value)
  }

  validatePasswordConfirm(password: string, passwordConfirm: string) {
    this.setState({
      passwordConfirm_valid: password === passwordConfirm
    })
  }

  onInputChange = (event: any) => {
    this.setState({
      [event.target.name]: event.target.value
    });
    this.validateInput(event.target.name, event.target.value)
  }
}

export default connect(
  redux.userCartState,
  redux.userCartDispatch
)(ResetPasswordPage);