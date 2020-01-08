import { UserAddress } from "../User/types";

export interface OrderBill {
    applied_coupon: AppliedCoupon
    delivery_type: string
    id: string
    is_paid: boolean
    payment_method: string
    shipping_address: UserAddress
    slip: any
    status: string
    total: number
    orders: [Order]
    // created: string
}

export interface AppliedCoupon {
    code: string
    discount: number
    discount_type: string
    id: string
}

export interface Order {
    id: string
    items: [OrderItem]
    status: string
}

export interface OrderItem{
    id: string
    price: number
    quantity: number
    title: string
}