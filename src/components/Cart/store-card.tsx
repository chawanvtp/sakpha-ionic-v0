import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProductInCart } from 'src/redux/Cart/types';
import ProductCardInCart from './product-card';
import { Seller } from 'src/models/SellerModel';
import { Card } from 'react-bootstrap';
import { redux, userCartProps } from 'src/redux/definition';

class StoreCardInCart extends Component<userCartProps & { seller: Seller }, {}> {

    state = {
        productsList: this.getProductList(this.props.product_in_cart.products),
        productCards: []
    }

    componentDidMount() { }

    UNSAFE_componentWillReceiveProps(nextProps: any) {
        this.setState({
            productsList: this.getProductList(nextProps.product_in_cart.products)
        })
    }

    render() {
        var products = this.createProducts(this.state.productsList)
        return (!this.state.productsList || this.state.productsList.length <= 0) ? (<div />) : (
            <div className="col-12 pl-0 pr-0">
                <Card className="border-0">
                    <Card.Body className="pt-0 pb-0">
                        <Card.Title className="pb-2 pt-2 text-left pl-1" style={{ color: "black", borderBottom: "1px solid #DDE2E5" }}>{this.props.seller.name}</Card.Title>
                        {products}
                    </Card.Body>
                </Card>
            </div>
        )
    }

    getProductList(products_in_cart: Array<ProductInCart>) {
        var productsList = [-1]
        products_in_cart.forEach((element, index) => {
            if (element.seller_id === this.props.seller.id) {
                if (productsList[0] <= -1) {
                    productsList[0] = index
                } else {
                    productsList.push(index)
                }
            }
        });
        return productsList
    }

    createProducts(productsList: Array<Number>) {
        var products = []
        products.push(
            (productsList).map(
                (product_index, index: number) => (
                    <ProductCardInCart user={this.props.user} product_in_cart={this.props.product_in_cart} product_detail={this.props.product_in_cart.products[Number(product_index)]} key={`ProductCardInCart-${this.props.seller.id}-${product_index}`} />
                )
            ))
        return products
    }

}

export default connect(
    redux.userCartState,
    redux.userCartDispatch
)(StoreCardInCart);