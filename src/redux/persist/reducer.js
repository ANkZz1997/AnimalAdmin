import { userLogin } from "../admin/types";

const initialState = {
    isUser: false,
    username: " ",
    preLogData:{}
}

const persistReducer = (state = initialState, action)=>{
    switch(action.type){
        case userLogin.CHECK_USER:
            return {...state,isUser: action.data};
        case userLogin.USER_NAME:
            return {...state, username: action.data};
        case userLogin.PRE_LOG_SETTING_LIST:
            return {...state,preLogData: action.data}
        default:
            return state;
    }
}

export default persistReducer;