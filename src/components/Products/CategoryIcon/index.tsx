import React, { Component } from 'react';
import { AppState, AppActions } from 'src/redux';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { UserProp, UserProps, UserStateProp, UserDispatchProp } from 'src/redux/User/types'
import { userStartLogin, userRequestLogout } from 'src/facades/Auth/UserAccountFacade';
import { Row, Col } from 'react-bootstrap'
import { CategoryIconCard } from 'src/components/Products/CategoryIcon/card'
import { ProductBestSellProps, ProductBestSellProp, ProductBestSellLinkStateProp, ProductBestSellLinkDispatchProp } from 'src/redux/Product/BestSell/types';
import { getProductBestSell } from 'src/facades/Products/ProductBestSellFacade';
import { CATEGORY_LIST_MOCK } from 'src/definitions/Products/category';

class CategoryIconContainer extends Component<UserProps & ProductBestSellProps, {}> {

    componentDidMount() { }

    render() {
        var CategoryIconCards = this.createCard(CATEGORY_LIST_MOCK)
        return (
            <div className="text-center mt-3 CategoryIconContainer">
                <div className="text-left pl-0 header-wrapper">
                    <div className="text-left pl-4 header">ผลิตภัณฑ์ทั้งหมด</div>
                </div>
                <div className="container">
                    <Row>
                        {CategoryIconCards}
                    </Row>
                </div>
            </div>
        )
    }

    createCard(category_list: Array<any>) {
        let products = []
        products.push(
            (category_list).map((item, index) => (
                <Col xs={6} sm={6} lg={4} className={`CategoryIconCard-Wrapper mb-4 CategoryIconCard-${index}`} key={`${index}-icon-card-${item.id}`}>
                    <CategoryIconCard category_name={item.name} category_key={item.key} category_image={item.image_url} />
                </Col>
            ))
        )
        return products
    }

}


const mapStateToProps = (state: AppState, ownProp: UserProp & ProductBestSellProp): UserStateProp & ProductBestSellLinkStateProp => ({
    user: state.user,
    product_best_sell: state.product_best_sell
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProp: UserProp & ProductBestSellProp): UserDispatchProp & ProductBestSellLinkDispatchProp => ({
    userStartLogin: bindActionCreators(userStartLogin, dispatch),
    userLogout: bindActionCreators(userRequestLogout, dispatch),
    getProductBestSell: bindActionCreators(getProductBestSell, dispatch)
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryIconContainer);