import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap'
import './card.css'
import { ProductCatalog } from 'src/redux/Product/Catalog/types';
import StarRating from 'react-svg-star-rating'
import { getRandomInt, numberWithCommas } from 'src/middleware/tools';
import PurchaseModal from 'src/components/Modals/PurchaseSelection/PurchaseModal';
import { connect } from 'react-redux';
import { image_not_found } from 'src/definitions/Error';
import { redux, userCartProps } from 'src/redux/definition';

class ProductCatalogCard extends Component<userCartProps & { product_detail: ProductCatalog }, {}> {

    state = {
        purchase_selection_modal: false,
    }

    componentDidMount() { }

    render() {
        this.purchaseBtnClicked = this.purchaseBtnClicked.bind(this)
        var product = this.props.product_detail
        return (
            <div className="ProductCatalogCard">
                <Card className="text-left" onClick={(e: any) => this.linkToDetail(e)}>
                    <Card.Body className="">
                        <Card.Img className={product.common_title && product.common_title !== "-" ? "mb-2" : "mt-4 mb-2"} variant="top" src={this.props.product_detail.image_url ? this.props.product_detail.image_url + "" : image_not_found} />
                        <div className="mb-0 App-product-title text-truncate">{this.props.product_detail.title}</div>
                        <div className="mb-0 App-product-common-title text-truncate">{product.common_title && product.common_title !== "-" ? product.common_title : ""}</div>
                        <div className="mb-0 App-product-price">{`฿ ${this.props.product_detail.price ? `${numberWithCommas(this.props.product_detail.price.min)} - ${numberWithCommas(this.props.product_detail.price.max)}` : 0}`}</div>
                        <div className="pd-0 mb-2" style={{ fontSize: '0.8rem' }}>
                            <div className="ProductCatalogCard-star-wrapper d-inline">
                                <StarRating
                                    size={15}
                                    count={5}
                                    initialRating={4.5}
                                    isHalfRating={true}
                                    isReadOnly={true}
                                />
                            </div>
                            <div className="d-inline ml-2 font-weight-bold" style={{ fontSize: '0.7rem' }}>
                                {`(${getRandomInt(500)})`}
                            </div>
                        </div>
                        <Button variant="outline-light" className="w-100" onClick={(e: any) => this.purchaseBtnClicked(e)}>
                            สั่งซื้อ
                        </Button>
                    </Card.Body>
                </Card>
                <PurchaseModal user={this.props.user} product_in_cart={this.props.product_in_cart} toggleFunc={this.purchaseBtnClicked} display={this.state.purchase_selection_modal} product_detail={this.props.product_detail} />
            </div>
        )
    }

    purchaseBtnClicked(e?: Event) {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        this.setState({
            purchase_selection_modal: !this.state.purchase_selection_modal
        })
    }

    linkToDetail(e: Event) {
        e.preventDefault()
        window.location.href = `/product_detail?pid=${this.props.product_detail.id}`
    }

}

export default connect(
    redux.userCartState,
    redux.userCartDispatch
)(ProductCatalogCard);