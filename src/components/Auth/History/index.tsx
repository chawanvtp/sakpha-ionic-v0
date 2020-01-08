import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Collapse } from 'react-bootstrap';
import './index.css';
import OrderDetail from './detail';
import { HistoryFacade } from 'src/facades/Auth/HistoryFacade';
import { OrderBill } from 'src/redux/Order/types';
import { userCartProps, redux } from 'src/redux/definition';

class History extends Component<userCartProps & { orderID: string }, {}> {

    state = {
        detail_show: false,
        orderID: this.props.orderID ? this.props.orderID : "",
        order: {} as OrderBill || undefined
    }

    componentDidMount() {
        if (!this.state.order.id) { this.getOrderDetail() }
    }

    UNSAFE_componentWillReceiveProps(nextProps: any) { }

    render() {
        this.detailToggle = this.detailToggle.bind(this)
        if (!this.state.order.id) return <div />
        return (
            <Card className="text-center pb-2 bg-transparent mb-3">
                <div className="row mt-3 history-wrapper">
                    <div className="col-6">
                        <div className="col-12 text-truncate">
                            <h5>Bill #{this.state.order.id}</h5>
                        </div>
                        <div className="col-12">
                            <div>สั่งซื้อ 11.11.2562</div>
                        </div>
                    </div>
                    <div className="col-6 button-wrapper">
                        <Button variant={this.state.detail_show ? "primary" : "secondary"} onClick={() => this.detailToggle()}>ดูข้อมูล</Button>
                    </div>
                    <Collapse in={this.state.detail_show}>
                        <div className="orderDetail container">
                            <OrderDetail OrderBill={this.state.order} user={this.props.user} toggleFunc={this.detailToggle} />
                        </div>
                    </Collapse>

                </div>
            </Card>
        )
    }

    detailToggle() {
        this.setState({
            detail_show: !this.state.detail_show
        })
    }

    async getOrderDetail() {
        var orderDetail = await HistoryFacade.getByID(this.props.user.id, this.state.orderID)
        this.setState({
            order: orderDetail
        })
    }
}

export default connect(
    redux.userCartState,
    redux.userCartDispatch
)(History);