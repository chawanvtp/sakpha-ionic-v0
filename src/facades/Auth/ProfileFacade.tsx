import { baseURL } from "../../definitions/ApiConfig"
import { AccountInfo, AccountAddress } from "../../models/AccountModel"
import { userRequestLogout } from "./UserAccountFacade"

export async function updateProfileSend(uid: string, profile: AccountInfo, address: AccountAddress) {
    const result = await fetch(`${baseURL}/accounts/profiles`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Access-Token': uid
        },
        body: JSON.stringify({
            name: profile.name,
            mobile: profile.mobile,
            address: {
                address_line: address.address_line,
                city: address.city,
                city_sub_division: address.city_sub_division,
                country_sub_division: address.country_sub_division,
                post_code: address.post_code
            }
        })
    })
        .then(res => res)
        .then(
            (result) => {
                console.error("result: ", result)
                if (result.status === 202) {
                    return result
                } else {
                    console.error("failed to submit order - ", result)
                    return result
                }
            },
            (error) => {
                console.error('error: ', error)
                return error
            }
        )
    const res = await result
    return res
}

export async function submitProfile(uid: string) {
    const result = await fetch(`${baseURL}/accounts/profiles`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Access-Token': uid
        },
        body: JSON.stringify({

        })
    })
        .then(res => res.json())
        .then(
            (result) => {
                if (!result.error) {
                    return result
                } else {
                    return console.error("failed to submit order - ", result.error)
                }
            },
            (error) => {
                return error
            }
        )
    const res = await result
    return res
}

export async function getProfile(uid: string) {
    const result = await fetch(`${baseURL}/accounts/profiles`, {
        method: 'GET',
        headers: {
            'X-Access-Token': uid
        }
    })
        .then(res => res.json())
        .then(
            (result) => {
                if (result) {
                    if (!result.error) {
                        console.group('%c ProfileFacade ', 'background: #222; color: #bada55;')
                        console.info('%c func -> getProfile ', 'color: rgb(0,0,64); font-style: 900;');
                        console.info('%c result: ', 'color: rgb(0,128,0);', result);
                        console.groupEnd()
                        return result
                    }
                } else {
                    return console.error("func -> getProfile: failed to submit")
                }
            },
            (error) => {
                console.error('error: ', error)
                userRequestLogout()
                alert("กรุณาเข้าสู่ระบบใหม่อีกครั้งค่ะ !!")
            }
        )
    const res = await result
    return res
}

export async function getCrops() {
    const result = await fetch(`${baseURL}/crops`, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(
            (result) => {
                if (result) {
                    if (!result.error) {
                        return result.crops
                    }
                } else {
                    return console.error("func -> getProfile: failed to submit")
                }
            },
            (error) => {
                console.error('error: ', error)
            }
        )
    const res = await result
    return res
}

export async function setUserCrops(uid: string, crops: string[]) {
    const result = await fetch(`${baseURL}/accounts/crops`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Access-Token': uid
        },
        body: JSON.stringify({
            crops
        })
    })
        .then(
            (result) => {
                if (!result) {
                    return console.error("func -> getProfile: failed to submit")
                }
            },
            (error) => {
                console.error('error: ', error)
            }
        )
    const res = result
    return res
}