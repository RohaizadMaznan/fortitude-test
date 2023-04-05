import { combineReducers } from "redux";
import productSlice from "./slices/Product/product.slice";

export const rootReducer = combineReducers({
  product: productSlice,
});
