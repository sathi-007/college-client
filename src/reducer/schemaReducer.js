import {
    ASYNC_END,
    ASYNC_START,
    SCHEMA_LOAD
  } from '../constants/actionTypes';


const initialState = {
    schema:{},
    loading: false ,
    error: false
};

function schemaReducer(state = initialState, action) {
    switch (action.type) {
        case ASYNC_START: return { ...state, loading: true }
        case SCHEMA_LOAD: {
            console.log('schema load  action ',action)
            return { ...state, loading: false, schema:action.payload,error:action.error}
        }
        case ASYNC_END: return { ...state, loading: false }
        default:return state;
    }
};
        
export default schemaReducer;