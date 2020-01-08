export const USER_LOGIN = "USER_LOGIN"
export const USER_LOGOUT = "USER_LOGOUT"

export const avatar_default = require('../../images/image-profile-default.png')

export const PROFILE_INPUTGROUP_DEFAULT_CONFIG = {
    autoComplete: "new-password",
    autoCorrect: "off",
    spellCheck: false
}

export const profile_require_info = [
    { type: "username", name: "เบอร์โทรศัพท์" },
    { type: "name", name: "ชื่อ-สกุล" }
]

export const address_require_info = [
    { type: "post_code", name: "รหัสไปรษณีย์" },
    { type: "country_sub_division", name: "จังหวัด" },
    { type: "city", name: "อำเภอ" },
    { type: "city_sub_division", name: "ตำบล" },
    { type: "address_line", name: "บ้านเลขที่ - หมู่ / ซอย - ถนน" },
]