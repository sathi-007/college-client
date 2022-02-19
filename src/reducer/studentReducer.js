import {
    ASYNC_END,
    ASYNC_START,
    STUDENT_LOAD,
    UPLOAD_STUDENT
  } from '../constants/actionTypes';

const initialState = {
    studentList : [],
    loading : false,
    studentUpload:{},
    error: false
};


function studentReducer(state = initialState, action) {
    switch (action.type) {
        case ASYNC_START: return { ...state, loading: true }
        case STUDENT_LOAD: {
            console.log('student load  action ',action)
            return { ...state, loading: false, studentList:action.payload,error:action.error}
        }
        case UPLOAD_STUDENT:{
            return { ...state, loading: false, error:action.error,studentUpload:action.payload}
        }
        case ASYNC_END: return { ...state, loading: false }
        default:return state;
    }
};
        
export default studentReducer;