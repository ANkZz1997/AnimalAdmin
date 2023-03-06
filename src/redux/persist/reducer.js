import { userLogin } from "../admin/types";

const initialState = {
    isUser: false,
    username: " "
}

const persistReducer = (state = initialState, action)=>{
    switch(action.type){
        case userLogin.CHECK_USER:
            return {...state,isUser: action.data};
        case userLogin.USER_NAME:
            return {...state, username: action.data};
        default:
            return state;
    }
}

export default persistReducer;