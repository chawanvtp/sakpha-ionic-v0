import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import logger from '../middleware/logger'
import { loadState, saveState } from "src/facades/LocalStorageFacade";
import { UserReducer } from './User/reducers'
import { UserActionTypes } from "./User/types";
import { ProductCatalogReducer } from './Product/Catalog/reducers'
import { ProductCatalogActionTypes } from "./Product/Catalog/types";
import { ProductCycleReducer } from "./Product/Cycle/reducers";
import { ProductBestSellReducer } from "./Product/BestSell/reducers";
import { ProductCycleActionTypes } from "./Product/Cycle/types";
import { ProductBestSellActionTypes } from "./Product/BestSell/types";
import { ProductDetailReducer } from "./Product/Detail/reducers";
import { ProductDetailActionTypes } from "./Product/Detail/types";
import { CartReducer } from "./Cart/reducers";
import { CartActionTypes } from "./Cart/types";

export const rootReducer = combineReducers({
  user: UserReducer,
  product_catalog: ProductCatalogReducer,
  product_cycle: ProductCycleReducer,
  product_best_sell: ProductBestSellReducer,
  product_detail: ProductDetailReducer,
  cart: CartReducer
});


export type AppState = ReturnType<typeof rootReducer>;
export type AppActions = UserActionTypes | ProductCatalogActionTypes
  | ProductCycleActionTypes | ProductBestSellActionTypes
  | ProductDetailActionTypes | CartActionTypes

export default function configureStore() {
  const middlewares = [thunk as ThunkMiddleware<AppState, AppActions>, logger];
  const middleWareEnhancer = applyMiddleware(...middlewares);
  const persistStore = loadState()

  const store = createStore(
    rootReducer,
    persistStore,
    compose(middleWareEnhancer)
  );

  store.subscribe(() => {
    saveState(store.getState())
  })

  return store;
}