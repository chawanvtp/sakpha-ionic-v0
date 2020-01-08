import React, { Component } from 'react';
import { AppState, AppActions } from 'src/redux';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userStartLogin, userRequestLogout } from 'src/facades/Auth/UserAccountFacade';
import { ButtonGroup, Button } from 'react-bootstrap'
import { ProductCycleCard } from './card'
import { UserProp, UserProps, UserStateProp, UserDispatchProp } from 'src/redux/User/types'
import { ProductCycleProps, ProductCycleProp, ProductCycleLinkStateProp, ProductCycleLinkDispatchProp, ReduxProductCycle } from 'src/redux/Product/Cycle/types';
import { getProductCycle } from 'src/facades/Products/ProductPeriodicAdviseFacade';
import { PRODUCT_CYCLE } from 'src/definitions/Products/cycle';
import CONFIG from 'src/conf';
import Carousel from 'react-multi-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

class ProductCycleContainer extends Component<UserProps & ProductCycleProps, {}> {

    state = {
        search_target: PRODUCT_CYCLE.GRASS_01
    }

    componentDidMount() { }

    render() {
        this.userLogin = this.userLogin.bind(this)
        this.onPeriodicTargetClicked = this.onPeriodicTargetClicked.bind(this)
        var PeriodicCards = this.createCards(this.props.product_cycle)

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
            <div className="text-center ProductCycle-Container">

                <div className="header-wrapper">
                    <div className="text-left pl-3 header">สินค้าตามช่วงเพาะปลูก</div>
                    <ButtonGroup aria-label="Basic example" style={{ color: "#000000" }} className="mb-1 mt-1 ProductCycleCard-Btn-Wrapper">
                        <Button variant="outline-light" className={this.state.search_target !== PRODUCT_CYCLE.GRASS_01 ? "ProductCycleCard-btn" : "ProductCycleCard-btn-selected"} onClick={this.onPeriodicTargetClicked} value={PRODUCT_CYCLE.GRASS_01}>คุมหญ้า</Button>
                        <Button variant="outline-light" className={this.state.search_target !== PRODUCT_CYCLE.GRASS_02 ? "ProductCycleCard-btn" : "ProductCycleCard-btn-selected"} onClick={this.onPeriodicTargetClicked} value={PRODUCT_CYCLE.GRASS_02}>แตกกอ</Button>
                        <Button variant="outline-light" className={this.state.search_target !== PRODUCT_CYCLE.GRASS_03 ? "ProductCycleCard-btn" : "ProductCycleCard-btn-selected"} onClick={this.onPeriodicTargetClicked} value={PRODUCT_CYCLE.GRASS_03}>ตั้งท้อง</Button>
                        <Button variant="outline-light" className={this.state.search_target !== PRODUCT_CYCLE.GRASS_04 ? "ProductCycleCard-btn" : "ProductCycleCard-btn-selected"} onClick={this.onPeriodicTargetClicked} value={PRODUCT_CYCLE.GRASS_04}>ออกรวง</Button>
                    </ButtonGroup>
                </div>

                <div className="mb-2 text-center border pb-2 pt-2 ProductCycleCard-box-wrapper">
                    <Carousel {...CONFIG.PRODUCT.CYCLE.CAROUSEL} className="" customButtonGroup={<CarouselButtonGroup />} >
                        {PeriodicCards ? PeriodicCards : <div />}
                    </Carousel>
                </div>
            </div>
        )
    }

    async userLogin(mobile: string, password: string) {
        var isSuccess = await this.props.userStartLogin(mobile, password)
        if (isSuccess !== undefined) {
            alert(isSuccess)
        }
    }

    createCards(product_list: ReduxProductCycle) {
        let products = []
        if (!product_list || !product_list.products.length) return
        products.push(
            (product_list.products).map((item, index) => (
                <div className={`ProductCycleCard-Wrapper ProductCycleCard-${index}`} key={`${index}-periodic-card-${item.id}`}>
                    <ProductCycleCard product_detail={item} />
                </div>
            ))
        )
        return products
    }

    onPeriodicTargetClicked(e: any) {
        this.setState({
            search_target: e.target.value
        })
        this.searchProduct(e.target.value)
    }

    async searchProduct(search_target: string) {
        var PriodicAdvise = await this.props.getProductCycle(search_target, 10)
        if (!PriodicAdvise) { return }
    }

    linkToCatalog(e: Event) {
        e.preventDefault()
        window.location.href = `/catalog?search_target=cycle_${this.state.search_target}`;
    }

}

const mapStateToProps = (state: AppState, ownProp: UserProp & ProductCycleProp): UserStateProp & ProductCycleLinkStateProp => ({
    user: state.user,
    product_cycle: state.product_cycle
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProp: UserProp & ProductCycleProp): UserDispatchProp & ProductCycleLinkDispatchProp => ({
    userStartLogin: bindActionCreators(userStartLogin, dispatch),
    userLogout: bindActionCreators(userRequestLogout, dispatch),
    getProductCycle: bindActionCreators(getProductCycle, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductCycleContainer);