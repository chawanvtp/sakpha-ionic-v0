import { baseURL } from "src/definitions/ApiConfig";
import { Dispatch } from "react";
import { AppActions, AppState } from "src/redux";
import { ProductCatalogGet } from "src/redux/Product/Catalog/actions";
import { formatProductSearchParams } from "src/middleware/tools";
import { requestProductCycle } from "./ProductPeriodicAdviseFacade";
import { GetProductBestSell } from "./ProductBestSellFacade";
import CONFIG from 'src/conf';

export const getProductCatalog = (search_target: string, offset: number = 0, limit: number = CONFIG.PRODUCT.CATALOG.LIMIT) => {
    return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        var params = formatProductSearchParams(search_target)
        const res = await (() => {
            switch (params.type) {
                case "cycle":
                    return requestProductCycle(params.query_message, offset, limit)
                case "category":
                    return searchProductCategory(params.query_message, offset, limit)
                case "bestSeller":
                    return GetProductBestSell(params.query_message, offset, limit)
                default:
                    return searchProduct(search_target)
            }
        })()
        var reduxState = getState()
        if (offset <= 0) { reduxState.product_catalog.products = [] }
        dispatch(ProductCatalogGet(
            { ...res, type: `${params.type}` }
        ));
        return res
    };
}


export async function searchProduct(search_target: string, offset: number = 0, limit: number = CONFIG.PRODUCT.CATALOG.LIMIT) {
    try {
        const req = await fetch(`${baseURL}/products/search/${search_target}`, {
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

export async function searchProductCategory(search_target: string, offset: number = 0, limit: number = CONFIG.PRODUCT.CATEGORY.LIMIT) {
    try {
        const req = await fetch(`${baseURL}/products?category=${search_target}&offset=${offset}&limit=${limit}`, {
            method: 'GET',
        })
        const res = await req.json()
        return res
    }
    catch (error) {
        console.group("searchProductCategory")
        console.info(error)
        console.groupEnd()
        return false;
    }
}

export async function searchProductCycle(search_target: string) {
    try {
        const req = await fetch(`${baseURL}/products/search/${search_target}`, {
            method: 'GET',
        })
        const res = await req.json()
        return res.products
    }
    catch (error) {
        console.group("searchProduct")
        console.info(error)
        console.groupEnd()
        return false;
    }
}