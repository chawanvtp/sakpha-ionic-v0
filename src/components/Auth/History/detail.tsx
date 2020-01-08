import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import ProgressContainerVertical from 'src/components/Progress/vertical';
import { OrderBill } from 'src/redux/Order/types';
import { redux, userProps } from 'src/redux/definition';

class OrderDetail extends Component<userProps & { OrderBill: OrderBill, toggleFunc: Function }, {}> {

    state = {}

    componentDidMount() { }

    render() {
        return (
            < div className="row mt-3 orderDetail-wrapper" >
                <div className="col-6">
                    <div className="col-12 text-truncate">
                        <h5>{this.props.OrderBill.status}</h5>
                    </div>
                    <div className="col-12">
                        <div>{this.props.OrderBill.delivery_type}</div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="col-12 text-truncate">
                        <h5>{this.props.OrderBill.payment_method}</h5>
                    </div>
                    <div className="col-12">
                        <div>{this.props.OrderBill.total}</div>
                    </div>
                </div>
                {this.props.OrderBill.shipping_address ?
                    <div className="col-12">
                        {Object.values(this.props.OrderBill.shipping_address).map((val, index) => (
                            <div className="d-inline" key={`this.props.user.profile.address[0]-${index}`}>{val + " "}</div>
                        ))}
                    </div>
                    : ""
                }
                <div className="col-12 ProgressContainer-wrapper">
                    <ProgressContainerVertical user={this.props.user} />
                </div>
                <div className="col-12 mt-1 text-center">
                    <FontAwesomeIcon icon={faArrowUp} onClick={() => this.props.toggleFunc()} />
                </div>
            </div >
        )
    }
}

export default connect(
    redux.userState,
    redux.userDispatch
)(OrderDetail);