import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap'
import './card.css'
import { ProductCatalog } from 'src/redux/Product/Catalog/types';
import StarRating from 'react-svg-star-rating'
import { getRandomInt } from 'src/middleware/tools';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export class BestSellCard extends Component<{ product_detail: ProductCatalog }, {}> {

    componentDidMount() { }

    render() {
        var product = this.props.product_detail
        return (
            <div className="BestSellCard">
                <Card className="text-left" onClick={(e: any) => this.linkToDetail(e)}>
                    <Card.Body className="">
                        <div className="BestSell-Icon-Wrapper">
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <Card.Img className={product.common_title && product.common_title !== "-" ? "mb-2" : "mt-4 mb-2"} variant="top" src={this.props.product_detail.image_url + ""} />
                        <div className="mb-0 App-product-title text-truncate">{this.props.product_detail.title}</div>
                        <div className="mb-0 App-product-common-title text-truncate">{product.common_title && product.common_title !== "-" ? product.common_title : ""}</div>
                        <div className="pd-0 mb-2" style={{ fontSize: '0.8rem' }}>
                            <div className="BestSellCard-star-wrapper">
                                <StarRating
                                    size={15}
                                    count={5}
                                    initialRating={4.5}
                                    isHalfRating={true}
                                    isReadOnly={true}
                                />
                            </div>
                            <div className="font-weight-bold" style={{ fontSize: '0.7rem' }}>
                                {`(${getRandomInt(500)})`}
                            </div>
                        </div>
                        <Button variant="outline-light" className="w-100" onClick={(e: any) => this.linkToDetail(e)}>
                            ดูข้อมูล
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }

    linkToDetail(e: Event) {
        e.preventDefault()
        window.location.href = `/product_detail?pid=${this.props.product_detail.id}`
    }

}