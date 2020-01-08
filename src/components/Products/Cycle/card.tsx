import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap'
import './card.css'
import { ProductCatalog } from 'src/redux/Product/Catalog/types';
import { numberWithCommas } from 'src/middleware/tools';
import { image_not_found } from 'src/definitions/Error';

export class ProductCycleCard extends Component<{ product_detail: ProductCatalog }, {}> {

    componentDidMount() { }

    render() {
        return (
            <div className="ProductCycleCard">
                <Card className="text-left" onClick={(e: any) => this.linkToDetail(e)}>
                    <Card.Body className="">
                        <Card.Img className="mb-2" variant="top" src={this.props.product_detail.image_url ? this.props.product_detail.image_url + "" : image_not_found} />
                        <div className="mb-0 App-product-title text-truncate">{this.props.product_detail.title}</div>
                        <div className="mb-0 App-product-common-title text-truncate">{this.props.product_detail.common_title ? this.props.product_detail.common_title : "-"}</div>
                        <div className="mb-0 App-product-price text-truncate">{`฿ ${this.props.product_detail.price ? `${numberWithCommas(this.props.product_detail.price.min)} - ${numberWithCommas(this.props.product_detail.price.max)}` : 0}`}</div>
                        <Button variant="outline-light" className="mt-1 w-100" onClick={(e: any) => this.linkToDetail(e)}>
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