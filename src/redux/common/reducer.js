import { startLoader, stopLoader } from './types';

// initial state
const initialCommonState = {
  isLoading: false,
};

// Common Reducer function
const commonReducer = (state = { ...initialCommonState }, action) => {
  switch (action.type) {
    case startLoader:
      return {
        ...state,
        isLoading: true,
      };
    case stopLoader:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default commonReducer;