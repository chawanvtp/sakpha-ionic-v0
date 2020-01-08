import React, { Component } from 'react';
import { Card } from 'react-bootstrap'
import './card.css'

export class CategoryIconCard extends Component<{ category_name: String, category_key: String, category_image: String }, {}> {

    componentDidMount() { }

    render() {
        return (
            <div className="CategoryIconCard mt-2">
                <Card className="text-center" onClick={(e: any) => this.linkToCatalog(e)}>
                    <Card.Body className="">
                        <Card.Img className="" variant="top" src={require(`../../../images/icons/${this.props.category_image}`)} />
                    </Card.Body>
                </Card>
            </div >
        )
    }

    linkToCatalog(e: Event) {
        e.preventDefault()
        window.location.href = `/catalog?search_target=category_${this.props.category_key}`;
    }

}