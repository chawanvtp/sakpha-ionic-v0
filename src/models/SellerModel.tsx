
export interface ProductPurchaseSeller {
    id: String
    left_in_stock: number
    price: number
    product_id: String
    seller: Seller
}

export interface Seller {
    address: String
    avatar: String
    id: String
    name: String
    phone: String
    rating: number
    location: [number, number]
}

export interface Services {
    name: string;
    icon: string;
}