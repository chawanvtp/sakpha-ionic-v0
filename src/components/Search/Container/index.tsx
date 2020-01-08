import React, { Component } from 'react';
import { redux, userCartCatalogProps } from 'src/redux/definition';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { InputGroup, FormControl, Button, Dropdown } from 'react-bootstrap'
import './index.css';
import { API_TOOLS } from 'src/middleware/api';

class SearchContainer extends Component<userCartCatalogProps, {}> {

  state = {
    search_target: "",
    hints: "",
    hints_toggle: false,
  }

  componentDidMount() { }

  render() {
    this.searchBtnClicked = this.searchBtnClicked.bind(this)
    return (
      <div className="text-center pt-3 pb-3 SearchContainer">
        <div className="col-12 pl-4 text-left header">ค้นหาสินค้าจากชื่อ หรืออาการ ..</div>
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
          </InputGroup>
        </div>
        <div className="col-12">
          <Button variant="outline-success" className="search-btn" onClick={() => this.searchBtnClicked()}>
            ค้นหา
            <FontAwesomeIcon className="ml-2" icon={faSearch} />
          </Button>
        </div>
      </div>
    )
  }

  searchBtnClicked() {
    if (this.state.search_target.length <= 0) return
    window.location.href = `/catalog?search_target=${this.state.search_target}`
  }

  async handleHints(keyword: string) {
    if ((keyword === "") || keyword.length < 2) return
    var hints = await API_TOOLS.getSearchHintByKeyword(keyword)
    hints.length > 0 ? this.createHints(hints) : console.error("NO Hints")
  }

  handleSearchTyped(e: any) {
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
  redux.userCartCatalogState,
  redux.userCartCatalogDispatch
)(SearchContainer);