import React, { Component } from 'react';
import { AppState, AppActions } from 'src/redux';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { UserProp, UserProps, UserStateProp, UserDispatchProp } from 'src/redux/User/types'
import { userStartLogin, userRequestLogout } from 'src/facades/Auth/UserAccountFacade';
import { ReduxProductBestSell, ProductBestSellProps, ProductBestSellProp, ProductBestSellLinkStateProp, ProductBestSellLinkDispatchProp } from 'src/redux/Product/BestSell/types';
import { getProductBestSell } from 'src/facades/Products/ProductBestSellFacade';
import Carousel from 'react-multi-carousel';
import { NewsCard } from './card';
import { NEWS_CAROUSEL_CONFIG } from 'src/definitions/News';

class NewsContainer extends Component<UserProps & ProductBestSellProps, {}> {

    componentDidMount() { }

    render() {
        var NewsCards = this.createCard(this.props.product_best_sell)
        return (
            <div className="container text-center News-container">
                <div className="NewsCard-box-wrapper">
                    <Carousel {...NEWS_CAROUSEL_CONFIG} className="">
                        {NewsCards ? NewsCards : <div />}
                    </Carousel>
                </div>
            </div>
        )
    }

    createCard(product_list: ReduxProductBestSell) {
        let products = []
        if (!product_list || !product_list.products.length) return
        products.push(
            (product_list.products).map((item, index) => (
                <div className={`NewsCard-Wrapper NewsCard-${index}`} key={`${index}-news-card-${item.id}`}>
                    <NewsCard product_detail={item} />
                </div>
            ))
        )
        return products
    }

    linkToCatalog(e: Event) {
        e.preventDefault()
        window.location.href = `/catalog?search_target=bestSeller_${"10"}`;
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
)(NewsContainer);