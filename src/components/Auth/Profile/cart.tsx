import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, InputGroup, FormControl, Button } from 'react-bootstrap';
import { address_require_info, profile_require_info, PROFILE_INPUTGROUP_DEFAULT_CONFIG } from 'src/definitions/Users';
import './index.css'
import { validateInput, indexObjectValueByString } from 'src/middleware/tools';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { updateProfileSend } from 'src/facades/Auth/ProfileFacade';
import { Location } from 'src/middleware/location';
import { redux, userProps } from 'src/redux/definition';
import { Address } from 'src/definitions/address';

class AddressInCart extends Component<userProps & { disable_edit?: boolean }, {}> {

    state = {
        username: this.props.user.profile.mobile ? this.props.user.profile.mobile : "",
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
        disable_edit: this.props.disable_edit ? this.props.disable_edit : false,
        suggested_address: [],
        suggested_address_used: false,
        loading: false
    }

    componentDidMount() { this.autoAddress() }
    componentWillReceiveProps(nextProps: any) {
        if (nextProps.disable_edit !== this.props.disable_edit) { this.setState({ disable_edit: nextProps.disable_edit }) }
    }

    render() {
        this.userLogin = this.userLogin.bind(this)
        this.autoAddress = this.autoAddress.bind(this)
        return (
            <Card className="text-center pb-3 mt-3">
                <div className="container address-wrapper">
                    <Card.Body className="pl-0 pr-0 p-0 pb-0">

                        {(profile_require_info).map((element, index) => (
                            <div key={`ProfileInfo-${index}`} className="mb-2">
                                <div className="text-left pl-1 mb-1">
                                    {element.name}
                                </div>
                                <InputGroup >
                                    <FormControl
                                        {...PROFILE_INPUTGROUP_DEFAULT_CONFIG}
                                        name={element.type}
                                        type={element.type === "birth" ? "date" : "text"}
                                        placeholder={element.name}
                                        aria-label={element.name}
                                        disabled={element.type === "birth" ? true : this.state.disable_edit}
                                        aria-describedby="basic-addon1"
                                        onChange={(e: any) => this.onInputChange(e)}
                                        value={(element.type === "username") ? this.state.username : (this.props.user.profile && indexObjectValueByString(this.state, element.type)) ? indexObjectValueByString(this.state, element.type) : ""}
                                    />
                                </InputGroup>
                            </div>
                        ))
                        }

                        {this.state.suggested_address ?
                            <div className="mb-2">
                                <Button className="text-truncate mt-2 mb-2 w-100" variant="dark" onClick={() => this.setAddress()}>
                                    เพิ่มที่อยู่จัดส่งด้วย GPS
                                </Button>
                                {Object.values(this.state.suggested_address).map((val: any, index) => (
                                    <div className="d-inline" key={`suggested_address-${index}`}>
                                        {(val.value) as string + " "}
                                    </div>))
                                }
                            </div>
                            : "NONE"
                        }

                        {(address_require_info).map((element: any, index) => (
                            <div key={`AddressInfo-${index}`} className="mb-2">
                                <div className="text-left pl-1 mb-1">
                                    {element.name}
                                </div>
                                <InputGroup>
                                    <FormControl
                                        name={element.type}
                                        placeholder={element.name}
                                        disabled={this.state.disable_edit}
                                        aria-label={element.name}
                                        aria-describedby="basic-addon1"
                                        value={this.state.suggested_address_used ? indexObjectValueByString(this.state, element.type) : indexObjectValueByString(this.state, element.type)}
                                        onChange={(e: any) => this.onInputChange(e)}
                                    />
                                </InputGroup>
                            </div>
                        ))
                        }
                    </Card.Body>
                    {
                        this.state.disable_edit
                            ?
                            <Button variant="outline-secondary" className="text-center mt-2" onClick={() => this.editModeToggle()}>
                                <FontAwesomeIcon className="text-center mr-2" icon={faEdit} />
                                แก้ไข
                            </Button>
                            :
                            <div className="fixed-bottom pl-3 pr-3 pb-3 pt-3">
                                <Button variant="success" className="text-center mt-2 w-100 p-3" onClick={() => this.editModeToggle()}>
                                    <FontAwesomeIcon className="text-center mr-2" icon={faCheckCircle} />ยืนยัน
                                </Button>
                            </div>
                    }

                </div>
            </Card>
        )
    }

    async autoAddress() {
        var address = await Location.initAddress()
        if (!address || !address.results || address.results <= 0) return
        var suggested_address = Address.mapToState(address.results)
        this.setState({ suggested_address })
    }

    async setAddress(new_suggestion?: { app: string; value: string; }[]) {
        var suggestion = new_suggestion ? new_suggestion : this.state.suggested_address
        suggestion.forEach((address: any, index: any) => {
            this.setState({ [address.app]: address.value, loading: true })
        })
        this.setState({ suggested_address_used: true, loading: false })
    }

    async userLogin() {
        if (!this.state.username_valid || !this.state.password_valid) { return alert("เบอร์โทรศัพท์ หรือ รหัสผ่าน ไม่ถูกต้อง") }
        var isSuccess = await this.props.userStartLogin(this.props.user.username, this.props.user.password)
        if (isSuccess !== undefined) { alert(isSuccess) }
        else { window.location.reload() }
    }

    onInputChange = (event: any) => {
        if (!event || !event.target || (event.target.value === undefined || null) || !event.target.name) return
        if (event.target.name === "username" && event.target.value.length > 10) return

        this.setState({ [event.target.name]: event.target.value, suggested_address_used: false });
        this.validateInput(event.target.name, event.target.value)

        if (event.target.name === "post_code" && event.target.value.length >= 5) {
            var suggested_address = Address.GET_AddressHint({ key: event.target.name, value: event.target.value })
            if (suggested_address) return this.setAddress(suggested_address)
        }
    }

    validateInput(name: string, value: string) { this.setState({ [name + "_valid"]: validateInput(name, value) }) }

    editModeToggle() {
        this.setState({ disable_edit: !this.state.disable_edit })
        if (!this.state.disable_edit) this.submitUpdate()
    }

    async submitUpdate() {
        var isSuccess = await updateProfileSend(this.props.user.id,
            {
                name: this.state.name,
                avatar: this.props.user.profile ? this.props.user.profile.avatar : "",
                mobile: this.state.username,
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
            this.props.userStartLogin(this.props.user.username, this.props.user.password, "PROFILE", this.props.user.id)
        }
    }
}

export default connect(
    redux.userState,
    redux.userDispatch
)(AddressInCart);