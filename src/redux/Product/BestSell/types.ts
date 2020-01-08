import { PRODUCT_BEST_SELL_GET } from "src/definitions/Products/bestsell"

export interface ReduxProductBestSell {
    next: number;
    prev: number;
    total: number;
    products: ProductBestSell[]
}

export interface ProductBestSell {
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

interface GetProductBestSell {
    type: typeof PRODUCT_BEST_SELL_GET
    payload: ReduxProductBestSell
}

export type ProductBestSellActionTypes = GetProductBestSell

export interface ProductBestSellProp {
    product_best_sell: ReduxProductBestSell
}

export interface ProductBestSellLinkStateProp {
    product_best_sell: ReduxProductBestSell
}

export interface ProductBestSellLinkDispatchProp {
    getProductBestSell: (search_target?: string, offset?: number, limit?: number) => any;
}

export type ProductBestSellProps = ProductBestSellLinkStateProp & ProductBestSellLinkDispatchProp
