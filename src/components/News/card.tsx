import React, { Component } from 'react';
import { Card } from 'react-bootstrap'
import './card.css'
import { ProductCatalog } from 'src/redux/Product/Catalog/types';

export class NewsCard extends Component<{ product_detail: ProductCatalog }, {}> {

    componentDidMount() { }

    render() {
        return (
            <div className="NewsCard">
                <Card className="text-left" onClick={(e: any) => console.error(e)}>
                    <Card.Body className="">
                        <Card.Img className={""} variant="top" src={require("src/images/news.png")} />
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