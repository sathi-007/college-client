import {
    ASYNC_END,
    ASYNC_START,
    STAFF_LOAD,
    UPLOAD_STAFF
  } from '../constants/actionTypes';

  const initialState = {
    staffList : [],
    loading : false,
    staffUpload:{},
    error: false
};


  function staffReducer(state = initialState, action) {
    switch (action.type) {
        case ASYNC_START: return { ...state, loading: true }
        case STAFF_LOAD: {
            console.log('staff load  action ',action)
            return { ...state, loading: false, staffList:action.payload,error:action.error}
        }
        case UPLOAD_STAFF:{
            return { ...state, loading: false, error:action.error,staffUpload:action.payload}
        }
        case ASYNC_END: return { ...state, loading: false }
        default:return state;
    }
};
        
export default staffReducer;