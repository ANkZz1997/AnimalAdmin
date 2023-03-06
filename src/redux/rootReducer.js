import { combineReducers } from "redux";
import adminReducer from "./admin/reducer";
import persistReducer from "../redux/persist/reducer"
import commonReducer from "./common/reducer";

const rootReducer = combineReducers({
    adminReducer,
    persistReducer,
    commonReducer,
})

export default rootReducer;