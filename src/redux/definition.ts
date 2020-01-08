import { CartProps, CartProp, CartLinkStateProp, CartLinkDispatchProp } from "./Cart/types";
import { userStartLogin, userRequestLogout } from "src/facades/Auth/UserAccountFacade";
import { getProductDetail } from "src/facades/Products/ProductDetailFacade";
import { addProductToCart, clearProductInCart, removeProductToCart } from "src/facades/Cart";
import { getProductCatalog } from "src/facades/Products/ProductCatalogFacade";
import { getProductCycle } from "src/facades/Products/ProductPeriodicAdviseFacade";
import { getProductBestSell } from "src/facades/Products/ProductBestSellFacade";
import { AppState, AppActions } from ".";
import { UserProp, UserStateProp, UserDispatchProp, UserProps } from "./User/types";
import { ProductDetailProp, ProductDetailLinkStateProp, ProductDetailLinkDispatchProp, ProductDetailProps } from "./Product/Detail/types";
import { ProductCatalogProp, ProductCatalogLinkStateProp, ProductCatalogLinkDispatchProp, ProductCatalogProps } from "./Product/Catalog/types";
import { ProductCycleProp, ProductCycleLinkStateProp, ProductCycleLinkDispatchProp, ProductCycleProps } from "./Product/Cycle/types";
import { ProductBestSellProp, ProductBestSellLinkStateProp, ProductBestSellLinkDispatchProp, ProductBestSellProps } from "./Product/BestSell/types";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { RouteComponentProps } from "react-router";

export type rootProps = UserProps & ProductCatalogProps & ProductCycleProps & ProductBestSellProps
    & ProductDetailProps & CartProps & RouteComponentProps

export type productsCombinedProps = ProductCatalogProps & ProductCycleProps & ProductBestSellProps & ProductDetailProps
export type userProps = UserProps
export type userCartProps = UserProps & CartProps
export type userProductBestProps = UserProps & ProductBestSellProps
export type userProductCycleProps = UserProps & ProductCycleProps
export type userProductDetailProps = UserProps & ProductDetailProps
export type userCartCatalogProps = UserProps & CartProps & ProductCatalogProps

export class redux {

    static rootState = (state: AppState, ownProp: UserProp & ProductDetailProp & CartProp & ProductCatalogProp & ProductCycleProp & ProductBestSellProp): UserStateProp & ProductDetailLinkStateProp & CartLinkStateProp & ProductCatalogLinkStateProp & ProductCycleLinkStateProp & ProductBestSellLinkStateProp => ({
        user: state.user,
        product_detail: state.product_detail,
        product_in_cart: state.cart,
        product_catalog: state.product_catalog,
        product_cycle: state.product_cycle,
        product_best_sell: state.product_best_sell,
    })

    static rootDispatch = (dispatch: ThunkDispatch<any, any, AppActions>, ownProp: UserProp & ProductDetailProp & CartProp & ProductCatalogProp & ProductCycleProp & ProductBestSellProp): UserDispatchProp & ProductDetailLinkDispatchProp & CartLinkDispatchProp & ProductCatalogLinkDispatchProp & ProductCycleLinkDispatchProp & ProductBestSellLinkDispatchProp => ({
        userStartLogin: bindActionCreators(userStartLogin, dispatch),
        userLogout: bindActionCreators(userRequestLogout, dispatch),
        getProductDetail: bindActionCreators(getProductDetail, dispatch),
        addProductInCart: bindActionCreators(addProductToCart, dispatch),
        removeProductInCart: bindActionCreators(addProductToCart, dispatch),
        clearProductInCart: bindActionCreators(clearProductInCart, dispatch),
        getProductInCart: bindActionCreators(addProductToCart, dispatch),
        getProductCatalog: bindActionCreators(getProductCatalog, dispatch),
        getProductCycle: bindActionCreators(getProductCycle, dispatch),
        getProductBestSell: bindActionCreators(getProductBestSell, dispatch)
    })

    static userState = (state: AppState, ownProp: UserProp): UserStateProp => ({
        user: state.user
    })

