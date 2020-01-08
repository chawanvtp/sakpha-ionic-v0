import { CurrentUser, UserActionTypes } from './types'
import { USER_LOGOUT, USER_LOGIN } from "src/definitions/Users"

export const userLogin = (newUser: CurrentUser): UserActionTypes => ({
        type: USER_LOGIN,
        payload: newUser
})

export const userLogout = (newUser: CurrentUser): UserActionTypes => ({
        type: USER_LOGOUT,
        payload: newUser
})
