import React, { Component } from 'react';
import { AppState, AppActions } from 'src/redux';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { UserProp, UserProps, UserStateProp, UserDispatchProp } from 'src/redux/User/types'
import { userStartLogin, userRequestLogout } from 'src/facades/Auth/UserAccountFacade';
import { Col } from 'react-bootstrap'
import ProductDetailCard from 'src/components/Products/Detail/card'
import { ProductDetail, ProductDetailProps, ProductDetailProp, ProductDetailLinkStateProp, ProductDetailLinkDispatchProp } from 'src/redux/Product/Detail/types';
import { getProductDetail } from 'src/facades/Products/ProductDetailFacade';
import { CartProp, CartLinkStateProp, CartLinkDispatchProp, CartProps } from 'src/redux/Cart/types';
import { addProductToCart, clearProductInCart } from 'src/facades/Cart';
import { ProductCatalogProp, ProductCatalogLinkStateProp, ProductCatalogLinkDispatchProp, ProductCatalogProps } from 'src/redux/Product/Catalog/types';
import { getProductCatalog } from 'src/facades/Products/ProductCatalogFacade';

class ProductDetailContainer extends Component<UserProps & ProductDetailProps & CartProps & ProductCatalogProps, {}> {

    componentDidMount() { }

    render() {
        return (
            <div className="mb-3">
                <ProductDetailCard user={this.props.user} product_in_cart={this.props.product_in_cart} product_catalog={this.props.product_catalog} product_detail={this.props.product_detail} />
            </div>
        )
    }

    createCard(product_list: ProductDetail) {
        let products = []
        if (!product_list || !Object.values(product_list).length) return
        products.push(
            Object.values(product_list).map((item, index) => (
                <Col xs={6} sm={6} lg={4} className="ProductDetailCard-Wrapper mb-2" key={`${index}-periodic-card-${item.id}`}>
                    <ProductDetailCard user={this.props.user} product_in_cart={this.props.product_in_cart} product_catalog={this.props.product_catalog} product_detail={item} />
                </Col>
            ))
        )
        return products
    }

}


const mapStateToProps = (state: AppState, ownProp: UserProp & ProductDetailProp & CartProp & ProductCatalogProp): UserStateProp & ProductDetailLinkStateProp & CartLinkStateProp & ProductCatalogLinkStateProp => ({
    user: state.user,
    product_detail: state.product_detail,
    product_in_cart: state.cart,
    product_catalog: state.product_catalog
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProp: UserProp & ProductDetailProp & CartProp & ProductCatalogProp): UserDispatchProp & ProductDetailLinkDispatchProp & CartLinkDispatchProp & ProductCatalogLinkDispatchProp => ({
    userStartLogin: bindActionCreators(userStartLogin, dispatch),
    userLogout: bindActionCreators(userRequestLogout, dispatch),
    getProductDetail: bindActionCreators(getProductDetail, dispatch),
    addProductInCart: bindActionCreators(addProductToCart, dispatch),
    removeProductInCart: bindActionCreators(addProductToCart, dispatch),
    clearProductInCart: bindActionCreators(clearProductInCart, dispatch),
    getProductInCart: bindActionCreators(addProductToCart, dispatch),
    getProductCatalog: bindActionCreators(getProductCatalog, dispatch)
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductDetailContainer);