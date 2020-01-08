import { PRODUCT_DETAIL_GET } from "src/definitions/Products/detail"

export interface ProductDetail {
    brand: String;
    category: String;
    common_title: String;
    created: String;
    crops: [String]
    detail: ProductDetail_Detail;
    id: String;
    image_url: [string];
    price: ProductPrice;
    rating: number;
    release_date: String;
    tags: [String];
    title: String;
    volume: ProductVolume
}

export interface ProductDetail_Detail {
    properties: String;
    remark: String;
    usage: String;
    specific_info: ProductDetail_Detail_SpecificInfo_Fertilizer & ProductDetail_Detail_SpecificInfo_Pesticide;
}

export interface ProductDetail_Detail_SpecificInfo_Fertilizer {
    primary_nutrient: string;
    secondary_nutrient: string;
    supplementary_nutrient: string;
}

export interface ProductDetail_Detail_SpecificInfo_Pesticide {
    chemical_group: String;
    hazardous_record: String;
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

interface GetProductDetail {
    type: typeof PRODUCT_DETAIL_GET
    payload: ProductDetail
}

export type ProductDetailActionTypes = GetProductDetail

export interface ProductDetailProp {
    product_detail: ProductDetail
}

export interface ProductDetailLinkStateProp {
    product_detail: ProductDetail
}

export interface ProductDetailLinkDispatchProp {
    getProductDetail: (search_target: string) => any;
}

export type ProductDetailProps = ProductDetailLinkStateProp & ProductDetailLinkDispatchProp
