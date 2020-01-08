import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import NavigationBarTop from 'src/components/NavigationBars/Top';
import ProductDetailContainer from 'src/components/Products/Detail';
import { getParam } from 'src/middleware/tools';
import { rootProps, redux } from 'src/redux/definition';

class DefaultProductDetailPage extends Component<rootProps, {}> {

  state = {
    search_target: getParam("pid")
  }

  componentDidMount() {
    this.searchProduct(this.state.search_target ? this.state.search_target : "")
  }

  render() {
    return (
      <div className="ProductDetailPage">
        <div className="mb-3">
          {this.props.product_detail.title ?
            <ProductDetailContainer user={this.props.user} product_detail={this.props.product_detail} product_in_cart={this.props.product_in_cart} product_catalog={this.props.product_catalog} />
            : ""
          }
        </div>
        <NavigationBarTop user={this.props.user} product_count={this.props.product_in_cart.products.length} />
      </div>
    )
  }

  async searchProduct(search_target: string) {
    if (search_target.length <= 0) return
    var isSuccess = await this.props.getProductDetail(search_target)
    if (!isSuccess) { return }
  }

  async userLogin(mobile: string, password: string) {
    var isSuccess = await this.props.userStartLogin(mobile, password)
    if (isSuccess !== undefined) { alert(isSuccess) }
  }

}

export default connect(
  redux.rootState,
  redux.rootDispatch
)(DefaultProductDetailPage);