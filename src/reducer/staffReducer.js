import {
    ASYNC_START,
    SCHEMA_LOAD,
    STAFF_LOAD,
    UPLOAD_STAFF
  } from '../constants/actionTypes';

  const initialState = {
    staffList : [],
    loading : false,
    schema:{},
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
        case SCHEMA_LOAD: {
            console.log('schema load  action ',action)
            return { ...state, loading: false, schema:action.payload,error:action.error}
        }
        case UPLOAD_STAFF:{
            return { ...state, loading: false, error:action.error,staffUpload:action.payload}
        }
        default:return state;
    }
};
        
export default staffReducer;