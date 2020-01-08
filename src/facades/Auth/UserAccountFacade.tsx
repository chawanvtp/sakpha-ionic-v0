import { Dispatch } from 'redux'
import { userLogin, userLogout } from '../../redux/User/actions'
import { AppState, AppActions } from '../../redux'
import { baseURL, defaultTOKEN, baseURL_v2 } from '../../definitions/ApiConfig'
import { getProfile } from './ProfileFacade';
import { UserAddress } from 'src/redux/User/types';

export const userStartLogin = (username: string, password: string, type?: string, request_id?: string, name?: string) => {
    return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        var id = await (async () => {
            switch (type) {
                case "ACCOUNT":
                    return await userSendLoginRequest(username, password);
                case "PROFILE":
                    return request_id;
                case "LINE":
                    userLoginSuccess(request_id ? request_id : "", "", "")
                    return request_id
                case "OTP":
                    return await userSendLoginOTPRequest(username, password, request_id ? request_id : "", name)
                default: return await userSendLoginRequest(username, password);
            }
        })();

        if (!id || parseInt(id) >= 400) {
            userRequestLogout()
            return false
        }

        var profile = await getProfile(id ? id : "")
        if (!profile && id && Number(id) < 400) profile = await getProfile(await userSendLoginRequest(username, password))
        dispatch(userLogin({ id, username, password, login_type: type ? type : "", profile }));
        return true
    };
};

export const userLoginOTP = (username: string, password: string, type?: string, request_id?: string) => {
    return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {

        const id = type !== "OTP" ? await userSendLoginRequest(username, password) : await userSendLoginOTPRequest(username, password, request_id || "")
        var profile = await getProfile(id)
        profile ? console.error("GetProfile SUCCESS") : profile = await getProfile(await userSendLoginRequest(username, password))

        dispatch(userLogin({ id, username, password, login_type: type ? type : "", profile }));
    };
};

export async function registrationSend(mobile: string, password: string) {
    try {
        const req = await fetch(`${baseURL_v2}/auth/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Access-Token': defaultTOKEN
            },
            body: JSON.stringify({
                mobile,
                password
            })
        })
        const res = await req.json()
        if (!res.error) {
            userLoginSuccess(res.id, mobile, password);
        }
        return res
    }
    catch (error) {
        window.location.href = "/login"
        return false;
    }
}

export async function requestOtp(mobile: string) {
    try {
        const req = await fetch(`${baseURL}/auth/request_otp`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Access-Token': defaultTOKEN
            },
            body: JSON.stringify({
                mobile
            })
        })
        const res = await req.json()
        if (!res.request_id) {
            return false;
        }
        return res
    }
    catch (error) {
        return false;
    }
}


export async function registrationWithNameSend(name: string, mobile: string, password: string) {
    try {
        const req = await fetch(`${baseURL}/v2/auth/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Access-Token': defaultTOKEN
            },
            body: JSON.stringify({
                mobile,
                password,
                name
            })
        })
        const res = await req.json()
        if (!res.error) {
            userLoginSuccess(res.id, mobile, password);
        }
        return res
    }
    catch (error) {
        window.location.href = "/login"
        return false;
    }
}

export async function forgotPasswordSend(mobile: string) {
    try {
        const req = await fetch(`${baseURL}/auth/forgot_password`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Access-Token': defaultTOKEN
            },
            body: JSON.stringify({
                mobile
            })
        })
        const res = await req.json()
        return res
    }
    catch (error) {
        console.error("forgotPasswordSend: ", error)
    }
}

export async function resetPasswordSend(token: string, new_password: string) {
    try {
        const req = await fetch(`${baseURL}/auth/reset_password/${token}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: new_password
            })
        })
        const res = await req
        return res
    }
    catch (error) {
        console.error("resetPasswordSend: ", error)
        return error
    }
}

export async function userSendLoginRequest(mobile: string, password: string) {
    if (mobile.length < 10 || password.length < 6) {
        alert("เบอร์โทรศัพท์ หรือ รหัสผ่าน ไม่ถูกต้อง !!")
        return 404
    }
    try {
        const req = await fetch(`${baseURL}/auth/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Access-Token': defaultTOKEN
            },
            body: JSON.stringify({
                mobile,
                password
            })
        }).then(res => res.json())
            .then(result => {
                var token = result.id ? result.id : 400
                userLoginSuccess(token, mobile, password);
                return token
            }).catch(error => {
                console.error("ERROR: ", error)
                alert("เบอร์โทรศัพท์ หรือ รหัสผ่าน ไม่ถูกต้อง !!")
                return 400
            })
        return req
    }
    catch (error) {
        console.error("userSendLoginRequest: ", error)
        return false;
    }
}

export async function userSendLoginOTPRequest(mobile: string, password: string, request_id: string, name?: string) {
    if (mobile.length < 10) return false

    var payload = (name && name !== undefined) ?
        { request_id, mobile, otp: password, name }
        :
        { request_id, mobile, otp: password }

    try {
        const req = await fetch(`${baseURL}/auth/login/otp`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Access-Token': defaultTOKEN
            },
            body: JSON.stringify(payload)
        })
        const res = await req.json()
        if (!res.error) {
            userLoginSuccess(res.id, mobile, password);
        } else {
            alert("รหัส OTP ไม่ถูกต้อง !!")
        }
        return res.id
    }
    catch (error) {
        console.error(error)
        return false;
    }
}

export async function loginLINE() {
    var redirect_uri = encodeURI(window.location.href)
    var state = "ICKSTATE"

    window.location.href = `${baseURL}/auth/login/line?redirect_uri=${redirect_uri}&state=${state}`
    try {
        const req = await fetch(`${baseURL}/auth/login/line?redirect_uri=${redirect_uri}&state=${state}`, {
            method: "GET",
            mode: "no-cors"
        })
        console.error("REQ: ", req)
        const res = await req.json()
        console.error("RES: ", res)
        return res
    }
    catch (error) {
        console.error("ERROR: ", error)
        return false;
    }
}

export function userLogoutHandler(type: string) {
    switch (type) {
        case "LINE":
            return window.location.href = `${window.location.origin}${window.location.pathname}`;
        default: return window.location.reload()
    }
}

export function userSourceHandler(source: string) {
    var type = (() => {
        switch (source) {
            case "line":
                loginLINE()
                return ("Source: " + source)
            case "facebook":
                return ("Source: " + source)
            default: return "default";
        }
    })();
    console.error("Type: ", type)
}

// ====== OG version ======
export function userLoginSuccess(uid: string, username: string, password: string) {
    console.info(`uid: ${uid}`)
    console.info(`username: : ${username}`)
    console.info(`password: ${password}`)
}

export function userRequestLogout() {
    localStorage.removeItem("current_user");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        var user = getState().user
        var login_type = user.login_type
        console.error("Login_type: ", login_type)
        dispatch(userLogout({
            id: '',
            username: '',
            password: '',
            login_type: '',
            profile: {
                address: Object as unknown as UserAddress[],
                avatar: "",
                birth: "",
                crops: [""],
                mobile: "",
                name: ""
            }
        }));
        userLogoutHandler(login_type)
    };
}

export function initUserLogin() {
    var current_user = localStorage.getItem("current_user") || ""
    var username = localStorage.getItem("username") || ""
    var password = localStorage.getItem("password") || ""

    if (Object.keys(current_user).length <= 0) {
        return undefined
    } else {
        return { id: current_user, username, password }
    }
}