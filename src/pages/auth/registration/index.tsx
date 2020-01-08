import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import { requestOtp } from 'src/facades/Auth/UserAccountFacade';
import { RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { validateInput } from 'src/middleware/tools';
import { userCartProps, redux } from 'src/redux/definition';

class RegistrationPage extends Component<userCartProps & RouteComponentProps, {}> {

  state = {
    username: "",
    password: "",
    disabled_username: false,
    username_valid: false,
    password_valid: false,
    ref: ""
  }

  componentDidMount() { }

  render() {
    this.userLogin = this.userLogin.bind(this)
    return (
      <div className="h-100 Registration-Page text-center">
        <div className="container mb-4">
          <h4 className="mb-4">สมัครสมาชิก</h4>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faUserCircle} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="username"
              placeholder={"เบอร์โทรศัพท์"}
              aria-label="เบอร์โทรศัพท์"
              type="number"
              disabled={this.state.disabled_username}
              aria-describedby="basic-addon1"
              onChange={(e: any) => this.onInputChange(e)}
              value={this.state.username}
            />
          </InputGroup>

          {this.state.disabled_username ?
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faUnlockAlt} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="password"
                type="password"
                placeholder={this.state.ref ? `เลขที่อ้างอิง: ${this.state.ref}` : "รหัส OTP"}
                aria-label="รหัสผ่าน"
                aria-describedby="basic-addon1"
                onChange={(e: any) => this.onInputChange(e)}
              />
            </InputGroup>
            :
            ""
          }

          {(!this.state.username_valid) && (this.state.username.length > 0) ?
            <div style={{ color: "red", marginTop: "0.5rem" }}>เบอร์โทรศัพท์ หรือ รหัสผ่าน ไม่ถูกต้อง</div>
            : ""
          }

          {this.state.disabled_username ?
            <Button variant="success" className="login-submit-btn" onClick={(e: any) => this.userLogin()}>ยืนยัน</Button>
            :
            <Button variant="secondary" className="login-submit-btn" onClick={(e: any) => this.onRegistrationSubmit()}>ขอรหัส OTP</Button>
          }

        </div>
      </div>
    )
  }

  async userLogin() {
    if (!this.state.username_valid) { return alert("เบอร์โทรศัพท์ ไม่ถูกต้อง") }
    var isSuccess = await this.props.userStartLogin(this.state.username, this.state.password, "OTP", this.state.ref)

    if (isSuccess !== undefined) {
      alert(isSuccess)
    } else {
      this.props.history.push({
        pathname: 'home',
        state: this.props.location.state
      })
    }
  }

  async onRegistrationSubmit() {
    if (!this.state.username_valid) { return alert("เบอร์โทรศัพท์ หรือ รหัสผ่าน ไม่ถูกต้อง") }
    var isSuccess = await requestOtp(this.state.username)
    if (!isSuccess) {
      alert(isSuccess)
    } else {
      this.setState(isSuccess.ref ?
        { disabled_username: true, ref: isSuccess.ref }
        :
        { disabled_username: true }
      )
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
  redux.userCartState,
  redux.userCartDispatch
)(RegistrationPage);