import {
    ReduxProductCycle,
    ProductCycleActionTypes
} from './types'
import { PRODUCT_CYCLE_GET } from "src/definitions/Products/cycle"

const initialState: ReduxProductCycle = {
    next: 0,
    prev: 0,
    total: 0,
    products: []
}

const ProductCycleReducer = (
    state = initialState,
    action: ProductCycleActionTypes
): ReduxProductCycle => {
    switch (action.type) {
        case PRODUCT_CYCLE_GET:
            return action.payload
        default:
            return state
    }
}

export { ProductCycleReducer }