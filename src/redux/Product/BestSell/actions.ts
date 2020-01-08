import { ProductBestSellActionTypes } from './types'
import { PRODUCT_BEST_SELL_GET } from "src/definitions/Products/bestsell"

export const ProductBestSellGet = (product_list: any): ProductBestSellActionTypes => ({
        type: PRODUCT_BEST_SELL_GET,
        payload: product_list
})