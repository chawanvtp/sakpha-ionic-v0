import React, { Component } from 'react';
import { AppState, AppActions } from 'src/redux';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { UserProp, UserProps, UserStateProp, UserDispatchProp } from 'src/redux/User/types'
import { userStartLogin, userRequestLogout } from 'src/facades/Auth/UserAccountFacade';
import './index.css'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class ProgressContainerVertical extends Component<UserProps & {}, {}> {

    state = {
        steps: [{ label: "ยืนยันคำสั่งซื้อ", content: "(สำเร็จ)" }, { label: "จัดเตรียมสินค้า", content: "(สำเร็จ)" }
            , { label: "จัดส่งสินค้า", content: "(กำลังดำเนินการ)" }, { label: "รับสินค้า", content: "(กำลังดำเนินการ)" }],
        activeStep: 2
    }

    componentDidMount() { }

    render() {
        return (
            <div>
                <Stepper activeStep={this.state.activeStep} orientation="vertical" className="Stepper">
                    {this.state.steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel>
                                <div>{step.label}</div>
                                <div>{this.state.activeStep >= index ? "(สำเร็จ)" : "(กำลังดำเนินการ)"}</div>
                            </StepLabel>
                            <StepContent>
                                <Typography>{"11-11-2562 10:55:00"}</Typography>
                                <div className="">
                                    <div>
                                        <Button
                                            disabled={this.state.activeStep === 0}
                                            onClick={() => this.handleBack()}
                                            className={"classes.button"}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => this.handleNext()}
                                            className={"classes.button"}
                                        >
                                            {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {this.state.activeStep === this.state.steps.length && (
                    <Paper square={true} elevation={0} className={"paper"}>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        <Button onClick={() => this.setState({ activeStep: 0 })} className={"classes.button"}>
                            Reset
                        </Button>
                    </Paper>
                )}
            </div>
        )
    }

    handleBack() {
        this.setState({
            activeStep: this.state.activeStep - 1
        })
    }

    handleNext() {
        this.setState({
            activeStep: this.state.activeStep + 1
        })
    }
}

const mapStateToProps = (state: AppState, ownProp: UserProp): UserStateProp => ({
    user: state.user
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProp: UserProp): UserDispatchProp => ({
    userStartLogin: bindActionCreators(userStartLogin, dispatch),
    userLogout: bindActionCreators(userRequestLogout, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProgressContainerVertical);