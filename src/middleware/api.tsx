import { baseURL } from "src/definitions/ApiConfig"

export class API_TOOLS {

    static async getSearchHintByKeyword(keyword: string) {
        if ((keyword === "") || keyword.length < 2) return []
        const result = await fetch(`${baseURL}/tags/search/${keyword}/autocomplete`, {
            method: 'GET',
        }).then(res => res.json())
            .then((result) => {
                if (result.tags.length > 0) {
                    return result.tags
                }
                return []
            },
                (error) => {
                    return error
                }
            )
        const res = await result
        return res
    }

}