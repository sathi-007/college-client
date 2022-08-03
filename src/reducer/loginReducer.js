import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    REDIRECT,
    LOGIN_PAGE_UNLOADED,
    REGISTER_PAGE_UNLOADED,
    ASYNC_START,
    ASYNC_END
  } from '../constants/actionTypes';

const initialState = {
    loading : false,
    error: false,
};
    
function loginReducer(state = initialState, action) {
    switch (action.type) {
        case ASYNC_START:  return { ...state, loading: true }
        case LOGIN: return { ...state, user:action.payload, errorData:action.errorData, error: action.error, loading: false}
        case REDIRECT: {
            console.log('redirect action ',action)
            return { ...state, redirectTo:action.path}
        }
        case LOGOUT: return { ...state, user: null, error: false, loading: false }
        case LOGIN_PAGE_UNLOADED : return { ...state, usersList: [], error: true, loading: false }
        case ASYNC_END: return { ...state, loading: false }
        default:return state;
    }
};
        
export default loginReducer;