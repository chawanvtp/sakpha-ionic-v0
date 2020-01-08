import BEST_SELL from "./best_sell";
import CATALOG from "./catalog";
import CATEGORY from "./category";
import DETAIL from "./detail";
import CYCLE from "./cycle"

export default class PRODUCTS {
    static BEST_SELL = BEST_SELL
    static CATALOG = CATALOG
    static CATEGORY = CATEGORY
    static DETAIL = DETAIL
    static CYCLE = CYCLE

    static ENABLE = {
        BEST_SELL: 1,
        CATALOG: 1,
        CATEGORY: 1,
        DETAIL: 1,
        CYCLE: 1
    }
}