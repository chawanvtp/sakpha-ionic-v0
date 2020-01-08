import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap'
import './card.css'
import { ProductDetail } from 'src/redux/Product/Detail/types';
import StarRating from 'react-svg-star-rating'
import { getRandomInt, numberWithCommas } from 'src/middleware/tools';
import PurchaseModal from 'src/components/Modals/PurchaseSelection/PurchaseModal';
import { ProductDetailImages } from './image';
import { connect } from 'react-redux';
import TagsContainer from 'src/components/Tag';
import { userCartCatalogProps, redux } from 'src/redux/definition';

class ProductDetailCard extends Component<userCartCatalogProps & { product_detail: ProductDetail }, {}> {

    state = {
        purchase_selection_modal: false,
    }

    componentDidMount() { }

    render() {
        this.purchaseBtnClicked = this.purchaseBtnClicked.bind(this)
        return (
            <div className="ProductDetailCard">
                <Card className="">
                    <Card.Body className="">

                        <ProductDetailImages images_list={this.props.product_detail.image_url} />

                        <div className="mb-0 App-product-price price">{`฿ ${this.props.product_detail.price ? `${numberWithCommas(this.props.product_detail.price.min)} - ${numberWithCommas(this.props.product_detail.price.max)}` : 0}`}</div>
                        <div className="mb-0 pd-0 App-product-title title text-truncate">{this.props.product_detail.title}</div>

                        {this.props.product_detail.common_title && this.props.product_detail.common_title !== "-" ?
                            <div className="mb-1 App-product-common-title common-title text-truncate">ชื่อสามัญ : {this.props.product_detail.common_title} </div>
                            :
                            ""
                        }
                        <div className="pd-0 mb-1" style={{ fontSize: '1rem' }}>
                            <div className="ProductDetailCard-star-wrapper d-inline">
                                <StarRating
                                    size={15}
                                    count={5}
                                    initialRating={4.5}
                                    isHalfRating={true}
                                    isReadOnly={true}
                                />
                            </div>
                            <div className="d-inline ml-2 font-weight-bold" style={{ fontSize: '0.8rem' }}>
                                {`(${getRandomInt(500)})`}
                            </div>
                        </div>

                        <div className="text-left pt-3">
                            <TagsContainer user={this.props.user} product_in_cart={this.props.product_in_cart} product_catalog={this.props.product_catalog} tags_list={this.props.product_detail.tags} />
                            {this.props.product_detail.detail.specific_info.chemical_group ?
                                <div>
                                    <h5 className="mt-3 font-weight-bolder">ข้อมูลผลิตภัณท์</h5>
                                    <div className="mb-3">สารสำคัญ : {this.props.product_detail.detail.specific_info.chemical_group}</div>
                                </div>
                                :
                                <div>
                                    <h5 className="mt-3 font-weight-bolder">ข้อมูลผลิตภัณท์</h5>
                                    <div className="mb-3">สูตร : {this.props.product_detail.detail.specific_info.primary_nutrient}</div>
                                </div>
                            }
                            <h6 className="mt-3 font-weight-bold">ประโยชน์</h6>
                            <div className="mb-3">{this.props.product_detail.detail.properties}</div>
                            <h6 className="mt-3 font-weight-bold">วิธีใช้</h6>
                            <div className="mb-3">{this.props.product_detail.detail.usage}</div>
                            <h6 className="mt-3 font-weight-bold">เลขทะเบียน</h6>
                            <div className="mb-3">{"1238-27"}</div>
                            <h6 className="mt-3 font-weight-bold">ข้อมูลผลิตภัณท์</h6>
                            <div className="mb-3">แบรนด์ : {this.props.product_detail.brand}</div>
                        </div>
                    </Card.Body>
                </Card>
                <div className="fixed-bottom w-100 purchase-button-wrapper">
                    <Button variant="warning" className="w-100 rounded-0 purchase-button" onClick={(e: any) => this.purchaseBtnClicked(e)}>
                        ค้นหาร้านค้า
                    </Button>
                </div>
                {this.state.purchase_selection_modal ?
                    <PurchaseModal user={this.props.user} product_in_cart={this.props.product_in_cart} toggleFunc={this.purchaseBtnClicked} display={this.state.purchase_selection_modal} product_detail={this.props.product_detail} />
                    :
                    ""
                }
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

}

export default connect(
    redux.userCartCatalogState,
    redux.userCartCatalogDispatch
)(ProductDetailCard);