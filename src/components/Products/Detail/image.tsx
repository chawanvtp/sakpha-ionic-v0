import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap'
import './card.css'
import { image_not_found } from 'src/definitions/Error';

export class ProductDetailImages extends Component<{ images_list: [string] }, {}> {

    state = {
        index: 0,
        direction: null
    }

    componentDidMount() { }

    handleSelect = (selectedIndex: any) => { };

    render() {
        this.createItems = this.createItems.bind(this)
        var items = this.createItems(this.props.images_list)
        return (
            <div className="ProductDetailImages">
                <Carousel onSelect={(e: any) => this.handleSelect(e)}>
                    {items}
                </Carousel>
            </div>
        )
    }

    createItems(images_list: [string]) {
        let images = []
        images.push(
            (images_list).map((item, index) => (
                <Carousel.Item key={`ProductDetailImages-index-${index}`}>
                    <img
                        onError={(e: any) => { e.target.onerror = null; e.target.src = image_not_found }}
                        className="d-block w-100"
                        src={this.props.images_list[index]}
                        alt="Third slide"
                    />
                </Carousel.Item>
            ))
        )
        if (images_list.length <= 0) {
            images.push(
                <Carousel.Item key={`ProductDetailImages-index-${0}`}>
                    <img
                        onError={(e: any) => { e.target.onerror = null; e.target.src = image_not_found }}
                        className="d-block w-100"
                        src={image_not_found}
                        alt="Third slide"
                    />
                </Carousel.Item>
            )
        }
        return images
    }

}