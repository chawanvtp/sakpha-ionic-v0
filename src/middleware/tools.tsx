export function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
}

export function getParam(target_name: string) {
    return new URL(window.location.href).searchParams.get(target_name)
}

export function validateInput(name: string, value: string) {
    var isValid = false
    switch (name) {
        case "username": isValid = new RegExp("^[0-9]{10}$").test(value)
            break;
        case "password": isValid = new RegExp("^(?=.{4,})").test(value)
            break;
        case "name": isValid = new RegExp("^(?=.{3,})").test(value)
            break;
    }
    return isValid
}

export function formatProductSearchParams(param: string) {
    var params = param.split("_")
    var type = params.length > 1 ? params[0] : ""
    var query_message = params.length > 1 ? params[1].split("?")[0] : params[0]
    return { type, query_message: query_message }
}

export function indexObjectValueByString(obj: any, key: any) {
    if (obj[key]) { return obj[key] }
    return ""
}