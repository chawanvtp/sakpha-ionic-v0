import { domain } from "src/definitions/ApiConfig";

const logger = (store: any) => (next: any) => (action: any) => {
    if (domain === "http://localhost") {
        console.group('%c ' + action.type + ' ', 'background: #222; color: #bada55;')
        console.info('%c PrevState ', 'color: rgb(0,0,64); font-style: 900;', store.getState());
        console.info('%c Dispatch ', 'color: rgb(0,128,0);', action);
        console.info('%c NextState ', 'color: rgb(128,0,0); font-style: 900;', store.getState());
        console.groupEnd()
    }
    let result = next(action)
    return result
}

export default logger