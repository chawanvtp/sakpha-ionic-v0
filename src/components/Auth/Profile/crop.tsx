import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Badge } from 'react-bootstrap';
import './index.css'
import { validateInput } from 'src/middleware/tools';
import { getCrops, setUserCrops } from 'src/facades/Auth/ProfileFacade';
import { redux, userProps } from 'src/redux/definition';

class CropCard extends Component<userProps, {}> {

    state = {
        disable_edit: true,
        crops: [],
        selected_crops: this.props.user.profile.crops
    }

    componentDidMount() {
        if (this.state.crops.length <= 0) this.getCrops()
    }

    render() {
        this.userLogin = this.userLogin.bind(this)
        return (
            <Card className="text-center pb-3 mt-3">
                <div className="container mt-3 crop-wrapper">
                    <Card.Header as={"h5"}>
                        {"พืชที่ปลูก"}
                    </Card.Header>
                    <Card.Body className="pl-0 pr-0 p-0 pb-0">
                        {this.state.crops ?
                            this.createCropsBadges(this.state.crops)
                            :
                            ""
                        }
                    </Card.Body>
                </div>
            </Card>
        )
    }

    validateInput(name: string, value: string) { this.setState({ [name + "_valid"]: validateInput(name, value) }) }
    editModeToggle() { this.setState({ disable_edit: !this.state.disable_edit }) }

    async getCrops() { this.setState({ crops: await getCrops() }) }

    async userLogin() {
        var isSuccess = await this.props.userStartLogin(this.props.user.username, this.props.user.password)
        if (isSuccess !== undefined) { alert(isSuccess) } else { window.location.reload() }
    }

    createCropsBadges(crops_list: string[]) {
        var badges = []
        badges.push(
            (crops_list).map((element, index) => (
                <div key={`profile-crops-${index}`} className="mr-2 d-inline">
                    <Badge variant={this.state.selected_crops.find((el) => (el === element)) !== undefined ? "warning" : "secondary"} onClick={() => this.onCropSelected(element)}>
                        {element}
                    </Badge>
                </div>
            ))
        )
        return badges
    }

    onCropSelected(crop_name: string) {
        var clickedCropIndex = (this.state.selected_crops).findIndex((el) => el === crop_name)
        var user_crop = this.state.selected_crops
        if (clickedCropIndex <= -1) {
            user_crop.push(crop_name)
            setUserCrops(this.props.user.id, user_crop)
        } else {
            user_crop.splice(clickedCropIndex, 1)
            setUserCrops(this.props.user.id, user_crop)
        }
        this.props.user.password.length > 4 ? this.userLogin() : window.location.reload()
    }

    onInputChange = (event: any) => {
        if (event.target.name === "username" && event.target.value.length > 10) return
        this.setState({ [event.target.name]: event.target.value });
        this.validateInput(event.target.name, event.target.value)
    }

}

export default connect(
    redux.userState,
    redux.userDispatch
)(CropCard);