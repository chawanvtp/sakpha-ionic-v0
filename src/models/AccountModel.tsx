export interface AccountInfo {
        name: string,
        avatar: string,
        mobile: string,
        birth: string
}

export interface AddressList {
    address_line: AccountAddress[]
}

export interface AccountAddress {
    address_line: string,
    city: string,
    city_sub_division: string,
    country_sub_division: string,
    is_shipping_address: boolean,
    post_code: string
}