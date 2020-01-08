import React, { Component } from 'react';
import { AppState, AppActions } from 'src/redux';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { UserProp, UserProps, UserStateProp, UserDispatchProp } from 'src/redux/User/types'
import { userStartLogin, userRequestLogout } from 'src/facades/Auth/UserAccountFacade';
import { BestSellCard } from 'src/components/Products/BestSell/card'
import { ReduxProductBestSell, ProductBestSellProps, ProductBestSellProp, ProductBestSellLinkStateProp, ProductBestSellLinkDispatchProp } from 'src/redux/Product/BestSell/types';
import { getProductBestSell } from 'src/facades/Products/ProductBestSellFacade';
import Carousel from 'react-multi-carousel';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import CONFIG from 'src/conf';

class BestSellContainer extends Component<UserProps & ProductBestSellProps, {}> {

    componentDidMount() { }

    render() {
        var BestSellerCards = this.createCard(this.props.product_best_sell)
        const CarouselButtonGroup = ({ next, previous, ...rest }: any) => {
            return (
                <div className="carousel-button-group">
                    <Button className="col-2 mr-3" onClick={() => previous()} >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Button>
                    <Button className="col-6" onClick={(e: any) => this.linkToCatalog(e)}>ดูทั้งหมด</Button>
                    <Button className="col-2 ml-2" onClick={() => next()} >
                        <FontAwesomeIcon icon={faArrowRight} />
                    </Button>
                </div>
            );
        };

        return (
            <div className="text-center mb-3 pt-3 BestSell-container">
                <div className="text-left pl-0 text-left header-wrapper">
                    <div className="header pl-4">สินค้าขายดี</div>
                </div>
                <div className="BestSellCard-box-wrapper">
                    <Carousel {...CONFIG.PRODUCT.BEST_SELL.CAROUSEL} className="" customButtonGroup={<CarouselButtonGroup />}>
                        {BestSellerCards ? BestSellerCards : <div />}
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
                <div className={`BestSellCard-Wrapper BestSellCard-${index}`} key={`${index}-best-card-${item.id}`}>
                    <BestSellCard product_detail={item} />
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
)(BestSellContainer);