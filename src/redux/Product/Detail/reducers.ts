import {
    ProductDetail,
    ProductDetailActionTypes
} from './types'
import { PRODUCT_DETAIL_GET } from "src/definitions/Products/detail"

const initialState: ProductDetail = {
    brand: "",
    category: "",
    common_title: "",
    created: "",
    crops: [""],
    detail: {
        properties: "",
        remark: "",
        usage: "",
        specific_info: {
            chemical_group: "",
            hazardous_record: "",
            primary_nutrient: "",
            secondary_nutrient: "",
            supplementary_nutrient: ""
        }
    },
    id: "",
    image_url: [""],
    price: {
        min: 0,
        max: 0
    },
    rating: 0,
    release_date: "",
    tags: [""],
    title: "",
    volume: {
        volume: 0,
        unit: ""
    }
}

const ProductDetailReducer = (
    state = initialState,
    action: ProductDetailActionTypes
): ProductDetail => {
    switch (action.type) {
        case PRODUCT_DETAIL_GET:
            return action.payload
        default:
            return state
    }
}

export { ProductDetailReducer }