    static userDispatch = (dispatch: ThunkDispatch<any, any, AppActions>, ownProp: UserProp): UserDispatchProp => ({
        userStartLogin: bindActionCreators(userStartLogin, dispatch),
        userLogout: bindActionCreators(userRequestLogout, dispatch),
    })

    static userCartState = (state: AppState, ownProp: UserProp & CartProp): UserStateProp & CartLinkStateProp => ({
        user: state.user,
        product_in_cart: state.cart
    })

    static userCartDispatch = (dispatch: ThunkDispatch<any, any, AppActions>, ownProp: UserProp & CartProp): UserDispatchProp & CartLinkDispatchProp => ({
        userStartLogin: bindActionCreators(userStartLogin, dispatch),
        userLogout: bindActionCreators(userRequestLogout, dispatch),
        addProductInCart: bindActionCreators(addProductToCart, dispatch),
        removeProductInCart: bindActionCreators(removeProductToCart, dispatch),
        clearProductInCart: bindActionCreators(clearProductInCart, dispatch),
        getProductInCart: bindActionCreators(addProductToCart, dispatch)
    })

    static userProductBestState = (state: AppState, ownProp: userProductBestProps): UserStateProp & ProductBestSellLinkStateProp => ({
        user: state.user,
        product_best_sell: state.product_best_sell
    })

    static userProductBestDispatch = (dispatch: ThunkDispatch<any, any, AppActions>, ownProp: userProductBestProps): UserDispatchProp & ProductBestSellLinkDispatchProp => ({
        userStartLogin: bindActionCreators(userStartLogin, dispatch),
        userLogout: bindActionCreators(userRequestLogout, dispatch),
        getProductBestSell: bindActionCreators(getProductBestSell, dispatch)
    })

    static userProductCycleState = (state: AppState, ownProp: userProductCycleProps): UserStateProp & ProductCycleLinkStateProp => ({
        user: state.user,
        product_cycle: state.product_cycle
    })

    static userProductCycleDispatch = (dispatch: ThunkDispatch<any, any, AppActions>, ownProp: userProductCycleProps): UserDispatchProp & ProductCycleLinkDispatchProp => ({
        userStartLogin: bindActionCreators(userStartLogin, dispatch),
        userLogout: bindActionCreators(userRequestLogout, dispatch),
        getProductCycle: bindActionCreators(getProductCycle, dispatch)
    })

    static userProductDetailState = (state: AppState, ownProp: userProductDetailProps): UserStateProp & ProductDetailLinkStateProp => ({
        user: state.user,
        product_detail: state.product_detail
    })

    static userProductDetailDispatch = (dispatch: ThunkDispatch<any, any, AppActions>, ownProp: userProductDetailProps): UserDispatchProp & ProductDetailLinkDispatchProp => ({
        userStartLogin: bindActionCreators(userStartLogin, dispatch),
        userLogout: bindActionCreators(userRequestLogout, dispatch),
        getProductDetail: bindActionCreators(getProductDetail, dispatch)
    })

    static userCartCatalogState = (state: AppState, ownProp: UserProp & CartProp & ProductCatalogProp): UserStateProp & CartLinkStateProp & ProductCatalogLinkStateProp => ({
        user: state.user,
        product_in_cart: state.cart,
        product_catalog: state.product_catalog
    })

    static userCartCatalogDispatch = (dispatch: ThunkDispatch<any, any, AppActions>, ownProp: UserProp & CartProp & ProductCatalogProp): UserDispatchProp & CartLinkDispatchProp & ProductCatalogLinkDispatchProp => ({
        userStartLogin: bindActionCreators(userStartLogin, dispatch),
        userLogout: bindActionCreators(userRequestLogout, dispatch),
        addProductInCart: bindActionCreators(addProductToCart, dispatch),
        removeProductInCart: bindActionCreators(removeProductToCart, dispatch),
        clearProductInCart: bindActionCreators(clearProductInCart, dispatch),
        getProductInCart: bindActionCreators(addProductToCart, dispatch),
        getProductCatalog: bindActionCreators(getProductCatalog, dispatch)
    })

}