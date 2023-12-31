
import { accessCodeAction, adminAction, adminRoleAction, adminUserNameAction, checkUserAction, getChainsListAction, getChainsListAdminAction, preLoginAdminDataAction } from "./action";
import {
    all,
    call,
    put,
    throttle,
    delay,
    takeLatest,
    debounce,
} from 'redux-saga/effects';
import { httpGet, httpPost, httpPut } from '../../utils/https';
import URLS from '../../utils/urls'
import { userData, userLogin } from "./types";
import cogoToast from "cogo-toast";
import { startLoading, stopLoading } from "../common/action";
import { useNavigate } from "react-router-dom";


// User Login

function* loginUser({ data, callback }) {
      yield put(startLoading());
    try {
        const response = yield httpPost(`${URLS.EXCHANGE.ADMIN.LOGIN}`, data, {});
        if (response?.status === 200) {
            
            // window.location.replace("/dashboard")
            // yield call(forwardTo, '/dashboard');

            localStorage.setItem('token', response?.data?.data?.token);
            callback(response?.data);
            yield put(adminUserNameAction(response?.data?.data));
            yield put(accessCodeAction(response?.data?.data.permissions))

            // yield put(adminRoleAction(response?.data?.data.role))
            // yield put(adminAction(response));

            cogoToast.success('Login Successfull');
            yield put(checkUserAction(true));
            yield put(stopLoading());
        }
        else if (response?.data?.message == "Invalid Password") {
            yield put(stopLoading());

            cogoToast.error(response?.data?.message);
        }
        else if (response?.data?.message == "User not exist") {
            yield put(stopLoading());
            cogoToast.error(response?.data?.message);
        }
        else {
            yield put(stopLoading());

            cogoToast.error('Session Expired');
        }
    } catch (error) {
        yield put(stopLoading());
        cogoToast.error(error?.response?.statusText);
    }
}

function* getPreLoginSettings({ params,callback}){
    try {
        const response = yield httpGet(URLS.EXCHANGE.ADMIN.GET_SETTING_LIST,params);
        if (response?.status === 200) {
            // console.log("saga---->",params, response)
            yield put(preLoginAdminDataAction(response.data?.data));
            callback(response.data.data)
           
        }else{
            localStorage.setItem("token","")
            yield put(checkUserAction(false));
            cogoToast.error('Session Expired');
        }
    } catch (error) {
        console.log('error',error);
        // localStorage.setItem("token","");

        // cogoToast.error(error?.response?.statusText);
    }
}

function* getChainsList({callback}){
    try {
        const response = yield httpGet(URLS.EXCHANGE.ADMIN.GET_NETWORKS);
        if (response?.status === 200) {
            // console.log("saga---->",response)
            yield put(getChainsListAdminAction(response.data?.data))
            callback(response.data.data)
           
        }else{
            localStorage.setItem("token","")
            yield put(checkUserAction(false));

            cogoToast.error('Session Expired');
        }
    } catch (error) {
        console.log('error',error);
        // localStorage.setItem("token","");

        // cogoToast.error(error?.response?.statusText);
    }
}

function* getDashboardData({ callBack }) {
    try {
        const response = yield httpPost(URLS.EXCHANGE.ADMIN.GET_DASHBOARD, {});
        if (response?.status === 200) {
            callBack(response?.data?.data)
        }else if(response?.status=== 400){
            yield put(checkUserAction(false));
            localStorage.setItem('token',"");
            cogoToast.warn('Session Expired');
        } else {
            cogoToast.error(response?.data?.message);
        }

    } catch (error) {
        cogoToast.error(error?.response?.statusText);
    }
}

function* getUserData({ params, obj, callback }) {
    // console.log("objobj",obj)
    try {
        const response = yield httpPost(
            `${URLS.EXCHANGE.ADMIN.GET_USER_LIST}?page=${params.page}&limit=${params.limit}&sort=${params.sorting}&order=${params.order}`,
             obj,
        );
        if (response?.status === 200) {
            callback(response?.data?.data)
        } 
        else if(response?.status===500){
            yield put(checkUserAction(false));
            localStorage.setItem('token',"");
            cogoToast.warn('Session Expired');}
        else {
            cogoToast.error(response?.data?.message);
        }
    } catch (error) {
        cogoToast.error(error?.response?.statusText);
    }
}

function* usersDataParams({ params, obj, callback }) {
    yield put(startLoading());

    try {
        const response = yield httpPost(URLS.EXCHANGE.ADMIN.GET_USER_LIST, params, {
            or: obj,
        });
        if (response?.status === 200) {
            callback(response?.data?.data)
        } else {
            cogoToast.error(response?.data?.message);
        }
    } catch (error) {
        cogoToast.error(error?.response?.statusText);
    }
}

function* userActivities({ params, callback, obj }) {
    // console.log('params', params);
    yield put(startLoading());

    try {
        const response = yield httpPost(
            `${URLS.EXCHANGE.ADMIN.GET_USER_ACTIVITIES}?page=${params.page}&limit=${params.limit}&sort=${params.sorting}&order=${params.order}`,
            obj,
        );
        // console.log('activities Saga Data', response.data.data);
        if (response) {
            callback(response.data.data);
        }
    } catch (error) {
        yield put(stopLoading());
        cogoToast.error(error?.response?.statusText);
    }
}

