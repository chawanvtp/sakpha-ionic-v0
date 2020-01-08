import { PRODUCT_CATALOG_GET } from "src/definitions/Products/catalog"

export interface ReduxProductCatalog {
    next: number;
    prev: number;
    total: number;
    products: ProductCatalog[];
    type: string;
}

export interface ProductCatalog {
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

interface GetProductCatalog {
    type: typeof PRODUCT_CATALOG_GET
    payload: ReduxProductCatalog
}

export type ProductCatalogActionTypes = GetProductCatalog

export interface ProductCatalogProp {
    product_catalog: ReduxProductCatalog
}

export interface ProductCatalogLinkStateProp {
    product_catalog: ReduxProductCatalog
}

export interface ProductCatalogLinkDispatchProp {
    getProductCatalog: (search_target: string, offset?: number, limit?: number) => any;
}

export type ProductCatalogProps = ProductCatalogLinkStateProp & ProductCatalogLinkDispatchProp
