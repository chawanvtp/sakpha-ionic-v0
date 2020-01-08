import { baseURL, baseURL_v2 } from "src/definitions/ApiConfig"
import { Cart } from "src/redux/Cart/types"
import { CurrentUser } from "src/redux/User/types"

export async function getPaymentMethods() {
    try {
        const req = await fetch(`${baseURL}/payments/methods`, {
            method: 'GET',
        })
        const res = await req.json()
        return res.payments
    }
    catch (error) {
        console.error("getPaymentMethods")
        return false;
    }
}

export async function getDeliveryMethods(token: string) {
    try {
        const req = await fetch(`${baseURL}/accounts/shipping_address`, {
            method: 'GET',
            headers: {
                'X-Access-Token': token
            }
        })
        const res = await req.json()
        console.error("res: ", res)
        return res
    }
    catch (error) {
        console.group("getPaymentMethods")
        console.info(error)
        console.groupEnd()
        return false;
    }
}

export async function sendOrderConfirm(cart: Cart, delivery_type: any, payment_method: any, shipping_address: any, total: any, current_user: CurrentUser) {

    if ((cart.products).length <= 0) return;

    let orders: any[] = []

    for (let i = 0; i < (cart.products).length; i++) {
        var shopIndex = orders.findIndex((el) => el.seller_id === cart.products[i].seller_id)
        if (shopIndex <= -1) {
            orders.push({
                "seller_id": cart.products[i].seller_id,
                "items": [{ id: cart.products[i].product_id, quantity: cart.products[i].quantity }],
                "ref": "a1"
            })
        } else {
            orders[shopIndex].items.push({
                id: cart.products[i].product_id, quantity: cart.products[i].quantity
            })
        }
    }

    try {
        const req = await fetch(`${baseURL_v2}/orders`, {
            method: 'POST',
            body: JSON.stringify({
                orders,
                delivery_type: delivery_type,
                payment_method: payment_method,
                shipping_address: (current_user.profile.address.length > 0 ? JSON.stringify(current_user.profile.address[0]) : null)
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Access-Token': current_user.id
            }
        })
        const res = await req.json()
        if (res.error) {
            alert(res.error)
            console.error(res)
            return false
        }
        return res
    } catch (error) {
        console.group("sendOrderConfirm")
        console.info(error)
        console.groupEnd()
        return false;
    }
}


export async function getShippingFee(items: any, shipping_method: string = "deliver_by_seller") {
    var payload = JSON.stringify({
        items,
        shipping_method
    })

    try {
        const req = await fetch(`${baseURL}/calculate_shipping_fee`, {
            method: 'POST',
            body: (payload)
        })
        const res = await req.json()
        console.error("res: ", res)
        return res
    }
    catch (error) {
        console.group("getPaymentMethods")
        console.info(error)
        console.groupEnd()
        return false;
    }
}

