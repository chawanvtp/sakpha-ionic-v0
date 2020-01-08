import {
    Cart,
    CartActionTypes,
    ProductInCart
} from './types'
import { PRODUCT_IN_CART_GET, PRODUCT_IN_CART_CLEAR, PRODUCT_IN_CART_ADD, PRODUCT_IN_CART_REMOVE } from "src/definitions/Cart/"

const initialState: Cart = {
    products: [] as ProductInCart[]
}

const CartReducer = (
    state = initialState,
    action: CartActionTypes
): Cart => {
    switch (action.type) {
        case PRODUCT_IN_CART_GET:
            return action.payload
        case PRODUCT_IN_CART_CLEAR:
            return action.payload
        case PRODUCT_IN_CART_ADD:
            return action.payload
        case PRODUCT_IN_CART_REMOVE:
            return action.payload
        default:
            return state
    }
}

export { CartReducer }