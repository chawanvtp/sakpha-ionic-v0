import { connect } from "react-redux"
import { redux, userCartProps } from "src/redux/definition"
import React, { Component } from "react"
import { Card } from "react-bootstrap"
import AddressInCart from 'src/components/Auth/Profile/cart';
import './index.css';

class DeliveryMethods extends Component<userCartProps & { delivery_selected: string, handleInputChange: Function, disable_edit?: boolean }, {}> {

    state = { profile_edit: this.props.disable_edit ? this.props.disable_edit : false }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.disable_edit !== this.props.disable_edit) { this.setState({ profile_edit: nextProps.disable_edit }) }
    }

    render() {
        return (
            <div>
                <Card className="mb-2 pb-3">
                    <Card.Body className="pl-0 pr-0 p-0 pb-0">
                        <div className="pl-3 text-left header">
                            ที่อยู่การจัดส่ง
                            <div className="float-right d-none mr-3" style={{ color: "#959595", fontSize: "16px" }} onClick={() => this.props.handleInputChange({ target: { name: "profile_edit", value: !this.state.profile_edit } })}>
                                {!this.state.profile_edit ? "แก้ไข" : "ยกเลิก"}
                            </div>
                            {!this.props.user.id ?
                                <div className="d-inline ml-1" style={{ color: "red" }}>
                                    (กรุณาเข้าสู่ระบบ)
                                </div>
                                : ""
                            }
                        </div>

                        <div className="text-left radio-wrapper d-none">
                            <input type="radio" name="delivery_selected" value='pick_at_shop' defaultChecked={this.props.delivery_selected === "pick_at_shop"} onClick={(e: any) => this.props.handleInputChange(e)} /> รับด้วยตัวเองที่ร้าน <br />
                            <input type="radio" name="delivery_selected" value='delivery' defaultChecked={this.props.delivery_selected === "delivery"} disabled={this.props.user.id ? false : true} onClick={(e: any) => this.props.user.profile.address ? this.props.handleInputChange(e) : alert("กรุณาเข้าสู่ระบบ !")} /> ที่อยู่
                            <br />
                        </div>

                        {(this.props.delivery_selected === "delivery") && (this.props.user.id) ?
                            <div className="col-12 text-left">
                                {(this.props.user.profile.address.length > 0) && (!this.state.profile_edit) ?
                                    <div>
                                        <div className="text-truncate">{`ชื่อ : ${this.props.user.profile.name ? this.props.user.profile.name : ""}`}</div>
                                        <div className="text-truncate mb-2">{`เบอร์โทรศัพท์ : ${this.props.user.profile.mobile ? this.props.user.profile.mobile : ""}`}</div>
                                        {Object.values(this.props.user.profile.address[0]).map((val, index) => index !== (Object.values(this.props.user.profile.address[0]).length - 1) ?
                                            (<div className="d-inline card-text" key={`this.props.user.profile.address[0]-${index}`}>{val + " "}</div>) :
                                            ""
                                        )}
                                    </div>
                                    :
                                    (this.props.user.id) ? <AddressInCart user={this.props.user} disable_edit={!this.state.profile_edit} /> : ""
                                }
                            </div>
                            : ""
                        }
                    </Card.Body>
                </Card>
            </div>
        )
    }

}

export default connect(
    redux.userCartState,
    redux.userCartDispatch
)(DeliveryMethods)