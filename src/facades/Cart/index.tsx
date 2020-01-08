import { Dispatch } from "react";
import { AppActions, AppState } from "src/redux";
import { ProductInCart, Cart } from "src/redux/Cart/types";
import { ProductInCartAdd, ProductInCartRemove, ProductInCartClear } from "src/redux/Cart/actions";

export const addProductToCart = (product: ProductInCart) => {

    return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        var state = getState().cart
        var newState = Object.assign({}, state) as Cart

        if (!isExist(product, state)) {
            if (newState.products.length <= 0 || newState.products[0].product_id === "") {
                newState.products[0] = product
            } else {
                newState.products.push(product)
            }
            dispatch(ProductInCartAdd(
                newState
            ));
        } else {
            newState.products.forEach((element, index) => {
                if (element.product_id === product.product_id && element.seller_id === product.seller_id) {
                    newState.products[index].quantity += product.quantity
                }
            })
            dispatch(ProductInCartAdd(
                newState
            ));
        }

    };

};

export const removeProductToCart = (product: ProductInCart) => {

    return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        var state = getState().cart
        var newState = Object.assign({}, state) as Cart

        newState.products.forEach((element, index) => {
            if (element.product_id === product.product_id && element.seller_id === product.seller_id) {
                return (newState.products.splice(index, 1))
            }
        })
        dispatch(ProductInCartRemove(
            newState
        ));
    };

};

export const clearProductInCart = () => {

    return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        var state = getState().cart
        var newState = Object.assign({}, state) as Cart

        newState.products.splice(0, newState.products.length)

        dispatch(ProductInCartClear(
            newState
        ));
        window.location.href = "/payment_complete"
    };

};


function isExist(product: ProductInCart, cart: Cart) {
    return cart.products.find((element, index) => {
        return (element.product_id === product.product_id && element.seller_id === product.seller_id)
    })
}