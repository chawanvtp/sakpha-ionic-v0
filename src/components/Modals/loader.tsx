import React, { Component } from 'react'
import { css } from "@emotion/core";
import ClockLoader from "react-spinners/ClockLoader";
import './index.css';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: rgb(247, 148, 31);
  background-color: rgb(247, 148, 31, 0.5);
  box-shadow: inset 0px 0px 0px 2px rgb(247, 148, 31);
`;

export class LoaderOverlay extends Component<{ loading?: boolean, toggleFunc?: Function }>{

    state = {
        loading: this.props.loading ? this.props.loading : false
    }

    componentWillReceiveProps(nextProps: any) {
        if ((nextProps.loading !== undefined || null) && nextProps.loading !== this.state.loading) {
            this.setState({ loading: nextProps.loading })
        }
    }

    render() {
        return (
            <div className={(this.state.loading ? "loading" : "unload") + " LoaderOverlay-wrapper"} onClick={() => this.selfToggle()}>
                <ClockLoader
                    css={override}
                    size={150}
                    color={"#123abc"}
                    loading={this.state.loading ? this.state.loading : false}
                />
                กรุณารอสักครู่ค่ะ ...
            </div>
        );
    }

    selfToggle() {
        if (!this.props.toggleFunc) return
        this.props.toggleFunc({ target: { name: "loading", value: !this.state.loading } })
    }
}