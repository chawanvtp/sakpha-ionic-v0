import { baseURL } from "src/definitions/ApiConfig";
import { Dispatch } from "react";
import { AppActions, AppState } from "src/redux";
import { ProductBestSellGet } from "src/redux/Product/BestSell/actions";
import CONFIG from "src/conf"

export const getProductBestSell = (search_target: string = "", offset: number = 0, limit: number = CONFIG.PRODUCT.BEST_SELL.LIMIT) => {
    return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        const res = await GetProductBestSell(search_target, offset, limit)
        dispatch(ProductBestSellGet(
            res
        ));
        return res
    };
}


export async function GetProductBestSell(search_target?: string, offset: number = 0, limit: number = CONFIG.PRODUCT.BEST_SELL.LIMIT) {
    try {
        const req = await fetch(`${baseURL}/products?best_seller=true&limit=${limit}&offset=${offset}`, {
            method: 'GET',
        })
        const res = await req.json()
        return res
    }
    catch (error) {
        console.group("GetProductBestSell")
        console.info(error)
        console.groupEnd()
        return false;
    }
}