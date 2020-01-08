import { baseURL } from "src/definitions/ApiConfig"

export class SellerFacade {
    static async getSellerByProductID(search_target: String) {
        try {
            const req = await fetch(`${baseURL}/products/${search_target}/sellers`, {
                method: 'GET',
            })
            const res = await req.json()
            return res.sellers
        }
        catch (error) {
            console.error(error)
            return false;
        }
    }
}