import {
    ASYNC_START,
   ACADEMIC_BATCH_LOAD,
   CREATE_ACADEMIC_BATCH,
   BRANCH_LOAD,
   LOAD_ACADEMIC_BATCH_BRANCH,
   ASYNC_END
  } from '../constants/actionTypes';

  const initialState = {
    academicBatchList : [],
    loading : false,
    branches:[],
    academicBatchUpload:{},
    error: false
};


  function academicBatchReducer(state = initialState, action) {
    switch (action.type) {
        case ASYNC_START: return { ...state, loading: true }
        case ACADEMIC_BATCH_LOAD: {
            console.log('staff load  action ',action)
            return { ...state, loading: false, academicBatchList:action.payload,error:action.error}
        }
        case BRANCH_LOAD: {
            console.log('branch load  action ',action)
            return { ...state, loading: false, branches:action.payload,error:action.error}
        }
        case CREATE_ACADEMIC_BATCH:{
            return { ...state, loading: false, error:action.error,academicBatchUpload:action.payload}
        }
        case ASYNC_END: return { ...state, loading: false }
        default:return state;
    }
};
        
export default academicBatchReducer;