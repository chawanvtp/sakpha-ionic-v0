import { ProductCycleActionTypes } from './types'
import { PRODUCT_CYCLE_GET } from "src/definitions/Products/cycle"

export const ProductCycleGet = (product_list: any): ProductCycleActionTypes => ({
        type: PRODUCT_CYCLE_GET,
        payload: product_list
})

