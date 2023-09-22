import { admin, preLoginAdminData, userData, userLogin } from "./types";

export const userLoginAction = (data, callback) => ({
    type: userLogin.USER_LOGIN,
    data,
    callback,
  });

  export const accessCodeAction = (data) => ({
    type: userLogin.ACCESS_CODES,
    data,
  });

  export const adminAction = (data) => ({
    type: admin.ADMIN,
    data: data.data,
  });

  export const preLoginAction = (params,callback) =>({
    type: userData.GET_SETTING_LIST,
    params,
    callback
  })

  export const preLoginAdminDataAction = (data)=>({
    type: userLogin.PRE_LOG_SETTING_LIST,
    data,
  })

  export const getChainsListAction = (callback) =>({
    type: userData.GET_NETWORKS,
    callback
  })
  
  export const getChainsListAdminAction = (data) =>({
    type: userLogin.GET_CHAINS_DETAILS,
    data,
  })

  export const checkUserAction = (data) => ({
    type: userLogin.CHECK_USER,
    data,
  });

  export const adminUserNameAction =(data)=>({
    type: userLogin.USER_NAME,
    data,
  });

  export const dashboardAction = (callBack) => ({
    type: userData.GET_DASHBOARD,
    callBack,
  });

  export const usersDataAction = (params, obj, callback) => ({
    type: userData.GET_USER_LIST,
    params,
    obj,
    callback,
  });

  export const userActivitiesActions = (params, callback, obj) => ({
    type: userData.GET_USER_ACTIVITIES,
    params,
    callback,
    obj,
  });

  export const usersDataParamsAction = (params, obj, callback) => ({
    type: userData.GET_USER_LIST_PARAMS,
    params,
    obj,
    callback,
  });
  

  export const nftDataAction = (params,data, obj, callback) => ({
    type: userData.GET_NFTS_LIST,
    params,
    data,
    obj,
    callback,
  });

  export const marketPlaceAction = (params,data, obj, callback) => ({
    type: userData.GET_MARKETPLACE_ITEM_LIST,
    params,
    data,
    obj,
    callback,
  });
  
  export const auctionsAction = (params,data, obj, callback) => ({
    type: userData.GET_AUCTIONS_LIST,
    params,
    data,
    obj,
    callback,
  });
  
  export const bidsAction = (params, obj, callback) => ({
    type: userData.GET_BIDS_LIST,
    params,
    obj,
    callback,
  });
  
  export const kycUserData = (params,data, callback) => ({
    type: userData.GET_KYC_DETAILS,
    params,
    data,
    callback,
  });