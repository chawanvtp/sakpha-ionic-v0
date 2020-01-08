import { PRODUCT_IN_CART_GET, PRODUCT_IN_CART_CLEAR, PRODUCT_IN_CART_ADD, PRODUCT_IN_CART_REMOVE } from "src/definitions/Cart/"
import { ProductCatalog } from "../Product/Catalog/types"
import { ProductDetail } from "../Product/Detail/types"
import { Seller } from "src/models/SellerModel"

export interface Cart {
    products: Array<ProductInCart>
}

export interface ProductInCart {
    product_id: string,
    stock_id: string,
    seller_id: string,
    quantity: number,
    detail: Product | ProductCatalog | ProductDetail,
    seller: Seller,
    price: number
}

export interface Product {
    id: String;
    title: String;
    common_title: String;
    price: ProductPrice;
    image_url: String;
    volume: ProductVolume;
    seller: ProductSeller;
    tags: Array<String>;
}

export interface ProductPrice {
    min: number;
    max: number;
}

export interface ProductVolume {
    volume: number;
    unit: String;
}

export interface ProductSeller {
    id: String;
    name: String;
    rating: number;
}

interface GetProductInCart {
    type: typeof PRODUCT_IN_CART_GET
    payload: Cart
}

interface clearProductInCart {
    type: typeof PRODUCT_IN_CART_CLEAR
    payload: Cart
}

interface AddProductInCart {
    type: typeof PRODUCT_IN_CART_ADD
    payload: Cart
}

interface RemoveProductInCart {
    type: typeof PRODUCT_IN_CART_REMOVE
    payload: Cart
}

export type CartActionTypes = GetProductInCart | clearProductInCart | AddProductInCart | RemoveProductInCart

export interface CartProp {
    product_in_cart: Cart
}

export interface CartLinkStateProp {
    product_in_cart: Cart
}

export interface CartLinkDispatchProp {
    addProductInCart: (product: ProductInCart) => any;
    removeProductInCart: (product: ProductInCart) => any;
    getProductInCart: (product: ProductInCart) => any;
    clearProductInCart: () => any;
}

export type CartProps = CartLinkStateProp & CartLinkDispatchProp
