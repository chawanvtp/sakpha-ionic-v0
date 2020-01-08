import { ProductCatalogActionTypes } from './types'
import { PRODUCT_CATALOG_GET } from "src/definitions/Products/catalog"

export const ProductCatalogGet = (product_list: any): ProductCatalogActionTypes => ({
        type: PRODUCT_CATALOG_GET,
        payload: product_list
})

