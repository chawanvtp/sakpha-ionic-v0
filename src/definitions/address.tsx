import { APPLICATION } from 'src/definitions/ApiConfig';

export class Address {
    static fields = [
        { app: "address_line", google: "street_number", hint: "none" },
        { app: "city_sub_division", google: "sublocality_level_2", hint: "district" },
        { app: "country_sub_division", google: "administrative_area_level_1", hint: "province" },
        { app: "city", google: "sublocality_level_1", hint: "amphoe" },
        { app: "city", google: "administrative_area_level_2", hint: "amphoe" },
        { app: "post_code", google: "postal_code", hint: "zipcode" },
    ]

    static GET_hintType = (req?: any) => {
        switch (req) {
            case "zipcode": return (Number)
            case "district_code": return (Number)
            case "amphoe_code": return (Number)
            case "province_code": return (Number)
            default: return (String)
        }
    }

    static mapToState = (prev_fields?: any, target_fields: any = Address.fields) => {
        var suggested_address: { app: string; value: string; }[] = []
        prev_fields[0].address_components.forEach((element: any, index: number) => {
            element.types.forEach((type: any) => {
                var new_suggestion = Address.fields.find(field => field.google === type)
                if (new_suggestion) suggested_address.push(
                    { app: new_suggestion.app, value: element.long_name }
                )
            })
        });
        return suggested_address
    }

    static GET_AddressHint = (req?: { key: string, value: any }) => {
        if (!req) return false

        let map = Address.fields.find(ele => ele.app === `${req.key}`)
        if (!map || !map.hint || map === undefined) return false
        let map_hint = map.hint

        var req_type = Address.GET_hintType(map_hint)
        let res = APPLICATION.hint_address.find((obj: any) => obj[map_hint] === req_type(req.value))
        if (!res) return false

        var suggested_address: { app: string; value: string; }[] = []
        Object.keys(res).forEach((element: any, index: number) => {
            var new_suggestion = Address.fields.find(field => field.hint === element)
            if (new_suggestion) suggested_address.push(
                { app: new_suggestion.app, value: res[element] }
            )
        });

        return suggested_address
    }
}