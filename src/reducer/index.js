import {combineReducers} from 'redux';
import LoginReducer from './loginReducer'
import staffReducer from './staffReducer';
import schemaReducer from './schemaReducer.js';
import academicBatchReducer from './academicBatchReducer'
import studentReducer from './studentReducer';

const allReducers = combineReducers({
    staff:staffReducer,
    schema:schemaReducer,
    login: LoginReducer,
    student:studentReducer,
    academicBatches:academicBatchReducer
});
export default allReducers