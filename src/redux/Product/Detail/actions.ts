import { ProductDetailActionTypes } from './types'
import { PRODUCT_DETAIL_GET } from "src/definitions/Products/detail"

export const ProductDetailGet = (product_list: any): ProductDetailActionTypes => ({
        type: PRODUCT_DETAIL_GET,
        payload: product_list
})

