import React, { Component } from 'react';
import './index.css';
import { version } from '../../../package.json'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { PromotionPageV1 } from 'src/components/Promotions/v1/PromotionPageV1';
import { redux, userCartProps } from 'src/redux/definition';

class DefaultLandingPage extends Component<userCartProps & RouteComponentProps, {}> {

  componentDidMount() { }

  render() {
    this.userLogin = this.userLogin.bind(this)
    return (
      <div className="Landing-Page">
        <p className="app-version">{version}</p>
        <PromotionPageV1 />
      </div>
    )
  }

  async userLogin(mobile: string, password: string) {
    var isSuccess = await this.props.userStartLogin(mobile, password)
    if (isSuccess !== undefined) { alert(isSuccess) }
  }
}

export default connect(
  redux.userCartState,
  redux.userCartDispatch
)(DefaultLandingPage);