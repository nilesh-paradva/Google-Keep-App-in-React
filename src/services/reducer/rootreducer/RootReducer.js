import { combineReducers } from "redux";
import { GoogleKeepReducer } from "../GoogleKeepReducer";
import { AuthReducer } from "../AuthReducer";

export const RootReducer = combineReducers({
    GoogleKeepReducer,
    AuthReducer,
})