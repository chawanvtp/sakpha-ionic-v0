import { GOOGLE_GEOCODING } from "src/definitions/ApiConfig";

export class Location {

    static async initAddress() {
        var currentLocation: any = await Location.getCurrent();
        if (!currentLocation) return false
        var address = await Location.convertToAddress(currentLocation.coords.latitude, currentLocation.coords.longitude)
        return address
    }

    static async getCurrent() {
        if (navigator.geolocation) {
            return await new Promise((res, rej) => {
                navigator.geolocation.getCurrentPosition(res, rej);
            }).catch(error => { return false });
        } else {
            alert("Geolocation is not supported by this browser.");
            return false
        }
    }

    static distance(lat1: number, lon1: number, lat2: number, lon2: number, unit: string = "K") {
        if ((lat1 === lat2) && (lon1 === lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            var theta = lon1 - lon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit === "K") { dist = dist * 1.609344 }
            if (unit === "N") { dist = dist * 0.8684 }
            return dist.toFixed(2) + " กม.";
        }
    }

    static async convertToAddress(lat: number, lng: number) {
        try {
            const req = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_GEOCODING.API_KEY}&language=${GOOGLE_GEOCODING.Default_Language}`, {
                method: 'GET',
            })
                .then(res => res.json())
                .then(result => {
                    return result
                }).catch(error => {
                    return false
                })
            const res = await req
            return res.results.length > 0 ? res : false
        }
        catch (error) {
            return false;
        }
    }

}