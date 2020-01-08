import { baseURL_v2 } from "../../definitions/ApiConfig"

export class HistoryFacade {
    static async getByID(uid: string, order_id: string) {
        const result = await fetch(`${baseURL_v2}/orders/${order_id}`, {
            method: 'GET',
            headers: { 'X-Access-Token': uid },
        }).then(res => res.json())
            .then((result) => {
                if (result.shipping_address) {
                    var address = JSON.parse(result.shipping_address)
                    result.shipping_address = address
                    return result
                }
                return result
            },
                (error) => {
                    return error
                }
            )
        const res = await result
        return res
    }
}