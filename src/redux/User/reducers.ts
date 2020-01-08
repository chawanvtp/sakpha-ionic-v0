import {
    CurrentUser,
    UserActionTypes,
    ProfileUser
} from './types'
import { USER_LOGOUT, USER_LOGIN } from "src/definitions/Users"

const initialState: CurrentUser = {
    id: '',
    username: '',
    password: '',
    login_type: '',
    profile: Object as unknown as ProfileUser
}

const UserReducer = (
    state = initialState,
    action: UserActionTypes
): CurrentUser => {
    switch (action.type) {
        case USER_LOGIN:
            return action.payload
        case USER_LOGOUT:
            return action.payload
        default:
            return state
    }
}

export { UserReducer }