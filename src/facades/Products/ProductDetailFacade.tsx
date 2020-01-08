import { baseURL } from "src/definitions/ApiConfig";
import { Dispatch } from "react";
import { AppActions, AppState } from "src/redux";
import { ProductDetailGet } from "src/redux/Product/Detail/actions";

export const getProductDetail = (search_target: string) => {
    return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        const res = await searchProduct(search_target)
        dispatch(ProductDetailGet(
            res
        ));
        return res
    };
}


export async function searchProduct(search_target: string) {
    try {
        const req = await fetch(`${baseURL}/products/${search_target}`, {
            method: 'GET',
        })
        const res = await req.json()
        return res
    }
    catch (error) {
        console.group("searchProduct")
        console.info(error)
        console.groupEnd()
        return false;
    }
}