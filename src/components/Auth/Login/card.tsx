import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestOtp, loginLINE } from 'src/facades/Auth/UserAccountFacade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { InputGroup, FormControl, Button, Card } from 'react-bootstrap';
import { validateInput } from 'src/middleware/tools';
import { redux, userProps } from 'src/redux/definition';
import CONFIG from 'src/conf';
import './payment.css';
import { image_not_found } from 'src/definitions/Error';

class LoginCard extends Component<userProps & { bgColor?: any }, {}> {

    state = {
        username: "",
        password: "",
        username_valid: false,
        password_valid: false,
        disabled_username: false,
        request_id: "",
        ref: "",
        name: "",
        login_type: ""
    }

    componentDidMount() { }

    render() {
        this.userLogin = this.userLogin.bind(this)
        return (
            <Card className="Login-Card text-center mb-3 pb-2" style={this.props.bgColor ? { backgroundColor: `${this.props.bgColor}` } : {}}>
                <div className="container mt-3">
                    <Card.Title>เข้าสู่ระบบ</Card.Title>
                    <Card.Body className="pl-0 pr-0 p-0 pb-0">
                        <InputGroup className="mb-2">
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
                                disabled={this.state.disabled_username}
                                aria-describedby="basic-addon1"
                                onChange={(e: any) => this.onInputChange(e)}
                                value={this.state.username}
                            />
                        </InputGroup>

                        {this.state.login_type ?
                            <div>
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
                                {this.state.ref.length > 0 ?
                                    <div className="text-center" style={{ color: "red", marginTop: "0.5rem" }}>REF: {this.state.ref}</div> : ""
                                }
                            </div>
                            :
                            ""
                        }

                        <div>
                            {CONFIG.AUTH.ENABLE.RESET_PW ? <div className="float-left d-inline mt-1"><a href="/forgotPassword"><u>ลืมรหัสผ่าน</u></a></div> : ""}
                            {CONFIG.AUTH.ENABLE.REGISTER ? <div className="float-right d-inline mt-1"><a href="/registration"><u>สมัครสมาชิก</u></a></div> : ""}
                        </div>

                        {(!this.state.username_valid || !this.state.password_valid) && (this.state.username.length > 0 && this.state.password.length > 0) ?
                            <div style={{ color: "red", marginTop: "0.5rem" }}>เบอร์โทรศัพท์ หรือ รหัสผ่าน ไม่ถูกต้อง<br /></div>
                            : ""
                        }

                        {CONFIG.AUTH.ENABLE.ACCOUNT && !this.state.login_type ?
                            <Button variant="secondary" className=" mb-2 mt-2 w-100" name="login_type" value="ACCOUNT" onClick={(e: any) => this.onLoginTypeChange(e)}>เข้าสู่ระบบ</Button> : ""
                        }

                        {this.state.login_type ?
                            <Button variant="success" className="mb-2 mt-2 w-100" name="login_type" value="ACCOUNT" onClick={(e: any) => this.userLogin()}>เข้าสู่ระบบ</Button> : ""
                        }


                        {CONFIG.AUTH.ENABLE.REGISTER ?
                            <Button variant="secondary" className="register-btn w-100" onClick={(e: any) => this.onRegisterClicked()}>สมัครสมาชิก</Button> : ""
                        }

                        <hr className="border-light mt-2 mb-2" />

                        {CONFIG.AUTH.ENABLE.SMS ?
                            <Button variant="secondary" className="mb-2 w-100 rounded-pill" onClick={(e: any) => this.userRequestOTP()} >ขอรหัสผ่านทาง SMS</Button> : ""}

                        {CONFIG.AUTH.ENABLE.LINE ?
                            <Button variant="secondary" className="login-submit-btn mb-2 w-100 rounded-pill" onClick={(e: any) => loginLINE()} >
                                <div className="d-inline">
                                    <img src={require("src/images/icons/line_icon.png")} alt="line_icon" style={{ maxHeight: "1.5rem" }} className="mr-1" onError={(e: any) => { e.target.onerror = null; e.target.src = image_not_found }} />
                                    LINE LOGIN
                                    </div>
                            </Button>
                            : ""
                        }

                    </Card.Body>
                </div>
            </Card>
        )
    }

    async userLogin() {
        if (!this.state.username_valid || !this.state.password_valid) { return alert("เบอร์โทรศัพท์ หรือ รหัสผ่าน ไม่ถูกต้อง") }
        var isSuccess = this.state.login_type === "OTP"
            ? await this.props.userStartLogin(this.state.username, this.state.password, "OTP", this.state.request_id) : await this.props.userStartLogin(this.state.username, this.state.password)

        if (isSuccess === undefined) { alert(isSuccess) }
    }

    async userLoginLINE() { loginLINE() }


    validateInput(name: string, value: string) { this.setState({ [name + "_valid"]: validateInput(name, value) }) }

    onInputChange = (event: any) => {
        if (event.target.name === "username" && event.target.value.length > 10) return
        this.setState({ [event.target.name]: event.target.value });
        this.validateInput(event.target.name, event.target.value)
    }

    onLoginTypeChange = (event: any) => {
        if (!this.state.username_valid) { return alert("เบอร์โทรศัพท์ ไม่ถูกต้อง !!") }
        this.setState({ [event.target.name]: event.target.value });
    }

    async userRequestOTP() {
        if (!this.state.username_valid) { return alert("เบอร์โทรศัพท์ หรือ รหัสผ่าน ไม่ถูกต้อง") }
        var isSuccess = await requestOtp(this.state.username)
        if (!isSuccess) { alert(isSuccess) }
        else {
            this.setState({
                disabled_username: true,
                request_id: isSuccess.request_id,
                ref: isSuccess.ref,
                login_type: "OTP"
            })
        }
    }

    onRegisterClicked() { window.location.href = '/registration' }
}

export default connect(
    redux.userState,
    redux.userDispatch
)(LoginCard);