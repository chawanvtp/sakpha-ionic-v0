const hint_address_json = require("src/middleware/raw_database.json");

const origin = window.location.origin.split(":")

export const domain = origin[1] === "//chawanvtp.github.io" ? `https://www.iconkaset.com` : `${origin[0]}:${origin[1]}`
export const baseURL = domain === "http://localhost" ? "http://dev-www.iconkaset.com:9000/v1" : `${domain}:9000/v1`
export const baseURL_v2 = domain === "http://localhost" ? "http://dev-www.iconkaset.com:9000/v2" : `${domain}:9000/v2`
export const defaultTOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXlsb2FkIjp7InVzZXJfaWQiOiJkZWJ1Z191c2VyX2lkIn0sImlhdCI6MTU2NjM3MTQxMCwiZXhwIjo5OTk5OTk5OTk5fQ.S--FJaXXvg9U2hsrCBAnf1QEYq6LQFWM8mxetPTTBVk"

export const baseHref = `${window.location.origin}${window.location.pathname}`

export class GOOGLE_GEOCODING {
    static API_KEY = "AIzaSyBrPID9S7dde9MNuN4tfwRCiOAd6SvMB5M"
    static Default_Language = "th";
}

export class APPLICATION {
    static hint_address = hint_address_json
}