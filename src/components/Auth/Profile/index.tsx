import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';
import { avatar_default } from 'src/definitions/Users';
import './index.css'
import { redux, userProps } from 'src/redux/definition';
import CONFIG from 'src/conf';

class ProfileCard extends Component<userProps, {}> {

    state = {
        username: "",
        password: "",
        username_valid: false,
        password_valid: false
    }

    componentDidMount() { }

    render() {
        this.userLogin = this.userLogin.bind(this)
        return this.props.user.profile ? (
            <Card className="text-center pb-3 bg-transparent">
                <div className="container mt-3 profile-wrapper">
                    {CONFIG.NAVBAR.MENU.PROFILE.avatar ? <Card.Img variant="top" src={this.props.user.profile.avatar ? this.props.user.profile.avatar : avatar_default} /> : ""}
                    {CONFIG.NAVBAR.MENU.PROFILE.name ?<Card.Title>{this.props.user.profile ? this.props.user.profile.name : "-"}</Card.Title>:""}
                    {CONFIG.NAVBAR.MENU.PROFILE.username ?<Card.Title>{this.props.user ? this.props.user.username : "-"}</Card.Title>:""}
                    <Card.Body className="pl-0 pr-0 p-0 pb-0" />
                </div>
            </Card>
        ) : (<div />)
    }

    async userLogin() {
        if (!this.state.username_valid || !this.state.password_valid) { return alert("เบอร์โทรศัพท์ หรือ รหัสผ่าน ไม่ถูกต้อง") }
        var isSuccess = await this.props.userStartLogin(this.state.username, this.state.password)

        if (isSuccess !== undefined) {
            alert(isSuccess)
        } else {
            window.location.reload()
        }

    }
}

export default connect(
    redux.userState,
    redux.userDispatch
)(ProfileCard);