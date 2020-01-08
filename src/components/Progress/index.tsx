import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';
import './index.css';

export class ProgressContainer extends Component<{ steps: string[], now: number, onElementClicked: Function }, {}>{

    state = {
        steps: this.props.steps,
        now: this.props.now,
        percentEach: (100 / (this.props.steps.length))
    }

    UNSAFE_componentWillReceiveProps(nextProp: any) {
        this.setState({
            now: nextProp.now
        })
    }

    render() {
        return (
            <div className="text-center ProgressBar-Wrapper">
                <ProgressBar>
                    {
                        this.props.steps.map((label, index) =>
                            <ProgressBar
                                key={index}
                                className={"w-100 element"}
                                onClick={() => this.props.onElementClicked({ target: { name: "current_step", value: index + 1 } })}
                                now={this.state.now >= index + 1 ? this.state.percentEach : 0}
                                label={(<div className={this.state.now === index + 1 ? "label active" : "label"}>{label}</div>)}
                            />
                        )
                    }
                </ProgressBar>
            </div>
        )
    }
}