function* getNftData({ params,data, obj, callback }) {
    
    try {
        const response = yield httpPost(
            `${URLS.EXCHANGE.ADMIN.GET_NFTS_LIST}?page=${params.page}&limit=${params.limit}&sort=${params.sorting}&order=${params.order}`,{...data, ...obj},
        );
        if (response?.status === 200) {
            callback(response?.data?.data)
        } else if(response?.status=== 400){
            yield put(checkUserAction(false));
            localStorage.setItem('token',"");
            cogoToast.warn('Session Expired');} else {
            cogoToast.error(response?.data?.message);
        }
    } catch (error) {
        cogoToast.error(error?.response?.statusText);
    }
}

function* getMarketplaceData({ params,data, obj, callback }) {

    try {
        const response = yield httpPost(
            `${URLS.EXCHANGE.ADMIN.GET_MARKETPLACE_ITEM_LIST}?page=${params.page}&limit=${params.limit}&sort=${params.sorting}&order=${params.order}`
            ,{...data, ...obj}
        );
        if (response?.status === 200) {
            callback(response?.data?.data)
        } else if(response?.status=== 400){
            yield put(checkUserAction(false));
            localStorage.setItem('token',"");
            cogoToast.warn('Session Expired');} else {
            cogoToast.error(response?.data?.message);
        }
    } catch (error) {
        cogoToast.error(error?.response?.statusText);
    }
}

function* getAuctionData({ params,data, obj, callback }) {

    try {
        const response = yield httpPost(
            `${URLS.EXCHANGE.ADMIN.GET_AUCTIONS_LIST}?page=${params.page}&limit=${params.limit}&sort=${params.sorting}&order=${params.order}`,
            {...data, ...obj},
        );
        if (response?.status === 200) {
            callback(response?.data?.data)
        }  else if(response?.status=== 400){
            yield put(checkUserAction(false));
            localStorage.setItem('token',"");
            cogoToast.warn('Session Expired');}else {
            cogoToast.error(response?.data?.message);
        }
    } catch (error) {
        cogoToast.error(error?.response?.statusText);
    }
}

function* getBidsData({ params, obj, callback }) {

    try {
        const response = yield httpPost(
            `${URLS.EXCHANGE.ADMIN.GET_BIDS_LIST}?page=${params.page}&limit=${params.limit}&sort=${params.sorting}&order=${params.order}`,obj,
        );
        if (response?.status === 200) {
            callback(response?.data?.data)
        } else if(response?.status=== 400){
            yield put(checkUserAction(false));
            localStorage.setItem('token',"");
            cogoToast.warn('Session Expired');} else {
            cogoToast.error(response?.data?.message);
        }
    } catch (error) {
        cogoToast.error(error?.response?.statusText);
    }
}

function* getKycData({ params,data, callback }) {

    try {
        const response = yield httpPost(
            `${URLS.EXCHANGE.ADMIN.GET_KYC_DETAILS}?page=${params.page}&limit=${params.limit}&sort=${params.sorting}&order=${params.order}`,data);
        if (response?.status === 200) {
            callback(response?.data?.data)
        }  else if(response?.status=== 400){
            yield put(checkUserAction(false));
            localStorage.setItem('token',"");
            cogoToast.warn('Session Expired');}else {
            cogoToast.error(response?.data?.message);
        }
    } catch (error) {
        cogoToast.error(error?.response?.statusText);
    }
}

// function* logOutUser() {
//     cogoToast.success('Logout Successfull');
//     yield put(checkUserAction(false));
//     localStorage.setItem("token","")
//     yield call(forwardTo, '/login');
// }

export default function* commonSaga() {

    yield all([throttle(500, userLogin.USER_LOGIN, loginUser)]);
    yield all([throttle(500, userData.GET_DASHBOARD, getDashboardData)]);
    yield all([throttle(500, userData.GET_USER_LIST, getUserData)]);
    yield all([throttle(500, userData.GET_SETTING_LIST, getPreLoginSettings)]);
    yield all([throttle(500, userData.GET_NETWORKS, getChainsList)]);
    yield all([throttle(500, userData.GET_USER_LIST_PARAMS, usersDataParams)]);
    yield all([throttle(500, userData.GET_NFTS_LIST, getNftData)]);
    yield all([throttle(500, userData.GET_MARKETPLACE_ITEM_LIST, getMarketplaceData)]);
    yield all([throttle(500, userData.GET_AUCTIONS_LIST, getAuctionData)]);
    yield all([throttle(500, userData.GET_BIDS_LIST, getBidsData)]);
    yield all([throttle(500, userData.GET_KYC_DETAILS, getKycData)]);
    yield all([throttle(500, userData.GET_USER_ACTIVITIES, userActivities)]);



    // yield all([throttle(500, userLogin.USER_LOGOUT, logOutUser)]);
}