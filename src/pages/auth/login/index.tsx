import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { validateInput } from 'src/middleware/tools';
import { userCartProps, redux } from 'src/redux/definition';

class LoginPage extends Component<userCartProps & RouteComponentProps, {}> {

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
      <div className="h-100 Login-Page text-center">
        <div className="container mb-4">
          <h4 className="mb-4 font-weight-bold">เข้าสู่ระบบ</h4>
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
              aria-describedby="basic-addon1"
              onChange={(e: any) => this.onInputChange(e)}
              value={this.state.username}
            />
          </InputGroup>
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
              aria-describedby="basic-addon1"
              onChange={(e: any) => this.onInputChange(e)}
            />
          </InputGroup>
          <div className="text-right mt-2"><a href="/forgotPassword"><u>ลืมรหัสผ่าน</u></a></div>

          {(!this.state.username_valid || !this.state.password_valid) && (this.state.username.length > 0 && this.state.password.length > 0) ?
            <div style={{ color: "red", marginTop: "0.5rem" }}>เบอร์โทรศัพท์ หรือ รหัสผ่าน ไม่ถูกต้อง</div>
            : ""
          }
          <Button
            variant="success"
            className="login-submit-btn mb-0"
            onClick={(e: any) => this.userLogin()}
          >เข้าสู่ระบบ
          </Button>
          <hr />
          <Button
            variant="secondary"
            className="register-btn"
            onClick={(e: any) => this.onRegisterClicked()}
          >สมัครสมาชิก
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

  onRegisterClicked() {
    this.props.history.push({
      pathname: 'registration',
      state: this.props.location.state
    })
  }
}

export default connect(
  redux.userCartState,
  redux.userCartDispatch
)(LoginPage);