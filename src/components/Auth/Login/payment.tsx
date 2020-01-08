import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestOtp, loginLINE } from 'src/facades/Auth/UserAccountFacade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlockAlt, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { InputGroup, FormControl, Button, Card } from 'react-bootstrap';
import { validateInput } from 'src/middleware/tools';
import './payment.css';
import { redux, userProps } from 'src/redux/definition';
import CONFIG from 'src/conf';
import { image_not_found } from 'src/definitions/Error';

class Authentication extends Component<userProps & { bgColor?: any }, {}> {

    state = {
        username: "",
        password: "",
        name: "",
        request_id: "",
        ref: "",
        username_valid: false,
        name_valid: false,
        password_valid: false,
        disabled_username: false
    }

    componentDidMount() { }

    render() {
        this.userLogin = this.userLogin.bind(this)
        return (
            <Card className="text-center mb-3 pb-2" style={this.props.bgColor ? { backgroundColor: `${this.props.bgColor}` } : {}}>
                <div className="mt-0 pl-0 pr-0">
                    <div className="pl-3 pt-2 pb-2 text-left font-weight-bold">ยืนยันตัวตน</div>
                    <Card.Body className="pl-0 pr-0 p-0 pb-0">
                        <div className="container">

                            <InputGroup className="mb-2">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        <FontAwesomeIcon icon={faMobileAlt} />
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    name="username"
                                    placeholder="เบอร์โทรศัพท์"
                                    aria-label="เบอร์โทรศัพท์"
                                    type="number"
                                    disabled={this.state.disabled_username}
                                    aria-describedby="basic-addon1"
                                    onChange={(e: any) => this.onInputChange(e)}
                                    value={this.state.username}
                                />
                            </InputGroup>

                            {(!this.state.username_valid) && (this.state.username.length > 0) ?
                                <div style={{ color: "red", marginTop: "0.5rem" }}>เบอร์โทรศัพท์อย่างน้อย 10 ตัว</div>
                                : ""
                            }

                            {this.state.disabled_username ?
                                <div className="container">
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faUnlockAlt} />
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            name="password"
                                            type="password"
                                            placeholder="รหัสผ่าน หรือ OTP"
                                            aria-label="รหัสผ่าน หรือ OTP"
                                            aria-describedby="basic-addon1"
                                            onChange={(e: any) => this.onInputChange(e)}
                                        />
                                    </InputGroup>
                                    <div className="text-center" style={{ color: "red", marginTop: "0.5rem" }}>REF: {this.state.ref}</div>
                                    <Button variant="success" className="register-btn w-100 mt-2" onClick={(e: any) => this.userLogin()}>เข้าสู่ระบบ</Button>
                                </div>
                                :
                                ""
                            }

                            {CONFIG.AUTH.ENABLE.SMS ?
                                <Button variant="secondary" disabled={this.state.ref.length > 0} className="otp-request-btn mb-2 mt-2 w-100 rounded-pill" onClick={(e: any) => this.userRequestOTP()} >รับรหัส OTP</Button> : ""
                            }

                            {CONFIG.AUTH.ENABLE.LINE ?
                                <Button variant="secondary" className="login-submit-btn mb-2 mt-2 w-100 rounded-pill" onClick={(e: any) => loginLINE()} >
                                    <div className="d-inline">
                                        <img src={require("src/images/icons/line_icon.png")} alt="line_icon" style={{ maxHeight: "1.5rem" }} className="mr-1" onError={(e: any) => { e.target.onerror = null; e.target.src = image_not_found }} />
                                        LINE LOGIN
                                    </div>
                                </Button>
                                : ""
                            }

                        </div>

                    </Card.Body>
                </div>
            </Card>
        )
    }

    async userLogin() {
        if (!this.state.username_valid || !this.state.password_valid) { return alert("เบอร์โทรศัพท์ หรือ รหัสผ่าน ไม่ถูกต้อง") }
        var isSuccess = this.state.password.length <= 4
            ? await this.props.userStartLogin(this.state.username, this.state.password, "OTP", this.state.request_id, this.state.name) : await this.props.userStartLogin(this.state.username, this.state.password)

        if (isSuccess === undefined) {
            alert(isSuccess)
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

    async userRequestOTP() {
        if (!this.state.username_valid) { return alert("เบอร์โทรศัพท์ ไม่ถูกต้อง หรือ ชื่อ สั้นเกินไป") }
        var isSuccess = await requestOtp(this.state.username)
        if (!isSuccess) {
            alert(isSuccess)
        } else {
            this.setState({
                disabled_username: true,
                request_id: isSuccess.request_id,
                ref: isSuccess.ref
            })
        }
    }

    onRegisterClicked() {
        window.location.href = '/registration'
    }
}

export default connect(
    redux.userState,
    redux.userDispatch
)(Authentication);