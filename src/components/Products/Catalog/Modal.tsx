import React, { Component } from 'react';
import 'src/index.css';
import './card.css';
import { connect } from 'react-redux';
import { InputGroup, FormControl, Button, Dropdown, ButtonToolbar, Modal, Badge } from 'react-bootstrap';
import ProductCatalogContainer from 'src/components/Products/Catalog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { baseURL } from 'src/definitions/ApiConfig';
import { redux, userCartCatalogProps } from 'src/redux/definition';
import { image_not_found } from 'src/definitions/Error';

class DefaultProductCatalogModal extends Component<userCartCatalogProps & { search_target: string, toggleFunc: Function, display: boolean }, {}> {

    state = {
        search_target: this.props.search_target,
        hints: "",
        hints_toggle: false,
        lgShow: this.props.display
    }

    componentDidMount() {
        this.searchProduct(this.state.search_target ? this.state.search_target : "")
    }

    UNSAFE_componentWillReceiveProps(nextProps: any) {
        this.setState({
            lgShow: nextProps.display,
            search_target: nextProps.search_target
        })
        if (this.state.search_target !== nextProps.search_target) this.searchProduct(nextProps.search_target)
    }

    render() {
        return (
            <ButtonToolbar>
                <Modal
                    size="xl"
                    show={this.state.lgShow}
                    onHide={() => this.props.toggleFunc("")}
                    aria-labelledby="example-modal-sizes-title-lg"
                    dialogClassName="Catalog-Modal"
                >
                    <Modal.Header closeButton={true} className="text-center">
                        <Modal.Title id="example-modal-sizes-title-lg" className="w-100 pl-3">
                            <Badge variant="success" className="header-badge">{this.props.search_target}</Badge>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: "transparent" }}>
                        <div className="">
                            <div className="container text-center mt-3 mb-3">
                                <div className="col-12">
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            className="text-center"
                                            aria-label="Default"
                                            aria-describedby="inputGroup-sizing-default"
                                            placeholder="หญ้า แมลง ปุ๋ย ..."
                                            defaultValue={this.state.search_target}
                                            onFocus={(e: any) => e.target.value = ''}
                                            onBlur={(e: any) => e.target.value = this.state.search_target + ""}
                                            onChange={(e: any) => this.handleSearchTyped(e)}
                                        />
                                        <Dropdown.Menu show={this.state.hints_toggle}>
                                            {this.state.hints}
                                        </Dropdown.Menu>
                                        <InputGroup.Append>
                                            <Button variant="dark" onClick={() => this.searchProduct(this.state.search_target ? this.state.search_target : "")}>
                                                ค้นหา <FontAwesomeIcon className="ml-2" icon={faSearch} />
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </div>
                            </div>

                            {(this.props.product_catalog.products).length ?
                                <ProductCatalogContainer user={this.props.user} product_in_cart={this.props.product_in_cart} product_catalog={this.props.product_catalog} />
                                :
                                <div className="pt-5"><img className="mt-4 rounded mx-auto d-block" src={require("../../../images/myCart_empty.png")} alt="emptyCart" onClick={() => window.location.href = "/"} onError={(e: any) => { e.target.onerror = null; e.target.src = image_not_found }} /></div>
                            }
                        </div>
                    </Modal.Body>
                </Modal>
            </ButtonToolbar>
        )
    }

    async userLogin(mobile: string, password: string) {
        var isSuccess = await this.props.userStartLogin(mobile, password)
        if (isSuccess !== undefined) { alert(isSuccess) }
    }

    async searchProduct(search_target: string) {
        if (search_target.length <= 0) return
        var isSuccess = await this.props.getProductCatalog(`%23${search_target}`)
        if (!isSuccess) { return }
        this.setState({
            hints_toggle: false
        })
    }

    handleHints(keyword: string) {
        if ((keyword === "") || keyword.length < 2) return
        fetch(`${baseURL}/tags/search/${keyword}/autocomplete`)
            .then(res => res.json())
            .then((result) => {
                result.tags.length > 0 ? this.createHints(result.tags) : console.error(result.tags)
            },
                (error) => {
                    console.error('error: ', error)
                })
    }

    handleSearchTyped(e: any) {
        e.preventDefault()
        this.handleHints(e.target.value)
        this.setState({
            search_target: e.target.value,
            hints_toggle: false
        })
    }

    createHints(tags: any) {
        let HintsList = []
        for (let i = 0; i < Object.keys(tags).length; i++) {
            HintsList.push(
                <Dropdown.Item eventKey={tags[i]} key={"hintTag-" + i} onSelect={(e: any) => this.handleHintClicked(e)}>
                    {tags[i]}
                </Dropdown.Item>
            )
        }
        this.setState({
            hints: HintsList,
            hints_toggle: true
        })
    }

    handleHintClicked(target: string) {
        this.setState({
            search_target: target
        })
        this.UNSAFE_componentWillReceiveProps({ lgShow: true, search_target: target })
    }


}

export default connect(
    redux.userCartCatalogState,
    redux.userCartCatalogDispatch
)(DefaultProductCatalogModal);