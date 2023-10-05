import { userLogin } from "../admin/types";

const initialState = {
  isUser: false,
  adminDetails: {},
  preLogData: {},
  platformChains: [],
  accessCodes: [],
  adminRole: {},
};

const persistReducer = (state = initialState, action) => {
  switch (action.type) {
    case userLogin.CHECK_USER:
      return { ...state, isUser: action.data };
    case userLogin.USER_NAME:
      return { ...state, adminDetails: action.data };
    case userLogin.PRE_LOG_SETTING_LIST:
      return { ...state, preLogData: action.data };
    case userLogin.GET_CHAINS_DETAILS:
      return { ...state, platformChains: action.data };
    case userLogin.ACCESS_CODES:
      return { ...state, accessCodes: action.data };
    case userLogin.ADMIN_ROLE:
      return { ...state, adminRole: action.data };
    default:
      return state;
  }
};

export default persistReducer;
