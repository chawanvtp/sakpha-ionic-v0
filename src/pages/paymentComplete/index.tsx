import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import NavigationBarTop from 'src/components/NavigationBars/Top';
import './index.css'
import { Card, Button } from 'react-bootstrap';
import { userCartProps, redux } from 'src/redux/definition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

class PaymentCompletePage extends Component<userCartProps & RouteComponentProps, {}> {

    state = {}

    componentDidMount() { }

    render() {
        this.userLogin = this.userLogin.bind(this)
        return (
            <div className="h-100 PaymentComplete-Page">
                <NavigationBarTop user={this.props.user} product_count={this.props.product_in_cart.products.length} />
                <div className="container mt-5 text-center font-weight-bold">
                    <Card>
                        <Card.Img variant={"top"} src={require("src/images/icons/payment_complete.png")} />
                        <Card.Body>
                            <div className="card-text">
                                (ร้านค้าจะติดต่อกลับในอีกสักครู่)
                                <FontAwesomeIcon icon={faCheckCircle} className="ml-2" style={{ color: "#8EB846" }} />
                            </div>
                            <Card.Title>กรุณารอสักครู่</Card.Title>
                            <Card.Title>ร้านค้ากำลังดำเนินการ</Card.Title>
                        </Card.Body>
                    </Card>
                    <Button variant="success" className="home-btn" onClick={() => window.location.href = "/"}>
                        กลับหน้าหลัก
                    </Button>
                </div>
            </div>
        )
    }

    async userLogin(mobile: string, password: string) {
        var isSuccess = await this.props.userStartLogin(mobile, password)
        if (isSuccess !== undefined) { alert(isSuccess) }
    }

}

export default connect(
    redux.userCartState,
    redux.userCartDispatch
)(PaymentCompletePage);