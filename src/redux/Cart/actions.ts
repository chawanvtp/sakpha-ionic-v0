import { CartActionTypes } from './types'
import { PRODUCT_IN_CART_GET, PRODUCT_IN_CART_CLEAR, PRODUCT_IN_CART_ADD, PRODUCT_IN_CART_REMOVE } from "src/definitions/Cart/"

export const ProductInCartGet = (products: any): CartActionTypes => ({
        type: PRODUCT_IN_CART_GET,
        payload: products
})

export const ProductInCartClear = (products: any): CartActionTypes => ({
        type: PRODUCT_IN_CART_CLEAR,
        payload: products
})

export const ProductInCartAdd = (products: any): CartActionTypes => ({
        type: PRODUCT_IN_CART_ADD,
        payload: products
})

export const ProductInCartRemove = (products: any): CartActionTypes => ({
        type: PRODUCT_IN_CART_REMOVE,
        payload: products
})