import React from 'react'
import { userCartProps, redux } from 'src/redux/definition'
import { connect } from 'react-redux'
import Authentication from '../Login/payment'
import { Card } from 'react-bootstrap'
import './index.css';

class ProfileInPayment extends React.Component<userCartProps, {}> {

    UNSAFE_componentWillReceiveProps(nextProps: any, prevProps: any) { }

    render() {
        return (
            <div>
                {this.props.user.id && this.props.user.profile ?
                    <Card className="pl-3 mb-2 pb-3">
                        <Card.Body className="pl-0 pr-0 p-0 pb-0 text-left">
                            <div className="header">
                                ข้อมูลส่วนตัว
                            </div>
                            <Card.Text className="pl-3">{"ชื่อผู้ซื้อ : " + this.props.user.profile.name}</Card.Text>
                            <Card.Text className="pl-3">{"เบอร์โทรศัพท์ : " + this.props.user.username}</Card.Text>
                        </Card.Body>
                    </Card>
                    :
                    <Authentication user={this.props.user} />
                }
            </div>
        )
    }

}

export default connect(
    redux.userCartState,
    redux.userCartDispatch
)(ProfileInPayment)