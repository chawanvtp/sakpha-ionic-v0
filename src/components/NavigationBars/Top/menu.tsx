import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import { initUserLogin } from 'src/facades/Auth/UserAccountFacade';
import { connect } from 'react-redux';
import LoginCard from 'src/components/Auth/Login/card'
import ProfileCard from 'src/components/Auth/Profile'
import { Button } from 'react-bootstrap';
import { getParam } from 'src/middleware/tools';
import { redux, userProps } from 'src/redux/definition';
import CONFIG from 'src/conf';

class BurgerMenu extends React.Component<userProps & { isOpen: boolean, triggerFunc: Function }, {}> {

    state = {
        isOpen: this.props.isOpen,
        access_token: getParam("access_token") ? getParam("access_token") : ""
    }

    showSettings(event: any) {
        event.preventDefault();
    }

    UNSAFE_componentWillReceiveProps(nextProps: any) {
        this.setState({
            isOpen: nextProps.isOpen
        })
    }

    componentDidMount() {
        var current_user = initUserLogin()
        if (current_user) {
            var login_type = this.props.user.login_type === "LINE" ? this.props.user.login_type : "PROFILE"
            this.props.userStartLogin(current_user.username, current_user.password, login_type, current_user.id)
        }
        if (this.state.access_token && !this.props.user.id) this.props.userStartLogin("", "", "LINE", this.state.access_token)
        if (!this.props.user.id && current_user) this.props.userStartLogin(current_user.username, current_user.password)
    }

    render() {
        return (
            <Menu customBurgerIcon={false} customCrossIcon={<div>X</div>} isOpen={this.props.isOpen} right={true} crossButtonClassName="custom-burger-cross-btn" pageWrapId={"page-wrap"} onStateChange={(e: any) => this.props.triggerFunc(e.isOpen)}>
                <div id="page-wrap">
                    <div className="w-100 h-100">
                        <div className="empty-top" />
                        {this.props.user.id ?
                            <div style={{ color: "white" }}>
                                <ProfileCard user={this.props.user} />
                                {CONFIG.NAVBAR.MENU.BUTTON.SET_CROP ? <Button className="w-100 menu-item" href="profile_crop">ตั้งค่าการค้นหา</Button> : ""}
                                {CONFIG.NAVBAR.MENU.BUTTON.SET_PROFILE ?<Button className="w-100" href="profile">แก้ไขข้อมูลส่วนตัว</Button>: ""}
                                {CONFIG.NAVBAR.MENU.BUTTON.RESET_PASSWORD && CONFIG.AUTH.ENABLE.RESET_PW ?<Button className="w-100" href={`forgotpassword?mobile=${this.props.user.username}`}>เปลี่ยนรหัสผ่าน</Button>: ""}
                                {CONFIG.NAVBAR.MENU.BUTTON.HISTORY ?<Button className="w-100" href={`history`}>ประวัติการสั่งซื้อ</Button>: ""}
                                {CONFIG.NAVBAR.MENU.BUTTON.LOGOUT ?<Button className="w-100" variant={"secondary"} onClick={() => this.props.userLogout()}>ออกจากระบบ</Button>: ""}
                            </div>
                            :
                            <LoginCard user={this.props.user} bgColor={"transparent"} />
                        }
                    </div>
                </div>
            </Menu>
        );
    }
}

export default connect(
    redux.userState,
    redux.userDispatch
)(BurgerMenu);
