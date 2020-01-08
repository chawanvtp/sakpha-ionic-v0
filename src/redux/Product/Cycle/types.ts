import { PRODUCT_CYCLE_GET } from "src/definitions/Products/cycle"

export interface ReduxProductCycle {
    next: number;
    prev: number;
    total: number;
    products: ProductPeriodicAdvise[]
}

export interface ProductPeriodicAdvise {
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

interface getProductCycle {
    type: typeof PRODUCT_CYCLE_GET
    payload: ReduxProductCycle
}

export type ProductCycleActionTypes = getProductCycle

export interface ProductCycleProp {
    product_cycle: ReduxProductCycle
}

export interface ProductCycleLinkStateProp {
    product_cycle: ReduxProductCycle
}

export interface ProductCycleLinkDispatchProp {
    getProductCycle: (search_target?: string, offset?: number, limit?: number) => any;
}

export type ProductCycleProps = ProductCycleLinkStateProp & ProductCycleLinkDispatchProp
