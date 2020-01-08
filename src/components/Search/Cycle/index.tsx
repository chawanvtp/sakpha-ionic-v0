import React, { Component } from "react"
import './index.css'
import { ButtonGroup, Button } from "react-bootstrap"
import { PRODUCT_CYCLE } from "src/definitions/Products/cycle"
import { connect } from "react-redux"
import { formatProductSearchParams, getParam } from "src/middleware/tools"
import { redux, userCartCatalogProps } from 'src/redux/definition';

class SearchCycleContainer extends Component<userCartCatalogProps & { btnClicked?: Function }, {}> {

    state = {
        search_target: formatProductSearchParams(getParam("search_target") + "").query_message
    }

    componentDidMount() { }

    render() {
        var Buttons = this.createButton(PRODUCT_CYCLE)
        return (
            <div className="header-wrapper">
                <div className="text-left pl-3 header">สินค้าตามช่วงเพาะปลูก</div>
                <ButtonGroup aria-label="Basic example" style={{ color: "#000000" }} className="mb-1 mt-1 Cycle-btn-wrapper">
                    {Buttons}
                </ButtonGroup>
            </div>
        )
    }

    onPeriodicTargetClicked(e: any) {
        this.setState({ search_target: e.target.value })
    }

    createButton(item_list: any) {
        let buttons = []
        if (!Object.values(item_list) || Object.values(item_list).length <= 0) return
        buttons.push(
            (Object.values(item_list)).map((item: any, index: any) => (
                <Button
                    key={`${item}-btn-${index}`}
                    variant="outline-light"
                    className={this.state.search_target !== item ? "Cycle-btn" : "Cycle-btn-selected"}
                    onClick={() => this.props.btnClicked ? this.btnClicked("cycle_" + item, true) : console.error("Could not find function.")}
                    value={item}
                >
                    {item}
                </Button>
            ))
        )
        return buttons
    }

    btnClicked(search_target: string, reset?: boolean) {
        this.props.btnClicked ?
            this.props.btnClicked(search_target, reset ? reset : 0) : console.error("Could not find function.")
        this.setState({ search_target: formatProductSearchParams(search_target).query_message })
    }
}


export default connect(
    redux.userCartCatalogState,
    redux.userCartCatalogDispatch
)(SearchCycleContainer);