import {combineReducers} from 'redux';
import LoginReducer from './loginReducer'
import staffReducer from './staffReducer';
import schemaReducer from './schemaReducer.js';
import academicBatchReducer from './academicBatchReducer'
import studentReducer from './studentReducer';
import resultsReducer from './resultsReducer';

const allReducers = combineReducers({
    staff:staffReducer,
    schema:schemaReducer,
    login: LoginReducer,
    student:studentReducer,
    academicBatches:academicBatchReducer,
    results:resultsReducer
});
export default allReducers