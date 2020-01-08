import {
    ReduxProductBestSell,
    ProductBestSellActionTypes
} from './types'
import { PRODUCT_BEST_SELL_GET } from "src/definitions/Products/bestsell"

const initialState: ReduxProductBestSell = {
    next: 0,
    prev: 0,
    total: 0,
    products: []
}

const ProductBestSellReducer = (
    state = initialState,
    action: ProductBestSellActionTypes
): ReduxProductBestSell => {
    switch (action.type) {
        case PRODUCT_BEST_SELL_GET:
            return action.payload
        default:
            return state
    }
}

export { ProductBestSellReducer }