import {
    ReduxProductCatalog,
    ProductCatalogActionTypes
} from './types'
import { PRODUCT_CATALOG_GET } from "src/definitions/Products/catalog"

const initialState: ReduxProductCatalog = {
    next: 0,
    prev: 0,
    total: 0,
    products: [],
    type: ""
}

const ProductCatalogReducer = (
    state = initialState,
    action: ProductCatalogActionTypes
): ReduxProductCatalog => {
    switch (action.type) {
        case PRODUCT_CATALOG_GET:
            var newState = action.payload
            newState.products = state.products.concat(action.payload.products)
            return newState
        default:
            return state
    }
}

export { ProductCatalogReducer }