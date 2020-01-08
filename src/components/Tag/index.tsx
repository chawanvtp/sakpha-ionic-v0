import React, { Component } from 'react'
import { Badge } from 'react-bootstrap'
import './index.css'
import { connect } from 'react-redux';
import { redux, userCartCatalogProps } from 'src/redux/definition';
import DefaultProductCatalogModal from 'src/components/Products/Catalog/Modal';

class TagsContainer extends Component<userCartCatalogProps & { tags_list: any[] }, {}>{

    state = {
        show_modal: false,
        search_target: ""
    }

    render() {
        this.modalBtnClicked = this.modalBtnClicked.bind(this)
        return (
            <div className="TagsContainer">
                <div className="header">ใช้ได้กับสิ่งต่อไปนี้</div>
                {(this.props.tags_list).map((value, index) => (
                    <Badge variant={"warning"} key={`tag-${index}-${value}`} className="mr-1 badge" onClick={() => this.modalBtnClicked(value)}>
                        {value}
                    </Badge>
                ))}
                <DefaultProductCatalogModal user={this.props.user} product_in_cart={this.props.product_in_cart} product_catalog={this.props.product_catalog} search_target={this.state.search_target} toggleFunc={this.modalBtnClicked} display={this.state.show_modal} />
            </div>
        )
    }

    linkToCatalog(search_target: string) {
        window.location.href = `/catalog?search_target=${search_target}`;
    }

    modalBtnClicked(search_target: string, e?: Event) {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        this.setState({
            show_modal: !this.state.show_modal,
            search_target: search_target
        })
    }
}

export default connect(
    redux.userCartCatalogState,
    redux.userCartCatalogDispatch
)(TagsContainer);