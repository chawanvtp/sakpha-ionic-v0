import React, { Component } from 'react';
import { Navbar, Col, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBars, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './index.css'
import BurgerMenu from './menu';
import { connect } from 'react-redux';
import { redux, userProps } from 'src/redux/definition';
import CONFIG from 'src/conf';
import { image_not_found } from 'src/definitions/Error';

class NavigationBarTop extends Component<userProps & { product_count?: number }, {}> {

    state = {
        show_menu: false
    }

    componentDidMount() { }

    render() {
        this.menuShowTrigger = this.menuShowTrigger.bind(this)
        return (
            <div className="NavigationBarTop">
                <Navbar bg={"white"} fixed="top">
                    <Col lg="8" md="8" sm="8" xs="8" className="pl-1 text-left">
                        <img style={{ maxHeight: "100%", maxWidth: "100%" }} src={require('src/images/icons/ick_logo.png')} alt={"NavigationBar-Top-Logo"} onClick={() => window.location.href = "/"} onError={(e: any) => { e.target.onerror = null; e.target.src = image_not_found }} />
                    </Col>
                    <Col lg="2" md="2" sm="2" xs="2" className="text-center pr-0">
                        <div>
                            <FontAwesomeIcon icon={faShoppingCart} onClick={(e: any) => window.location.href = "/cart"} />
                            <div>
                                <Badge variant="info" className="rounded-circle product-count-badge">
                                    {this.props.product_count ? this.props.product_count : ""}
                                </Badge>
                            </div>
                        </div>
                    </Col>
                    <Col lg="2" md="2" sm="2" xs="2" className="text-center pr-0">
                        <div>
                            <FontAwesomeIcon icon={this.state.show_menu ? faTimes : faBars} onClick={() => this.menuShowTrigger()} />
                        </div>
                    </Col>
                </Navbar>
                <BurgerMenu user={this.props.user} isOpen={this.state.show_menu} triggerFunc={this.menuShowTrigger} />
            </div>
        )
    }

    menuShowTrigger(value?: boolean) {
        if (!CONFIG.NAVBAR.ENABLE.MENU) return
        if (value !== undefined) {
            this.setState({
                show_menu: value
            })
        } else {
            this.setState({ show_menu: !this.state.show_menu })
        }
    }
}

export default connect(
    redux.userState,
    redux.userDispatch
)(NavigationBarTop);
