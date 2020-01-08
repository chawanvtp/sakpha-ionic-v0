import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, InputGroup, FormControl } from 'react-bootstrap';
import { address_require_info, profile_require_info } from 'src/definitions/Users';
import './index.css'
import { validateInput, indexObjectValueByString } from 'src/middleware/tools';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { updateProfileSend } from 'src/facades/Auth/ProfileFacade';
import { redux, userProps } from 'src/redux/definition';

class AddressCard extends Component<userProps, {}> {

    state = {
        username: this.props.user.username ? this.props.user.username : "",
        password: this.props.user.password ? this.props.user.password : "",
        username_valid: this.props.user.username ? true : false,
        password_valid: this.props.user.password ? true : false,
        address_line: this.props.user.profile.address.length > 0 ? this.props.user.profile.address[0].address_line : "",
        city: this.props.user.profile.address.length > 0 ? this.props.user.profile.address[0].city : "",
        name: this.props.user.profile.name ? this.props.user.profile.name : "",
        city_sub_division: this.props.user.profile.address.length > 0 ? this.props.user.profile.address[0].city_sub_division : "",
        country_sub_division: this.props.user.profile.address.length > 0 ? this.props.user.profile.address[0].country_sub_division : "",
        is_shipping_address: true,
        post_code: this.props.user.profile.address.length > 0 ? this.props.user.profile.address[0].post_code : "",
        birth: this.props.user.profile.birth ? this.props.user.profile.birth : "",
        disable_edit: true
    }

    componentDidMount() { }

    render() {
        this.userLogin = this.userLogin.bind(this)
        return (
            <Card className="text-center pb-3 mt-3">
                <div className="container mt-3 address-wrapper">
                    <Card.Header as={"h5"}>
                        {"ข้อมูลที่อยู่"}
                        {this.state.disable_edit
                            ?
                            <FontAwesomeIcon className="float-right edit-btn" icon={faEdit} onClick={() => this.editModeToggle()} />
                            :
                            <FontAwesomeIcon className="float-right edit-btn" icon={faCheckCircle} onClick={() => this.editModeToggle()} />
                        }
                    </Card.Header>
                    <Card.Body className="pl-0 pr-0 p-0 pb-0">
                        {(profile_require_info).map((element, index) => (
                            <InputGroup key={`AddressInfo-${index}`}>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        {element.name}
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    name={element.type}
                                    type={element.type === "birth" ? "date" : "text"}
                                    placeholder={element.name}
                                    aria-label={element.name}
                                    disabled={element.type === "mobile" || element.type === "birth" ? true : this.state.disable_edit}
                                    aria-describedby="basic-addon1"
                                    onChange={(e: any) => this.onInputChange(e)}
                                    defaultValue={this.props.user.profile ? indexObjectValueByString(this.props.user.profile, element.type) : element.type === "mobile" ? this.props.user.username : ""}
                                />
                            </InputGroup>
                        ))
                        }
                        {(address_require_info).map((element: any, index) => (
                            <InputGroup key={`AddressInfo-${index}`}>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        {element.name}
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    name={element.type}
                                    placeholder={element.name}
                                    disabled={this.state.disable_edit}
                                    aria-label={element.name}
                                    aria-describedby="basic-addon1"
                                    defaultValue={this.props.user.profile.address[0] ? indexObjectValueByString(this.props.user.profile.address[0], element.type) : ""}
                                    onChange={(e: any) => this.onInputChange(e)}
                                />
                            </InputGroup>
                        ))
                        }
                    </Card.Body>
                </div>
            </Card>
        )
    }

    async userLogin() {
        if (!this.state.username_valid || !this.state.password_valid) { return alert("เบอร์โทรศัพท์ หรือ รหัสผ่าน ไม่ถูกต้อง") }
        var isSuccess = await this.props.userStartLogin(this.props.user.username, this.props.user.password)
        if (isSuccess !== undefined) {
            alert(isSuccess)
        } else {
            window.location.reload()
        }
    }

    onInputChange = (event: any) => {
        if (event.target.name === "username" && event.target.value.length > 10) return
        this.setState({
            [event.target.name]: event.target.value
        });
        this.validateInput(event.target.name, event.target.value)
    }

    validateInput(name: string, value: string) {
        this.setState({
            [name + "_valid"]: validateInput(name, value)
        })
    }

    editModeToggle() {
        this.setState({
            disable_edit: !this.state.disable_edit
        })
        if (!this.state.disable_edit) this.submitUpdate()
    }

    async submitUpdate() {
        var isSuccess = await updateProfileSend(this.props.user.id,
            {
                name: this.state.name,
                avatar: this.props.user.profile ? this.props.user.profile.avatar : "",
                mobile: this.props.user.username,
                birth: this.state.birth,
            },
            {
                address_line: this.state.address_line,
                city: this.state.city,
                city_sub_division: this.state.city_sub_division,
                country_sub_division: this.state.country_sub_division,
                is_shipping_address: true,
                post_code: this.state.post_code
            }
        )

        if (isSuccess && isSuccess.statusText === "Accepted") {
            if (this.props.user.id) { this.props.userStartLogin(this.props.user.username, this.props.user.password, "PROFILE", this.props.user.id) }
        }
    }
}

export default connect(
    redux.userState,
    redux.userDispatch
)(AddressCard);