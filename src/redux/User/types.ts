import { USER_LOGIN, USER_LOGOUT } from "src/definitions/Users"

export interface CurrentUser {
    id: string,
    username: string,
    password: string,
    profile: ProfileUser,
    login_type: string
}

export interface ProfileUser {
    address: UserAddress[],
    avatar: string,
    birth: string,
    crops: [string],
    mobile: string,
    name: string
}

export interface UserAddress {
    address_line: string,
    city: string,
    city_sub_division: string,
    country_sub_division: string,
    is_shipping_address: true,
    post_code: string
}

interface UserLoginAction {
    type: typeof USER_LOGIN
    payload: CurrentUser
}

interface UserLogoutAction {
    type: typeof USER_LOGOUT
    payload: CurrentUser
}

export type UserActionTypes = UserLoginAction | UserLogoutAction

export interface UserProp {
    user: CurrentUser
}

export interface UserStateProp {
    user: CurrentUser
}

export interface UserDispatchProp {
    userStartLogin: (username: string, password: string, type?: string, request_id?: string, name?: string) => void;
    userLogout: () => void;
}

export type UserProps = UserStateProp & UserDispatchProp
