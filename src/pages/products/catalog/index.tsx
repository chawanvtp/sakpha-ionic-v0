import React, { Component } from 'react';
import 'src/index.css';
import { connect } from 'react-redux';
import { InputGroup, FormControl, Button, Dropdown } from 'react-bootstrap';
import ProductCatalogContainer from 'src/components/Products/Catalog';
import NavigationBarTop from 'src/components/NavigationBars/Top';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { getParam } from 'src/middleware/tools';
import { baseURL } from 'src/definitions/ApiConfig';
import CONFIG from 'src/conf';
import { rootProps, redux } from 'src/redux/definition';
import SearchCycleContainer from 'src/components/Search/Cycle';
import { image_not_found } from 'src/definitions/Error';
import { LoaderOverlay } from 'src/components/Modals/loader';

class DefaultProductCatalogPage extends Component<rootProps, {}> {

  state = {
    search_target: getParam("search_target"),
    hints: "",
    hints_toggle: false,
    next: 0,
    prev: 0,
    total: 0,
    offset: 0,
    limit: CONFIG.PRODUCT.CATALOG.LIMIT,
    loading: false
  }

  componentDidMount() {
    this.searchProduct(this.state.search_target ? this.state.search_target : "")
  }

  render() {
    this.searchProduct = this.searchProduct.bind(this)
    return (
      <div className="">
        <div className="container text-center mb-3">
          <div className="col-12"><h4>รายการสินค้า</h4></div>
          <div className="col-12">
            <InputGroup className="mb-3">
              <FormControl
                className="text-center"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                placeholder="หญ้า แมลง ปุ๋ย ..."
                onChange={(e: any) => this.handleSearchTyped(e)}
              />
              <Dropdown.Menu show={this.state.hints_toggle}>
                {this.state.hints}
              </Dropdown.Menu>
              <InputGroup.Append>
                <Button variant="dark" onClick={() => this.searchProduct(this.state.search_target ? this.state.search_target : "", true)}>
                  ค้นหา <FontAwesomeIcon className="ml-2" icon={faSearch} />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </div>

        <NavigationBarTop user={this.props.user} product_count={this.props.product_in_cart.products.length} />
        <SearchCycleContainer user={this.props.user} product_in_cart={this.props.product_in_cart} product_catalog={this.props.product_catalog} btnClicked={this.searchProduct} />

        {(this.props.product_catalog.products).length ?
          <ProductCatalogContainer user={this.props.user} product_in_cart={this.props.product_in_cart} product_catalog={this.props.product_catalog} />
          :
          <div className="pt-5"><img className="mt-4 rounded mx-auto d-block" src={require("../../../images/myCart_empty.png")} alt="emptyCart" onClick={() => window.location.href = "/"} onError={(e: any) => { e.target.onerror = null; e.target.src = image_not_found }} /></div>
        }

        {(!this.state.total) || (this.state.offset >= this.state.total) ?
          <div className="w-100 text-center">...</div>
          :
          <Button className="w-100 text-center bg-transparent mb-2 text-dark" variant={"outline-dark"} onClick={() => this.searchProduct(this.state.search_target ? this.state.search_target : "")}>
            เพิ่มเติม
          </Button>
        }

        <LoaderOverlay loading={this.state.loading} toggleFunc={this.onInputChange} />

      </div>
    )
  }

  async userLogin(mobile: string, password: string) {
    var isSuccess = await this.props.userStartLogin(mobile, password)
    if (isSuccess !== undefined) { alert(isSuccess) }
  }

  onInputChange = (event: any) => {
    if (!event || !event.target || (event.target.value === undefined || null) || !event.target.name) return
    this.setState({ [event.target.name]: event.target.value });
  }

  async searchProduct(search_target: string, reset?: boolean) {
    if (search_target.length <= 0) return
    var isSuccess = await this.props.getProductCatalog(search_target, reset ? 0 : this.state.offset, this.state.limit)
    if (!isSuccess) { return }
    else {
      this.setState({ loading: true })
      var new_offset = (this.state.offset + this.state.limit) < isSuccess.total ? this.state.offset + this.state.limit : isSuccess.total
      if (search_target !== this.state.search_target) new_offset = 0
      this.setState({
        search_target,
        total: isSuccess.total,
        next: isSuccess.next,
        prev: isSuccess.prev,
        offset: new_offset,
        hints_toggle: false,
        loading: false
      })
    }
  }

  handleHints(keyword: string) {
    if ((keyword === "") || keyword.length < 2) return
    fetch(`${baseURL}/tags/search/${keyword}/autocomplete`)
      .then(res => res.json())
      .then((result) => {
        result.tags.length > 0 ? this.createHints(result.tags) : console.error(result.tags)
      }, (error) => {
        console.error('error: ', error)
      })
  }

  handleSearchTyped(e?: any) {
    if (!e) return
    e.preventDefault()
    this.handleHints(e.target.value)
    this.setState({ search_target: e.target.value, hints_toggle: false })
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
    this.setState({ hints: HintsList, hints_toggle: true })
  }

  handleHintClicked(target: string) {
    this.setState({ search_target: target })
    window.location.href = "catalog?search_target=" + target
  }

}

export default connect(
  redux.rootState,
  redux.rootDispatch
)(DefaultProductCatalogPage);