import React, { Component } from 'react';
import './home.css';
import { version } from '../../../package.json'
import { connect } from 'react-redux';
import SearchContainer from 'src/components/Search/Container/index'
import BestSellContainer from 'src/components/Products/BestSell'
import ProductCycleContainer from 'src/components/Products/Cycle'
import CategoryIconContainer from 'src/components/Products/CategoryIcon';
import NavigationBarTop from 'src/components/NavigationBars/Top';
import { rootProps, redux } from 'src/redux/definition';
import NewsContainer from 'src/components/News';
import CONFIG from 'src/conf';

class HomePage extends Component<rootProps, {}> {

  componentDidMount() {
    this.searchProduct("หญ้า")
  }

  render() {
    this.userLogin = this.userLogin.bind(this)
    return (
      <div className="HomePage mb-5">
        <NavigationBarTop user={this.props.user} product_count={this.props.product_in_cart ? this.props.product_in_cart.products.length : 0} />
        <NewsContainer user={this.props.user} product_best_sell={this.props.product_best_sell} />
        {CONFIG.PRODUCT.ENABLE.CYCLE ? <ProductCycleContainer user={this.props.user} product_cycle={this.props.product_cycle} /> : ""}
        <SearchContainer user={this.props.user} product_in_cart={this.props.product_in_cart} product_catalog={this.props.product_catalog} />
        {CONFIG.PRODUCT.ENABLE.BEST_SELL ? <BestSellContainer user={this.props.user} product_best_sell={this.props.product_best_sell} /> : ""}
        {CONFIG.PRODUCT.ENABLE.CATEGORY ? <CategoryIconContainer user={this.props.user} product_best_sell={this.props.product_best_sell} /> : ""}
        <p className="app-version">{version}</p>
      </div>
    )
  }

  async userLogin(mobile: string, password: string) {
    var isSuccess = await this.props.userStartLogin(mobile, password)
    if (isSuccess !== undefined) {
      alert(isSuccess)
    }
  }

  async searchProduct(search_target: string) {
    var BestSell = await this.props.getProductBestSell("", 0)
    var PriodicAdvise = await this.props.getProductCycle(search_target, 0)
    if (!BestSell || !PriodicAdvise) { return }
  }

}

export default connect(
  redux.rootState,
  redux.rootDispatch
)(HomePage);