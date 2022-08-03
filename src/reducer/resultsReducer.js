import {
    ASYNC_END,
    ASYNC_START,
    RESULTS_LOAD,
    UPLOAD_RESULTS
  } from '../constants/actionTypes';

  const initialState = {
    resultsList : [],
    loading : false,
    resultUpload:{},
    error: false
};


function resultsReducer(state = initialState, action) {
    switch (action.type) {
        case ASYNC_START: return { ...state, loading: true }
        case RESULTS_LOAD: {
            console.log('results load  action ',action)
            return { ...state, loading: false, resultsList:action.payload, error:action.error}
        }
        case UPLOAD_RESULTS:{
            return { ...state, loading: false, error:action.error, resultUpload:action.payload}
        }
        case ASYNC_END: return { ...state, loading: false }
        default:return state;
    }
};
        
export default resultsReducer;