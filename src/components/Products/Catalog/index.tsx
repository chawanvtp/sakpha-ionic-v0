import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap'
import ProductCatalogCard from 'src/components/Products/Catalog/card'
import { ReduxProductCatalog } from 'src/redux/Product/Catalog/types';
import { redux, userCartCatalogProps } from 'src/redux/definition';
import { image_not_found } from 'src/definitions/Error';

class ProductCatalogContainer extends Component<userCartCatalogProps, {}> {

    componentDidMount() { }

    componentWillReceiveProps(props: any) { }

    render() {
        var ProductCatalogCards = this.createCard(this.props.product_catalog)
        return (
            <div className="container text-center mt-1" style={{ maxWidth: "100%" }}>
                <Row>
                    {ProductCatalogCards}
                </Row>
            </div>
        )
    }

    createCard(product_list: ReduxProductCatalog) {
        let products = []
        if (!product_list || !product_list.products.length || !product_list.products[0]) return [<img className="mt-4 rounded mx-auto d-block" src={require("../../../images/myCart_empty.png")} alt="emptyCart" onClick={() => window.location.href = "/"} key={"product_list-null-00"} onError={(e: any) => { e.target.onerror = null; e.target.src = image_not_found }} />]
        products.push(
            (product_list.products).map((item, index) => (
                <Col xs={6} sm={6} lg={4} className="ProductCatalogCard-Wrapper mb-1" key={`${index}-periodic-card-${item.id}`}>
                    <ProductCatalogCard user={this.props.user} product_in_cart={this.props.product_in_cart} product_detail={item} />
                </Col>
            ))
        )
        return products
    }

}

export default connect(
    redux.userCartCatalogState,
    redux.userCartCatalogDispatch
)(ProductCatalogContainer);