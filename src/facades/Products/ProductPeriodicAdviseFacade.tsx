import { baseURL } from "src/definitions/ApiConfig";
import { Dispatch } from "react";
import { AppActions, AppState } from "src/redux";
import { ProductCycleGet } from "src/redux/Product/Cycle/actions";
import CONFIG from "src/conf";

export const getProductCycle = (search_target?: string, offset: number = 0, limit: number = CONFIG.PRODUCT.CYCLE.LIMIT) => {
    return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        const res = await requestProductCycle(search_target, offset, limit)
        dispatch(ProductCycleGet(
            res
        ));
        return res
    };
}


export async function requestProductCycle(search_target?: string, offset: number = 0, limit: number = CONFIG.PRODUCT.CYCLE.LIMIT) {
    try {
        const req = await fetch(`${baseURL}/crops/rice/products?cycle=${search_target}&limit=${limit}`, {
            method: 'GET',
        })
        const res = await req.json()
        return res
    }
    catch (error) {
        console.group("getProductCycle")
        console.info(error)
        console.groupEnd()
        return false;
    }
}