import { combineReducers } from "redux";
import { listReducer } from "./cardReducer";

export const rootReducer = combineReducers({
  lists: listReducer,
});
