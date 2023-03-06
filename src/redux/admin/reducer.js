import {admin, userData} from "./types";

const initialState = {
    data:{},
}

const adminReducer = (state = initialState, action)=>{
    switch(action.type){
        case admin.ADMIN:
            return {...state, data: action.data}
        case userData.GET_DASHBOARD:
            return {...state, data: action.data}
        case userData.GET_USER_LIST:
            return {...state, data: action.data}
        case userData.GET_USER_LIST_PARAMS:
            return { ...state, userdata: action.data };
        case userData.GET_NFTS_LIST:
            return {...state, data: action.data}
        case userData.GET_MARKETPLACE_ITEM_LIST:
            return {...state, data: action.data}
        case userData.GET_AUCTIONS_LIST:
            return {...state, data: action.data}
        case userData.GET_BIDS_LIST:
            return {...state, data: action.data}
        case userData.GET_KYC_DETAILS:
            return {...state, data: action.data}
    default:
        return state;
    }
}

export default adminReducer;